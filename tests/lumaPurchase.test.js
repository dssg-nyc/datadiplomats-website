import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recordLumaPurchase } from '../src/tracking/lumaPurchase.js';

function fixture() {
  const frameWindow = {};
  const calls = [];
  return {
    calls,
    message: { origin: 'https://luma.com', source: frameWindow,
      data: { type: 'luma:purchase', transaction_id: 'order-1', value: 49, currency: 'USD', email: 'ignored@example.test' } },
    options: { frameWindow, consent: { advertising: true, embeds: true },
      destination: 'AW-123/test_label', seen: new Set(), gtag: (...args) => calls.push(args) },
  };
}

test('paid completion sends only approved fields and deduplicates order', () => {
  const { message, options, calls } = fixture();
  assert.equal(recordLumaPurchase(message, options), true);
  assert.deepEqual(calls, [['event', 'conversion', { send_to: 'AW-123/test_label', value: 49, currency: 'USD', transaction_id: 'order-1' }]]);
  assert.equal(recordLumaPurchase(message, options), false);
  assert.equal(calls.length, 1);
  assert.equal(recordLumaPurchase({ ...message, data: { ...message.data, transaction_id: 'order-2' } }, options), true);
});

test('rejects foreign origins and other windows, including another Luma frame', () => {
  for (const change of [{ origin: 'https://evil.example' }, { source: {} }, { source: null }]) {
    const { message, options, calls } = fixture();
    assert.equal(recordLumaPurchase({ ...message, ...change }, options), false);
    assert.equal(calls.length, 0);
  }
});

test('free, failed and malformed payloads never count', () => {
  for (const data of [null, { type: undefined }, { type: 'luma:failure' }, ...[0, -1, NaN, Infinity, '49'].map(value => ({ value })),
    { transaction_id: '' }, { transaction_id: 7 }, { currency: 'usd' }, { currency: '' }]) {
    const { message, options, calls } = fixture();
    assert.equal(recordLumaPurchase({ ...message, data: data === null ? null : { ...message.data, ...data } }, options), false);
    assert.equal(calls.length, 0);
  }
});

test('requires current advertising/embed consent and a configured destination', () => {
  for (const change of [{ consent: null }, { consent: { advertising: false, embeds: true } },
    { consent: { advertising: true, embeds: false } }, { destination: '' }, { destination: 'bad' },
    { gtag: null }, { frameWindow: null }]) {
    const { message, options, calls } = fixture();
    assert.equal(recordLumaPurchase(message, { ...options, ...change }), false);
    assert.equal(calls.length, 0);
  }
});

test('does not retain events denied by consent and allows retry after a thrown tag call', () => {
  const { message, options } = fixture();
  assert.equal(recordLumaPurchase(message, { ...options, consent: null }), false);
  assert.equal(options.seen.size, 0);
  assert.equal(recordLumaPurchase(message, { ...options, gtag: () => { throw Error('unavailable'); } }), false);
  assert.equal(options.seen.size, 0);
  assert.equal(recordLumaPurchase(message, options), true);
});
