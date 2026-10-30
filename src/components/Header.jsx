import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import siteProperties from '../data/siteproperties.json';
import './Header.css';

// Same header as the NYC x DSSG site. Its sections and Events page live
// there, so those links leave for dssg-nyc.github.io (a HashRouter site).
const DSSG = siteProperties.dssgUrl;

// Above this width the full nav bar fits and the hamburger is hidden.
// Kept in sync with the breakpoint in Header.css.
const DESKTOP_QUERY = '(min-width: 1001px)';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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
                <span className="logo-title">NYC-DSSG</span>
                <span className="logo-subtitle">Data Diplomats</span>
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
            {/* Left group: the nonprofit path through the site. */}
            <a href={`${DSSG}#/#projects`} className="nav-link">
              For Nonprofits
            </a>
            <a href={`${DSSG}#/#writing`} className="nav-link">
              Impact Stories
            </a>
            <NavLink to="/portfolio" className="nav-link" onClick={closeMenu}>
              Our Work
            </NavLink>
            <a href={`${DSSG}#/events`} className="nav-link">
              Events
            </a>

            {/* Right group: the volunteer path, set apart so it reads as its own track. */}
            <span className="nav-divider" aria-hidden="true" />
            <NavLink to="/" end className="nav-link nav-link-program" onClick={closeMenu}>
              Data Diplomats
            </NavLink>
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
