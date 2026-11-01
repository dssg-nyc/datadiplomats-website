import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Seo from './Seo';
import PageIntro from './PageIntro';
import workshopData from '../data/workshops.json';
import { defaultPreferences, openCookieSettings, readConsent, subscribeConsent } from '../consent/consent';
import './Workshops.css';

const { landing } = workshopData;

const embedsAllowed = (preferences) => (preferences || defaultPreferences()).embeds;

// Luma lets other sites frame only its compact event card (tickets and
// registration); the full event page sends X-Frame-Options: sameorigin.
const embedUrl = (id) => `https://luma.com/embed/event/${id}/simple`;

// The build-up plays once on load: pain-point cards pop in one by one,
// connectors draw down to the burnout node, then the workshop appears as the fix.
// Each piece reads its place in the sequence from the --i custom property.
const step = (index) => ({ '--i': index });

const Landing = ({ lumaUrl }) => {
  const painCount = landing.pains.length;

  return (
    <div className="workshop-landing paper-card">
      <p className="eyebrow">{landing.eyebrow}</p>
      <h2 className="display-heading wl-title">
        {landing.title} <em>{landing.titleEmphasis}</em>
      </h2>
      <p className="wl-lead">{landing.lead}</p>

      <ol className="wl-pains">
        {landing.pains.map((pain, index) => (
          <li key={pain.title} className="wl-pain" style={step(index)}>
            <span className="wl-dot" aria-hidden="true" />
            <h3 className="wl-pain-title">{pain.title}</h3>
            <p className="wl-pain-text">{pain.pain}</p>
            <p className="wl-pain-fix">{pain.fix}</p>
          </li>
        ))}
      </ol>

      <div className="wl-flow" style={step(painCount)} aria-hidden="true" />

      <div className="wl-burnout" style={step(painCount + 1)}>
        <p className="wl-node-label">{landing.burnout.label}</p>
        <h3 className="wl-node-title">{landing.burnout.title}</h3>
        <p className="wl-stat">{landing.burnout.stat}</p>
      </div>

      <div className="wl-flow wl-flow-fix" style={step(painCount + 2)} aria-hidden="true" />

      <div className="wl-solution" style={step(painCount + 3)}>
        <p className="wl-node-label">{landing.solution.label}</p>
        <h3 className="wl-node-title">{landing.solution.title}</h3>
        <p>{landing.solution.body}</p>
        <a className="button accent" href={lumaUrl} target="_blank" rel="noopener noreferrer">
          {landing.solution.cta} →
        </a>
      </div>

      <p className="wl-source">
        Source:{' '}
        <a href={landing.burnout.sourceUrl} target="_blank" rel="noopener noreferrer">
          {landing.burnout.sourceLabel}
        </a>
        . The survey covers foundation-funded organizations, so it may not represent the whole sector.
      </p>
    </div>
  );
};

Landing.propTypes = {
  lumaUrl: PropTypes.string.isRequired,
};

const Register = ({ event, embeds }) => (
  <aside className="workshop-register paper-card accent-orange">
    {embeds ? (
      <iframe
        className="luma-event-embed"
        src={embedUrl(event.lumaEventId)}
        title={`Register: ${event.title}`}
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
      />
    ) : (
      <div className="workshop-blocked">
        <p>Registration is hidden because embedded content is turned off in your privacy choices.</p>
        <button type="button" className="button accent" onClick={openCookieSettings}>
          Change cookie settings
        </button>
      </div>
    )}
    {/* Always available, in case the embed does not load. */}
    <p className="workshop-fallback">
      Trouble loading registration?{' '}
      <a href={event.lumaUrl} target="_blank" rel="noopener noreferrer">
        Open it on Luma →
      </a>
    </p>
  </aside>
);

Register.propTypes = {
  event: PropTypes.shape({
    lumaEventId: PropTypes.string.isRequired,
    lumaUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  embeds: PropTypes.bool.isRequired,
};

const Workshops = () => {
  const [embeds, setEmbeds] = useState(() => embedsAllowed(readConsent()));

  useEffect(() => subscribeConsent((preferences) => setEmbeds(embedsAllowed(preferences))), []);

  return (
    <div className="workshops-page">
      <Seo
        title="AI Workshops for Nonprofits - Data Diplomats"
        description="AI training and workshops for nonprofits: use AI for grant writing, volunteer management, fundraising campaigns and social services, and give your executive director their time back."
        type="website"
        name="AI Workshops"
      />

      <PageIntro eyebrow="AI Workshops" title={<>Learn AI by <em>building with it.</em></>}>
        Hands-on AI workshops for nonprofit staff and volunteers. Register right here.
      </PageIntro>

      <section className="workshops-list">
        <div className="workshops-wrap">
          {workshopData.events.map((event) => (
            <article key={event.lumaEventId} className="workshop">
              <Landing lumaUrl={event.lumaUrl} />
              <Register event={event} embeds={embeds} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Workshops;
