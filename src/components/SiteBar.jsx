import { Link, useLocation } from 'react-router-dom';
import SectionLink from './SectionLink';
import diplomatsData from '../data/diplomats.json';
import './SiteBar.css';

/** Site-wide top bar: brand on the left, program sections and pages on the right. */
const SiteBar = () => {
  const { pathname } = useLocation();

  return (
    <header className="sitebar">
      <div className="sitebar-inner">
        <Link to="/" className="sitebar-brand" aria-current={pathname === '/' ? 'page' : undefined}>
          Data Diplomats Program
        </Link>
        <nav aria-label="Main" className="sitebar-nav">
          {diplomatsData.sections.map(({ id, label }) => (
            <SectionLink key={id} section={id}>
              {label}
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
