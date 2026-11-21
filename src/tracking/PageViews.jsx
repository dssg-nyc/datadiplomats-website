import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { readConsent, subscribeConsent } from '../consent/consent';

// GA4 page views for the SPA. The gtag config in consent.js sets
// send_page_view: false, so this component is the only source of page_view
// events: no duplicate landing-page hit, and route changes are measured even
// if the property's enhanced-measurement history tracking is off.
// Events carry only path and title - no PII. gtag queues events in dataLayer
// until the consent-gated library loads, and readConsent() blocks every send
// while analytics consent is absent or withdrawn.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let lastTrackedPath = null;

export const sendPageView = (path) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return false;
  if (readConsent()?.analytics !== true) return false;
  if (path === lastTrackedPath) return false;
  lastTrackedPath = path;
  window.gtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_title: document.title,
  });
  return true;
};

export const PageViews = () => {
  const location = useLocation();
  const path = location.pathname + location.search;

  useEffect(() => {
    sendPageView(path);
    // A visitor who grants analytics consent mid-session starts being
    // measured from the page they are on; one who withdraws stops at once.
    return subscribeConsent(() => {
      sendPageView(window.location.pathname + window.location.search);
    });
  }, [path]);

  return null;
};
