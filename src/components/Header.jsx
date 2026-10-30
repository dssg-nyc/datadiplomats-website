import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionLink from './SectionLink';
import diplomatsData from '../data/diplomats.json';
import './Header.css';

// The NYC x DSSG header's design, carrying Data Diplomats links only.

// Above this width the full nav bar fits and the hamburger is hidden.
// Kept in sync with the breakpoint in Header.css.
const DESKTOP_QUERY = '(min-width: 1281px)';

const OUR_WORK_LINKS = [
  { label: 'AI Workshops', to: '/workshops' },
  { label: 'Research', to: '/research' },
  { label: 'Apps', to: '/apps' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const workRef = useRef(null);
  const location = useLocation();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsWorkOpen(false);
  }, []);

  const isWorkActive = OUR_WORK_LINKS.some(({ to }) => location.pathname === to);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Any navigation dismisses the panel, including back/forward.
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  // The panel covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // The Our work dropdown also opens on hover (CSS); this handles click, tap and keyboard.
  useEffect(() => {
    if (!isWorkOpen) {
      return undefined;
    }

    const handlePointer = (event) => {
      if (!workRef.current?.contains(event.target)) {
        setIsWorkOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsWorkOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointer);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWorkOpen]);

  // Widening to desktop hides the toggle — close so the scroll lock lifts with it.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);

    const handleChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [closeMenu]);

  return (
    <>
      <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img src="/images/logo3.png" alt="" className="logo-img" />
              <span className="logo-text">
                <span className="logo-title">Data Diplomats</span>
                <span className="logo-subtitle">For Nonprofits</span>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>

          <nav
            id="primary-nav"
            className={`nav-menu ${isMenuOpen ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {/* Left group: sections of the program page. */}
            {diplomatsData.sections.map(({ id, label }) => (
              <SectionLink key={id} section={id} className="nav-link" onClick={closeMenu}>
                {label}
              </SectionLink>
            ))}

            {/* Right group: the other pages, set apart so they read as their own track. */}
            <span className="nav-divider" aria-hidden="true" />
            <div className={`nav-dropdown ${isWorkOpen ? 'is-open' : ''}`} ref={workRef}>
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${isWorkActive ? 'active' : ''}`}
                aria-expanded={isWorkOpen}
                aria-controls="our-work-menu"
                onClick={() => setIsWorkOpen((open) => !open)}
              >
                Our work
              </button>
              <div id="our-work-menu" className="nav-dropdown-menu">
                {OUR_WORK_LINKS.map(({ label, to }) => (
                  <NavLink key={to} to={to} className="nav-link nav-dropdown-link" onClick={closeMenu}>
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
            <a
              href="https://givebutter.com/aiforgood"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link button-nav"
              onClick={closeMenu}
            >
              Donate
            </a>
          </nav>
        </div>
      </header>

      {/* Sibling of the header: .modern-header's backdrop-filter would trap a
          fixed-position child inside its own box. */}
      {isMenuOpen && (
        <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
};

export default Header;
