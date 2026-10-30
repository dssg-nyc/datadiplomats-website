import { useEffect, useState } from 'react';
import Seo from './Seo';
import PageIntro from './PageIntro';
import siteProperties from '../data/siteproperties.json';
import workshopData from '../data/workshops.json';
import { defaultPreferences, openCookieSettings, readConsent, subscribeConsent } from '../consent/consent';
import './Workshops.css';

const LUMA_SCRIPT_ID = 'luma-checkout';
const LUMA_SCRIPT_SRC = 'https://embed.lu.ma/checkout-button.js';

const embedsAllowed = (preferences) => (preferences || defaultPreferences()).embeds;

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
  return { date, time: `${time(start)} – ${time(end, true)}`, end };
};

const Workshop = ({ event, embeds }) => {
  const { date, time, end } = formatWhen(event);
  const isOver = Date.now() > end.getTime();

  return (
    <article className="workshop paper-card accent-orange">
      <div className="workshop-head">
        <p className="eyebrow">{event.level} level</p>
        <h2 className="display-heading workshop-title">{event.title}</h2>
        <ul className="workshop-facts">
          <li><strong>When</strong> {date}, {time}</li>
          <li><strong>Where</strong> {event.format}</li>
          <li><strong>Price</strong> {event.price}</li>
        </ul>
        <p className="workshop-summary">{event.summary}</p>

        {isOver ? (
          <a className="button accent" href={siteProperties.eventsUrl} target="_blank" rel="noopener noreferrer">
            See upcoming events
          </a>
        ) : (
          // Luma's script turns this link into a checkout pop-up. Without the
          // script (blocked, or embeds turned off) it is a plain link to the event.
          <a
            href={event.lumaUrl}
            className="luma-checkout--button button accent workshop-register"
            data-luma-action={embeds ? 'checkout' : undefined}
            data-luma-event-id={event.lumaEventId}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register for Event
          </a>
        )}
      </div>

      <div className="workshop-body">
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
};

const Workshops = () => {
  const [embeds, setEmbeds] = useState(() => embedsAllowed(readConsent()));

  useEffect(() => subscribeConsent((preferences) => setEmbeds(embedsAllowed(preferences))), []);

  // Luma's script wires up the register buttons that exist when it loads, so
  // load a fresh copy each time this page mounts and drop it when it unmounts.
  useEffect(() => {
    if (!embeds) {
      return undefined;
    }
    const script = document.createElement('script');
    script.id = LUMA_SCRIPT_ID;
    script.src = LUMA_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, [embeds]);

  return (
    <div className="workshops-page">
      <Seo
        title="Workshops - Data Diplomats"
        description="Hands-on AI workshops for nonprofits from Data Diplomats. Practice prompting and build workflows you can run at your organization."
        type="website"
        name="Workshops"
      />

      <PageIntro eyebrow="Workshops" title={<>Learn AI by <em>building with it.</em></>}>
        Hands-on workshops for nonprofit staff and volunteers. Register below.
      </PageIntro>

      <section className="workshops-list">
        <div className="workshops-wrap">
          {workshopData.events.map((event) => (
            <Workshop key={event.lumaEventId} event={event} embeds={embeds} />
          ))}
          {!embeds && (
            <p className="workshops-note">
              The register button opens the event on Luma in a new tab because embedded content is
              turned off. <button type="button" className="workshops-note-link" onClick={openCookieSettings}>
                Change cookie settings
              </button>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Workshops;
