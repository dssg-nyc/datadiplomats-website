import { useEffect, useState } from 'react';
import Seo from './Seo';
import PageIntro from './PageIntro';
import workshopData from '../data/workshops.json';
import { defaultPreferences, openCookieSettings, readConsent, subscribeConsent } from '../consent/consent';
import './Workshops.css';

const embedsAllowed = (preferences) => (preferences || defaultPreferences()).embeds;

// Luma lets other sites frame only its compact event card (tickets and
// registration). The full event page sends X-Frame-Options: sameorigin, so
// the description is shown as text from workshops.json beside the card.
const embedUrl = (id) => `https://luma.com/embed/event/${id}/simple`;

const formatWhen = ({ startAt, durationMinutes, timeZone }) => {
  const start = new Date(startAt);
  const date = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(start);
  const time = (value, zone) =>
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      ...(zone && { timeZoneName: 'short' }),
    }).format(value);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return `${date}, ${time(start)} – ${time(end, true)}`;
};

const Workshop = ({ event, embeds }) => (
  <article className="workshop">
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

    <div className="workshop-details paper-card">
      <h2 className="display-heading workshop-title">{event.title}</h2>
      <ul className="workshop-facts">
        <li><strong>When</strong> {formatWhen(event)}</li>
        <li><strong>Where</strong> {event.format}</li>
        <li><strong>Price</strong> {event.price}</li>
      </ul>
      <p className="workshop-summary">{event.summary}</p>

      <section>
        <h3 className="workshop-subhead">Schedule</h3>
        <ul className="workshop-list">
          {event.schedule.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="workshop-subhead">What we will build</h3>
        <ol className="workshop-builds">
          {event.builds.map((build) => (
            <li key={build.title}>
              <strong>{build.title}.</strong> {build.detail}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="workshop-subhead">Who this is for</h3>
        <p>{event.audience}</p>
      </section>

      <section>
        <h3 className="workshop-subhead">Before you come</h3>
        <p>{event.prerequisites}</p>
      </section>

      <section>
        <h3 className="workshop-subhead">What to bring</h3>
        <ul className="workshop-list">
          {event.bring.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  </article>
);

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
          {workshopData.events.map((event) => (
            <Workshop key={event.lumaEventId} event={event} embeds={embeds} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Workshops;
