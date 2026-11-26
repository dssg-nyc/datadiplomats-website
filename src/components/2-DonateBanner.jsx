import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './DonateBanner.css';

// Pixels of scroll during which the band holds still so the crossfade and a
// short full-artwork dwell play out with the media fully in view. Kept short
// so it never becomes a scroll trap.
const HOLD = 240;

// Holiday-campaign donation banner above the site header, adapted from the
// Mozilla Foundation homepage's Giving Tuesday pushdown banner
// (mozillafoundation.org, data-banner-style="pushdown"): a full-width orange
// band with the campaign headline and Donate button on the left, a photo on
// the right, and a centered Skip Down control. It fills the top of the
// viewport on load and slides away with the visitor's first scroll; the
// fixed site header rises into its place. As the band scrolls, the workshop
// photo smoothly crossfades into the 2027 hackathon-series theme artwork.
// Presentational only: no network, no storage, no consent impact.
export default function DonateBanner() {
  const barRef = useRef(null);
  const spacerRef = useRef(null);
  const photoRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const spacer = spacerRef.current;
    if (!bar || !spacer) return undefined;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = null;
    const apply = () => {
      frame = null;
      const height = bar.offsetHeight;
      const scrollY = window.scrollY;
      const hold = reduceMotion ? 0 : HOLD;
      const shift = Math.min(Math.max(0, scrollY - hold), height);
      bar.style.transform = `translateY(${-shift}px)`;
      spacer.style.height = `${height}px`;
      // The fixed site header reads this to sit directly under the banner
      // while it is visible and settle at the top once it scrolls away.
      root.style.setProperty('--donate-banner-top', `${height - shift}px`);
      // Smooth scroll-driven crossfade from the photo to the theme artwork.
      // It plays during the hold and completes at three quarters of it,
      // leaving a readable full-artwork dwell before the band scrolls away.
      // Reduced motion: no crossfade, no hold; the photo simply scrolls away.
      if (artRef.current && photoRef.current) {
        const fade = reduceMotion || hold === 0 ? 0 : Math.min(1, scrollY / (hold * 0.75));
        artRef.current.style.opacity = String(fade);
        photoRef.current.style.opacity = String(1 - fade);
      }
    };
    const onScroll = () => { if (frame === null) frame = window.requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      root.style.removeProperty('--donate-banner-top');
    };
  }, []);

  const skipDown = () => {
    // Clear both the banner and the scroll-hold so the transition is fully done.
    const target = (barRef.current?.offsetHeight ?? 0) + HOLD + 80;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <>
      <div className="donate-banner-spacer" ref={spacerRef} aria-hidden="true" />
      <div className="donate-banner" ref={barRef}>
        <div className="donate-banner-inner">
          <div className="donate-banner-copy">
            <h2 className="donate-banner-title">
              Help us raise funding for nonprofit tech, and pro bono work for social good.
            </h2>
            <p className="donate-banner-subtitle">
              Proceeds will aid our 2027 hackathon series from mental health to museum tech to transportation.
            </p>
            <Link className="donate-banner-cta" to="/give">
              Donate <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="donate-banner-media">
            <img
              ref={photoRef}
              src="/images/holiday-campaign.jpg"
              alt="Participants collaborating on laptops at a Data Diplomats nonprofit hackathon"
              loading="eager"
            />
            <img
              ref={artRef}
              className="donate-banner-art"
              src="/images/hackathon-themes-2027.jpg"
              alt="Artwork for the eight 2027 Data Diplomats hackathon themes: museums, newsrooms, immigration, food sustainability and safety, youth education, mental health, transportation, and democracy"
              loading="eager"
            />
          </div>
        </div>
        <button type="button" className="donate-banner-skip" onClick={skipDown}>
          <span className="donate-banner-skip-label">Skip down</span>
          <span className="donate-banner-skip-arrow" aria-hidden="true">&darr;</span>
        </button>
      </div>
    </>
  );
}
