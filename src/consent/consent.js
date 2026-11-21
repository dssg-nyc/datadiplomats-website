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

// Loads the gtag.js library once, using whichever tag ID is available for
// the script URL. The library alone collects nothing; each property starts
// sending only when its own `config` is pushed below, and those pushes are
// consent-gated separately.
const loadGoogleTag = () => {
  const anyId = GOOGLE_TAG_ID || GA_MEASUREMENT_ID;
  if (!anyId || document.getElementById('google-tag-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-tag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(anyId)}`;
  document.head.appendChild(script);
  pushDataLayer('js', new Date());
};

const applyConsentMode = (preferences) => {
  pushDataLayer('consent', 'update', toConsentMode(preferences));
  if (preferences.analytics || preferences.advertising) {
    loadGoogleTag();
  }
  // Each property is configured only under its own consent: Ads measurement
  // needs advertising, GA4 needs analytics. A visitor who allows analytics
  // but not advertising gets no Ads config and no advertising hits.
  if (preferences.advertising && GOOGLE_TAG_ID) {
    pushDataLayer('config', GOOGLE_TAG_ID);
  }
  // GA4 collects only after analytics consent; the consent update above
  // lands first, so page views never fire while analytics_storage is denied.
  // send_page_view is false: src/tracking/PageViews.jsx sends page views
  // itself on every route change, so SPA navigation is measured regardless
  // of the property's enhanced-measurement settings and never double-counts
  // the landing page.
  if (preferences.analytics && GA_MEASUREMENT_ID) {
    pushDataLayer('config', GA_MEASUREMENT_ID, { send_page_view: false });
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
  const preferences = applyGpc({ ...defaultPreferences(), ...partial });
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...preferences,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    // Private mode can block localStorage; still apply the in-memory choice.
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
