import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './DonateBanner.css';

// Pixels of scroll during which the band holds still so the crossfade and a
// short full-artwork dwell play out with the media fully in view. Kept short
// so it never becomes a scroll trap.
const HOLD = 240;

// The instruction text the "Copy instructions" button copies. The donor pastes
// it into their assistant (Claude, ChatGPT, Instinct, Muse or any other) to
// start the donation journey: check the employer's matching program first,
// otherwise give directly on Givebutter. It asks the assistant to stop
// before any payment or match submission so the donor confirms the amount;
// the donor can override that in their chat. Keep wording changes to this
// one constant.
const AI_PROMPT = `Please help me donate to Data Diplomats for Nonprofits, Inc. (EIN 41-4925712), a 501(c)(3) nonprofit. Start by checking whether my employer matches charitable donations.

Employer matching guide: https://www.datadiplomats.org/give/
Donation page: https://givebutter.com/aiforgood

1. Ask me who my employer is, then help me check whether they match charitable donations, using the guide above for the portals where this nonprofit is set up. If you can't verify my employer's program, tell me you couldn't confirm it. Don't conclude there's no match.
2. If a match is available, help me follow that program's steps to make my gift and request the match. If there's no match, or I'd rather give directly, ask how much I'd like to give and walk me through the donation page.
3. Either way - matched or direct - stop before any payment or match submission. I'll review the final amount and confirm it myself.

If you can't open links or complete a step, give me the link and the exact steps to do it myself.`;

// Copies AI_PROMPT to the clipboard. Clipboard access needs HTTPS and a real
// tap, both satisfied here. Falls back to the legacy textarea copy, then to a
// visible panel the donor can copy from by hand.
function CopyForAiButton() {
  const [state, setState] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const copy = async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(AI_PROMPT);
        copied = true;
      }
    } catch {
      copied = false;
    }
    if (!copied) {
      try {
        const ta = document.createElement('textarea');
        ta.value = AI_PROMPT;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        copied = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        copied = false;
      }
    }
    if (copied) {
      setState('copied');
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setState('idle'), 2000);
    } else {
      // The panel grows the banner; let the scroll handler re-measure it.
      setState('manual');
      window.requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }
  };

  return (
    <span className="donate-banner-ai">
      <button
        type="button"
        className="donate-banner-ai-button"
        onClick={copy}
        aria-describedby="donate-banner-ai-help"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
          <rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span aria-live="polite">{state === 'copied' ? 'Copied' : 'Copy instructions'}</span>
      </button>
      <span id="donate-banner-ai-help" className="donate-banner-ai-help">
        Paste into your AI agent to donate or check employer matching.
      </span>
      {state === 'manual' && (
        <span className="donate-banner-ai-manual">
          <label htmlFor="donate-banner-ai-text">Copy these instructions into your AI assistant:</label>
          <textarea
            id="donate-banner-ai-text"
            readOnly
            value={AI_PROMPT}
            rows={6}
            onFocus={(e) => e.target.select()}
          />
        </span>
      )}
    </span>
  );
}

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
            <div className="donate-banner-actions">
              <Link className="donate-banner-cta" to="/give">
                Donate <span aria-hidden="true">&rarr;</span>
              </Link>
              <CopyForAiButton />
            </div>
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
