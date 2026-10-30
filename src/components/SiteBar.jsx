import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionLink from './SectionLink';
import './DataDiplomats.css';

const SECTIONS = [
  { label: 'Ways to volunteer', section: 'ways' },
  { label: 'What you’ll learn', section: 'program' },
  { label: 'Requirements', section: 'expectations' },
  { label: 'The diplomats', section: 'cohort' },
  { label: 'Apply', section: 'apply' },
];

/**
 * Site-wide top bar for datadiplomats.org: brand on the left, program
 * sections and secondary pages on the right. Also scrolls to #section on
 * arrival, which SectionLink relies on for links from other pages.
 */
const SiteBar = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <header className="dd-subbar">
      <div className="dd-subbar-inner">
        <nav aria-label="Site" className="dd-breadcrumb">
          <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>
            Data Diplomats Program
          </Link>
        </nav>
        <nav aria-label="Main" className="dd-jump">
          {SECTIONS.map((link) => (
            <SectionLink key={link.section} section={link.section}>
              {link.label}
            </SectionLink>
          ))}
          <Link to="/portfolio">Our work</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
};

export default SiteBar;
