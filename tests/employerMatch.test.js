import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, searchEmployers } from '../src/giving/employerMatch.js';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../src/data/employermatch.json', import.meta.url), 'utf8'));

test('normalize ignores case, accents and punctuation', () => {
  assert.equal(normalize('  Salesforce.com, Inc. '), 'salesforce com inc');
});

test('finds verified employers by name or alias, best match first', () => {
  assert.equal(searchEmployers('micro', data.employers)[0].id, 'microsoft');
  assert.equal(searchEmployers('MSFT', data.employers)[0].id, 'microsoft');
  assert.equal(searchEmployers('apple', data.employers)[0].id, 'apple');
});

test('unknown or too-short queries return nothing so the page shows the fallback', () => {
  assert.deepEqual(searchEmployers('Acme Widgets', data.employers), []);
  assert.deepEqual(searchEmployers('a', data.employers), []);
});

test('every employer points at a known platform and an https source', () => {
  for (const e of data.employers) {
    assert.ok(data.platforms[e.platform], e.id);
    assert.match(e.source.url, /^https:\/\//);
  }
});
