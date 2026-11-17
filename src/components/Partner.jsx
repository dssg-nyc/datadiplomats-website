import './Partner.css';
import Seo from './Seo';
import PageIntro from './PageIntro';
import LogoCloud from './LogoCloud';
import siteProperties from '../data/siteproperties.json';
import partnerLogos from '../data/partnerlogos.json';

const EMAIL = 'mailto:dssgnyc@gmail.com';
const MEMBERSHIP_URL = 'https://givebutter.com/data-diplomats-annual-membership-draft-hostn6';

const paths = [
  {
    id: 'hire',
    tint: 'blue',
    kicker: 'Employers',
    title: 'Hire a Data Diplomat graduate',
    body: 'Hiring for technology, data or AI roles? Tell us what you are looking for and we will tell you whether our graduates are a fit.',
    cta: 'Book a free call',
    href: siteProperties.calendlyUrl,
  },
  {
    id: 'projects',
    tint: 'orange',
    kicker: 'Organizations',
    title: 'Have us build it',
    body: 'Tell us what your organization needs built or improved, and we will get back to you about scope and terms.',
    cta: 'Book a free call',
    href: siteProperties.calendlyUrl,
  },
  {
    id: 'membership',
    tint: 'green',
    kicker: 'Nonprofits',
    title: 'Become a member',
    body: 'Nonprofits can join Data Diplomats as members. Annual membership is set by your organization’s annual budget.',
    cta: 'Open the membership page',
    href: MEMBERSHIP_URL,
  },
];

const sponsorUses = [
  'Technology stack and AI learning costs',
  'Leadership programming',
  'Stipends for Data Diplomats',
  'Startup seed funding',
];

const Partner = () => (
  <div className="partner-page">
    <Seo
      title="Partner with us - Data Diplomats"
      description="Hire a Data Diplomat, work with us on a project, sponsor a Data Diplomat, or become a member."
      type="website"
      name="Partner"
    />

    <PageIntro eyebrow="Partner with us" title={<>Hire our talent. <em>Sponsor a Data Diplomat.</em></>}>
      Data Diplomats is a 12-week program that prepares emerging technologists to build practical technology and data tools with and for New York nonprofits.
    </PageIntro>

    <section className="partner-section" aria-labelledby="partner-ways-title">
      <div className="partner-wrap">
        <div>
          <p className="eyebrow">Employers · Nonprofits · Funders · Individual donors</p>
          <h2 className="display-heading" id="partner-ways-title">Ways to work with us</h2>
        </div>
        <div className="partner-grid">
          {paths.map((path) => (
            <article key={path.id} className={`paper-card accent-${path.tint} partner-card`}>
              <span className={`portfolio-kicker tint-${path.tint}`}>{path.kicker}</span>
              <h3 className="partner-card-title">{path.title}</h3>
              <p>{path.body}</p>
              <a className="button accent" href={path.href} target="_blank" rel="noopener noreferrer">{path.cta} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="partner-section" aria-labelledby="partner-members-title">
      <div className="partner-wrap">
        <div>
          <p className="eyebrow">Our community</p>
          <h2 className="display-heading" id="partner-members-title">Members and event collaborators</h2>
        </div>
        <div className="partner-logo-grid">
          <LogoCloud title="Our members" logos={partnerLogos.members} />
          <LogoCloud title="Event collaborators" logos={partnerLogos.eventCollaborators} />
        </div>
      </div>
    </section>

    <section className="partner-section partner-sponsor" aria-labelledby="partner-sponsor-title">
      <div className="partner-wrap">
        <div>
          <p className="eyebrow">Sponsor a Data Diplomat</p>
          <h2 className="display-heading" id="partner-sponsor-title">Help us bring AI and data expertise to charities that need it.</h2>
          <p className="partner-lede">Your gift will support the work of Data Diplomats. Most of all, it will go toward our core activity: pro bono AI and data advisory for deserving charities.</p>
        </div>
        <article className="paper-card accent-orange partner-card partner-core">
          <span className="portfolio-kicker tint-orange">Most of all</span>
          <h3 className="partner-card-title">Pro bono AI and data advisory for deserving charities</h3>
          <p>Our core activity, and where donations are meant to go first.</p>
        </article>
        <p className="partner-subhead">Donations will also help pay for:</p>
        <div className="partner-grid partner-grid-4">
          {sponsorUses.map((use, index) => (
            <article key={use} className={`paper-card accent-${['blue', 'green', 'blue', 'green'][index]} partner-card`}>
              <h3 className="partner-card-title">{use}</h3>
            </article>
          ))}
        </div>
        <div className="portfolio-cta">
          <div>
            <h2 className="portfolio-cta-title">Let’s talk about your gift</h2>
            <p className="portfolio-cta-body">Book a call or email us to talk about sponsoring a Data Diplomat.</p>
          </div>
          <div className="partner-cta-actions">
            <a className="button accent" href={siteProperties.calendlyUrl} target="_blank" rel="noopener noreferrer">Book a free call</a>
            <a className="button quiet" href={EMAIL}>Email us</a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Partner;
