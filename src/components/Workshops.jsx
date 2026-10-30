import { useEffect, useState } from 'react';
import Seo from './Seo';
import PageIntro from './PageIntro';
import workshopData from '../data/workshops.json';
import { defaultPreferences, openCookieSettings, readConsent, subscribeConsent } from '../consent/consent';
import './Workshops.css';

const embedsAllowed = (preferences) => (preferences || defaultPreferences()).embeds;

// The full Luma event page (cover, description, tickets and registration),
// loaded in embed mode so it can sit inside this page.
const embedUrl = (lumaUrl) => `${lumaUrl}?lm_source=embed`;

// Each workshop is its own Luma event, shown in full inside the page.
const Workshops = () => {
  const [embeds, setEmbeds] = useState(() => embedsAllowed(readConsent()));

  useEffect(() => subscribeConsent((preferences) => setEmbeds(embedsAllowed(preferences))), []);

  return (
    <div className="workshops-page">
      <Seo
        title="AI Workshops - Data Diplomats"
        description="Hands-on AI workshops for nonprofits from Data Diplomats. Practice prompting and build workflows you can run at your organization."
        type="website"
        name="AI Workshops"
      />

      <PageIntro eyebrow="AI Workshops" title={<>Learn AI by <em>building with it.</em></>}>
        Hands-on AI workshops for nonprofit staff and volunteers. Register right here.
      </PageIntro>

      <section className="workshops-list">
        <div className="workshops-wrap">
          {workshopData.events.map(({ lumaEventId, lumaUrl, title }) => (
            <div key={lumaEventId} className="workshop-frame paper-card accent-orange">
              {embeds ? (
                <iframe
                  className="luma-event-embed"
                  src={embedUrl(lumaUrl)}
                  title={title}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              ) : (
                <div className="workshop-blocked">
                  <p>The event is hidden because embedded content is turned off in your privacy choices.</p>
                  <button type="button" className="button accent" onClick={openCookieSettings}>
                    Change cookie settings
                  </button>
                </div>
              )}
              {/* Always available, in case the embed does not load. */}
              <p className="workshop-fallback">
                Trouble loading the event?{' '}
                <a href={lumaUrl} target="_blank" rel="noopener noreferrer">
                  Open it on Luma →
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Workshops;
