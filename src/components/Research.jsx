import Seo from './Seo';
import PageIntro from './PageIntro';
import siteProperties from '../data/siteproperties.json';
import './Research.css';

// Served from its own Vercel project through a rewrite in vercel.json, so this
// is a plain <a> (full page load), not a router <Link>.
const STUDY_URL = '/research/evolution-of-human-skills/';

const ERAS = [
  { n: 'I', name: 'Steam & Mechanization', years: '1760–1840' },
  { n: 'II', name: 'Electricity & Mass Production', years: '1870–1914' },
  { n: 'III', name: 'Computing & Automation', years: '1969–2000s' },
  { n: 'IV', name: 'AI & Cyber-Physical Systems', years: '2017–today' },
];

const FINDINGS = [
  {
    title: 'The cognitive inversion',
    body: 'For 250 years machines replaced muscle and routine calculation while people moved up to analysis and judgment. Generative AI is the first wave aimed at that symbolic, cognitive work.',
  },
  {
    title: 'The broken apprenticeship ladder',
    body: 'Entry-level tasks used to teach novices the craft. When AI absorbs them, the path from junior to expert gets harder to climb.',
  },
  {
    title: 'Decades became months',
    body: 'Past revolutions spread as fast as canals, rails and wires could be built. Software models reach billions of people almost at once.',
  },
];

const Research = () => (
  <div className="research-page">
    <Seo
      title="Research - Data Diplomats"
      description="Interactive research from Data Diplomats, including Evolution of Human Skills: how four industrial revolutions displaced, transformed and created human skills, and what AI changes."
      type="website"
      name="Research"
    />

    <PageIntro eyebrow="Research" title={<>Research you can <em>explore.</em></>}>
      Interactive studies on technology, work and the communities they reshape. Each one puts the
      data in your hands.
    </PageIntro>

    <section className="research-feature" aria-labelledby="ehs-title">
      <article className="study-card">
        <a className="study-visual" href={STUDY_URL} tabIndex={-1} aria-hidden="true">
          <div className="study-visual-inner">
            <span className="study-visual-kicker">Interactive study</span>
            <ol className="study-eras">
              {ERAS.map((era) => (
                <li key={era.n}>
                  <span className="study-era-n">{era.n}</span>
                  <span className="study-era-name">{era.name}</span>
                  <span className="study-era-years">{era.years}</span>
                </li>
              ))}
            </ol>
            <span className="study-visual-cta">Launch the explorer →</span>
          </div>
        </a>

        <div className="study-body">
          <p className="eyebrow">Featured study</p>
          <h2 className="display-heading" id="ehs-title">Evolution of Human Skills</h2>
          <p className="study-lede">
            Which skills disappeared, which changed and which were born in each of the four
            industrial revolutions, and why the AI era breaks the pattern. Scrub through 250 years
            of history, inspect individual skills, and compare how nations and workers fared.
          </p>

          <ul className="study-findings">
            {FINDINGS.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>

          <div className="study-actions">
            <a className="button" href={STUDY_URL}>
              Explore the interactive study
            </a>
            <a className="study-secondary" href={`${STUDY_URL}?view=archive`}>
              Read the full dossier
            </a>
          </div>
        </div>
      </article>
    </section>

    <section className="page-cta-row">
      <p className="research-follow">New studies land on our Substack first.</p>
      <a
        className="button secondary"
        href={siteProperties.socialProfiles.substack}
        target="_blank"
        rel="noopener noreferrer"
      >
        Follow us on Substack
      </a>
    </section>
  </div>
);

export default Research;
