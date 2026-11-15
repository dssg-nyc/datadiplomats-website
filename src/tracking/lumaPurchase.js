// Dedicated workshop action. Never reuse the cohort Apply-click destination.
export const WORKSHOP_CONVERSION = 'AW-18527015092/yoNxCPGf07gdELShr4JF';

// One set per loaded document, shared across component remounts. Google Ads also
// deduplicates this action using Luma's order ID as transaction_id.
const sentOrders = new Set();

export function recordLumaPurchase(message, { frameWindow, consent, gtag,
  destination = WORKSHOP_CONVERSION, seen = sentOrders }) {
  if (!frameWindow || message.origin !== 'https://luma.com' || message.source !== frameWindow) return false;
  if (!consent?.advertising || !consent?.embeds || typeof gtag !== 'function') return false;
  if (!/^AW-\d+\/[A-Za-z0-9_-]+$/.test(destination)) return false;
  const data = message.data;
  if (!data || data.type !== 'luma:purchase') return false;
  const { transaction_id: id, value, currency } = data;
  if (typeof id !== 'string' || !id.trim() || id.length > 256) return false;
  // Luma emits purchases for free registrations too. Count only paid orders.
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return false;
  if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) return false;
  const key = `${destination}:${id}`;
  if (seen.has(key)) return false;
  try {
    gtag('event', 'conversion', {
      send_to: destination,
      value,
      currency,
      transaction_id: id,
    });
    seen.add(key);
    return true;
  } catch {
    // Tracking must never break registration or claim an order was sent.
    return false;
  }
}
