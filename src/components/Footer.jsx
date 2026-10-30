import { Link } from 'react-router-dom';
import './Footer.css';
import siteProperties from '../data/siteproperties.json';
import socialIcons from '../data/socialicons.json';
import SectionLink from './SectionLink';
import { openCookieSettings } from '../consent/consent';

const PROGRAM_LINKS = [
  { label: 'Ways to volunteer', section: 'ways' },
  { label: 'What you’ll learn', section: 'program' },
  { label: 'Requirements', section: 'expectations' },
  { label: 'Apply', section: 'apply' },
];

const MORE_LINKS = [
  { label: 'Volunteer with us', href: siteProperties.volunteerFormUrl },
  { label: 'Our work', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Events', href: 'https://luma.com/calendar/cal-4VqcQEpR4zqBF8Q' },
  { label: 'NYC x DSSG', href: 'https://dssg-nyc.github.io/' },
];

const CONNECT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/dssg-nyc' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/groups/13349223/' },
  { label: 'Substack', href: 'https://ai4nonprofits.substack.com/' },
  { label: 'dssgnyc@gmail.com', href: 'mailto:dssgnyc@gmail.com' },
];

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-brand-text">
                <span className="footer-brand-name">Data Diplomats</span>
                <span className="footer-brand-sub">for Nonprofits</span>
              </div>
            </div>
            <p className="footer-description">
              Data Diplomats for Nonprofits is a 501(c)(3) nonprofit that trains volunteers to bring
              human-centered, frontier AI to mission-driven organizations. Founded in New York City.
            </p>
            <div className="footer-social">
              {Object.entries(siteProperties.socialProfiles).map(([key, value]) =>
                socialIcons[key] ? (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={key}
                    className="footer-social-link"
                    aria-label={key}
                  >
                    <img src={socialIcons[key]} alt="" />
                  </a>
                ) : null
              )}
            </div>
          </div>

          <div className="footer-columns">
            <nav className="footer-column" aria-label="The program">
              <h2 className="footer-column-title">The program</h2>
              {PROGRAM_LINKS.map((link) => (
                <SectionLink key={link.label} section={link.section}>
                  {link.label}
                </SectionLink>
              ))}
            </nav>

            <nav className="footer-column" aria-label="More">
              <h2 className="footer-column-title">More</h2>
              {MORE_LINKS.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <nav className="footer-column" aria-label="Connect">
              <h2 className="footer-column-title">Connect</h2>
              {CONNECT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                </a>
              ))}
              <a
                className="footer-donate"
                href="https://givebutter.com/aiforgood"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-copy">
            <p>
              &copy; {new Date().getFullYear()} Data Diplomats for Nonprofits, Inc. — 501(c)(3)
              IRS-registered organization. EIN 41-4925712.
            </p>
            <p className="footer-address">{siteProperties.address}</p>
            <p>Organizing before coding.</p>
          </div>
          <nav className="footer-legal" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/ai-policy">AI Policy</Link>
            <button type="button" className="footer-link-button" onClick={openCookieSettings}>
              Cookie settings
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
