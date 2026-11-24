import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Give.css';
import Seo from './Seo';
import PageIntro from './PageIntro';
import siteProperties from '../data/siteproperties.json';
import matchData from '../data/employermatch.json';
import { searchEmployers } from '../giving/employerMatch';

const EMAIL = 'mailto:dssgnyc@gmail.com';
const { org, platforms, employers, checkedOn } = matchData;

const checkedLabel = new Date(`${checkedOn}T12:00:00`).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
});

const SearchSteps = ({ platformId }) => {
  const platform = platforms[platformId] || platforms.other;
  const steps = platform.steps || [
    'Open your employer’s giving or matching portal from your company’s internal site or benefits page.',
    `Search for ${org.name} or EIN ${org.ein}.`,
    'Make your gift, then check your employer’s instructions for requesting a match. Some programs need a separate request.',
  ];
  return (
    <>
      <ol className="give-steps">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
      {platform.stepsSource && (
        <p className="give-note">
          <a href={platform.stepsSource.url} target="_blank" rel="noopener noreferrer">{platform.stepsSource.label}</a>
        </p>
      )}
    </>
  );
};

const PlatformStatus = ({ platformId }) => {
  const platform = platforms[platformId] || platforms.other;
  return (
    <p className={`give-status ${platform.ready ? 'is-ready' : 'is-pending'}`}>
      <strong>{platform.ready ? 'Ready for gifts' : 'Not confirmed yet'}</strong> {platform.readyNote}
    </p>
  );
};

const EmployerResult = ({ employer }) => (
  <article className="paper-card accent-blue give-result" aria-live="polite">
    <span className="portfolio-kicker tint-blue">Checked {checkedLabel}</span>
    <h3 className="give-card-title">{employer.name}</h3>
    <p>{employer.program}</p>
    <p className="give-platform">Platform: <strong>{(platforms[employer.platform] || platforms.other).name}</strong></p>
    <PlatformStatus platformId={employer.platform} />
    <SearchSteps platformId={employer.platform} />
    <p className="give-note">
      Source: <a href={employer.source.url} target="_blank" rel="noopener noreferrer">{employer.source.label}</a>.
      Your employer sets the match rules and timing, and the match may come after your own gift.
    </p>
  </article>
);

const Fallback = ({ query }) => (
  <article className="paper-card accent-orange give-result" aria-live="polite">
    <span className="portfolio-kicker tint-orange">Not checked yet</span>
    <h3 className="give-card-title">We have not verified {query.trim() ? `“${query.trim()}”` : 'that company'}</h3>
    <p>We would rather say so than send you to a guessed link. Here is how to find out whether your employer matches gifts:</p>
    <ol className="give-steps">
      <li>Search your company’s internal site or benefits page for “matching gifts” or “workplace giving”.</li>
      <li>If your employer uses a giving portal, search it for {org.name} or EIN {org.ein}.</li>
      <li>If you cannot find a program, ask HR or your company’s giving team.</li>
    </ol>
    <p className="give-note">
      Found your employer’s portal and it does not list us?{' '}
      <a href={EMAIL}>Contact us</a> with the company name.
    </p>
  </article>
);

SearchSteps.propTypes = { platformId: PropTypes.string.isRequired };
PlatformStatus.propTypes = { platformId: PropTypes.string.isRequired };
EmployerResult.propTypes = {
  employer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    program: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    source: PropTypes.shape({ url: PropTypes.string, label: PropTypes.string }).isRequired,
  }).isRequired,
};
Fallback.propTypes = { query: PropTypes.string.isRequired };

const EmployerSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const matches = useMemo(() => searchEmployers(query, employers), [query]);
  const selected = employers.find((e) => e.id === selectedId) || null;
  const hasQuery = query.trim().length >= 2;

  const onChange = (event) => { setQuery(event.target.value); setSelectedId(null); };
  const onSubmit = (event) => {
    event.preventDefault();
    if (matches[0]) setSelectedId(matches[0].id);
    else if (hasQuery) setSelectedId('none');
  };

  const showFallback = selectedId === 'none' || (!selected && hasQuery && matches.length === 0);

  return (
    <div className="give-search">
      <form className="give-search-form" onSubmit={onSubmit} role="search">
        <label htmlFor="give-company" className="give-label">Your company</label>
        <div className="give-search-row">
          <input
            id="give-company"
            className="give-input"
            type="search"
            value={query}
            onChange={onChange}
            placeholder="Type a company name"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby="give-company-hint"
          />
          <button className="button accent" type="submit">Find my route</button>
        </div>
        <p id="give-company-hint" className="give-note">
          Runs in your browser. What you type is not sent or saved.
        </p>
      </form>

      {!selected && matches.length > 0 && (
        <ul className="give-suggestions" aria-label="Matching companies">
          {matches.map((employer) => (
            <li key={employer.id}>
              <button type="button" className="give-chip" onClick={() => setSelectedId(employer.id)}>{employer.name}</button>
            </li>
          ))}
        </ul>
      )}

      {!selected && !hasQuery && (
        <>
          <p className="give-note">Companies and platforms we have checked so far:</p>
          <ul className="give-suggestions" aria-label="Companies we have checked">
            {employers.map((employer) => (
              <li key={employer.id}>
                <button type="button" className="give-chip" onClick={() => setSelectedId(employer.id)}>{employer.name}</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {selected && <EmployerResult employer={selected} />}
      {showFallback && <Fallback query={query} />}
    </div>
  );
};

const Give = () => (
  <div className="give-page">
    <Seo
      title="Give - Data Diplomats"
      description="Give to Data Diplomats directly, from a donor-advised fund, or through your employer's workplace giving and matching program."
      type="website"
      name="Give"
    />

    <PageIntro eyebrow="Give" title={<>Give once. <em>Ask your employer to match it.</em></>}>
      Ways to support Data Diplomats, including through your employer’s workplace giving or matching program.
    </PageIntro>

    <section className="give-section" aria-labelledby="give-ways-title">
      <div className="give-wrap">
        <div>
          <p className="eyebrow">Ways to give</p>
          <h2 className="display-heading" id="give-ways-title">Pick the route that fits you</h2>
        </div>
        <div className="give-grid">
          <article className="paper-card accent-orange give-card">
            <span className="portfolio-kicker tint-orange">Direct</span>
            <h3 className="give-card-title">Give directly</h3>
            <p>Direct online giving is not available on this page yet. For questions about giving, contact us.</p>
            <a className="button quiet" href={EMAIL}>Contact us</a>
          </article>
          <article className="paper-card accent-green give-card">
            <span className="portfolio-kicker tint-green">Donor-advised fund</span>
            <h3 className="give-card-title">Recommend a grant</h3>
            <p>If you hold a donor-advised fund, recommend a grant to <strong>{org.name}</strong>. Your fund sponsor will ask for the organization name and EIN.</p>
            <p className="give-ein">EIN {org.ein}</p>
          </article>
          <article className="paper-card accent-blue give-card">
            <span className="portfolio-kicker tint-blue">Workplace giving</span>
            <h3 className="give-card-title">Give through your employer</h3>
            <p>Many employers run a giving portal and some match gifts. Look up your company below.</p>
            <a className="button quiet" href="#employer-match">Find my company</a>
          </article>
        </div>
        <p className="give-note">A gift through your workplace, a match from your employer, and a donor-advised fund grant are three different things. Each follows its own rules and timing.</p>
      </div>
    </section>

    <section className="give-section give-match" id="employer-match" aria-labelledby="give-match-title">
      <div className="give-wrap">
        <div>
          <p className="eyebrow">Employer match</p>
          <h2 className="display-heading" id="give-match-title">Find your employer’s route</h2>
          <p className="give-lede">Search for your company. If we have checked it, you get the platform and steps. If not, you get an honest next step instead of a guess.</p>
        </div>
        <EmployerSearch />
      </div>
    </section>

    <section className="give-section give-bottom" aria-labelledby="give-help-title">
      <div className="give-wrap">
        <div className="portfolio-cta">
          <div>
            <h2 className="portfolio-cta-title" id="give-help-title">Questions about giving?</h2>
            <p className="portfolio-cta-body">Book a call or email us about supporting a Data Diplomat.</p>
          </div>
          <div className="give-cta-actions">
            <a className="button accent" href={siteProperties.calendlyUrl} target="_blank" rel="noopener noreferrer">Book a free call</a>
            <a className="button quiet" href={EMAIL}>Email us</a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Give;
