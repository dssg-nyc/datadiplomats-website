export const CONSENT_KEY = 'dssg_consent_v1';
export const CONSENT_CHANGE_EVENT = 'dssg-consent-change';
export const OPEN_CONSENT_EVENT = 'dssg-open-consent-settings';

const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID;
// GA4 property for user-behavior analytics. Build-time value; when unset
// the site runs no analytics. Separate from the Ads tag so a visitor who
// allows analytics but not advertising is measured without ad storage.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const defaultPreferences = () => ({
  embeds: true,
  analytics: true,
  advertising: true,
});

const deniedPreferences = () => ({
  embeds: false,
  analytics: false,
  advertising: false,
});

export const hasGlobalPrivacyControl = () => (
  typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true
);

const applyGpc = (preferences) => ({
  ...defaultPreferences(),
  ...preferences,
  advertising: preferences?.advertising === true && !hasGlobalPrivacyControl(),
});

export const readConsent = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (stored && typeof stored === 'object') {
      return applyGpc(stored);
    }
  } catch {
    // Ignore unreadable or legacy values and treat as no choice yet.
  }
  return null;
};

// Google Tag Manager and gtag.js only act on commands pushed as the
// `arguments` object, as gtag() does. A plain array is ignored, which would
// leave consent stuck on its denied default after a visitor accepts.
function pushDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export const toConsentMode = (preferences) => {
  const flag = (granted) => (granted ? 'granted' : 'denied');
  return {
    ad_storage: flag(preferences.advertising),
    ad_user_data: flag(preferences.advertising),
    ad_personalization: flag(preferences.advertising),
    analytics_storage: flag(preferences.analytics),
    functionality_storage: flag(preferences.embeds),
    personalization_storage: flag(preferences.advertising),
    security_storage: 'granted',
  };
};

// Loads the gtag.js library once. The script URL's id acts as an implicit
// config for that property (observed: loading with the Ads ID fires an Ads
// page_view with no explicit config push). So the src id is chosen by what
// was consented: the GA4 ID when analytics is granted, otherwise the Ads
// ID. The implicit config covers that property, so applyConsentMode only
// pushes an explicit config for the OTHER consented property - a second
// config for the src property would fire a duplicate landing page_view.
// SPA route-change page views come from the GA4 property's enhanced
// measurement, verified enabled for this stream on 21 Nov 2026 (observed
// firing on pushState navigation), so the app sends no page_view events of
// its own and cannot double-count.
let tagSrcId = null;
const loadGoogleTag = (preferences) => {
  if (document.getElementById('google-tag-script')) {
    return;
  }
  const gaFirst = preferences.analytics === true && !!GA_MEASUREMENT_ID;
  tagSrcId = gaFirst ? GA_MEASUREMENT_ID : (GOOGLE_TAG_ID || GA_MEASUREMENT_ID);
  if (!tagSrcId) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-tag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagSrcId)}`;
  document.head.appendChild(script);
  pushDataLayer('js', new Date());
};

const applyConsentMode = (preferences) => {
  pushDataLayer('consent', 'update', toConsentMode(preferences));
  if (preferences.analytics || preferences.advertising) {
    loadGoogleTag(preferences);
  }
  // Each property is configured only under its own consent: Ads measurement
  // needs advertising, GA4 needs analytics. A visitor who allows analytics
  // but not advertising gets no Ads config and no advertising hits. The
  // config push fires that property's landing page_view once (observed 21
  // Nov 2026: the script URL's id alone fired no GA4 page_view, so the
  // explicit config is what starts measurement).
  if (preferences.advertising && GOOGLE_TAG_ID) {
    pushDataLayer('config', GOOGLE_TAG_ID);
  }
  if (preferences.analytics && GA_MEASUREMENT_ID) {
    pushDataLayer('config', GA_MEASUREMENT_ID);
  }
};

export const initConsent = () => {
  pushDataLayer('consent', 'default', {
    ...toConsentMode(deniedPreferences()),
    wait_for_update: 500,
  });
  const stored = readConsent();
  if (stored) {
    applyConsentMode(stored);
  }
};

export const saveConsent = (partial) => {
  const previous = readConsent();
  const preferences = applyGpc({ ...defaultPreferences(), ...partial });
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...preferences,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    // Private mode can block localStorage; still apply the in-memory choice.
  }
  // Withdrawing analytics or advertising after the tags loaded must unload
  // them. Observed 21 Nov 2026: a loaded gtag keeps emitting page_view and
  // scroll hits after a consent-denied update, carrying the client id, so a
  // consent-mode update alone does not stop measurement. Reloading starts
  // the page fresh under the denied state, which loads no Google tags at
  // all. Reject-all from a granted state therefore reloads the page.
  const wasTracking = previous?.analytics === true || previous?.advertising === true;
  const nowTracking = preferences.analytics === true || preferences.advertising === true;
  if (wasTracking && !nowTracking) {
    window.location.reload();
    return preferences;
  }
  applyConsentMode(preferences);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: preferences }));
  return preferences;
};

export const subscribeConsent = (listener) => {
  const handler = () => listener(readConsent());
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
};

export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
};
