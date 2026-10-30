import { useEffect, useState } from 'react';
import Seo from './Seo';
import siteProperties from '../data/siteproperties.json';
import { defaultPreferences, openCookieSettings, readConsent, subscribeConsent } from '../consent/consent';
import './Blog.css';

const SUBSTACK_URL = siteProperties.socialProfiles.substack;

const embedsAllowed = (preferences) => (preferences || defaultPreferences()).embeds;

/** The blog is the AI for Nonprofits Substack, shown full-page below the header. */
const Blog = () => {
  const [allowEmbeds, setAllowEmbeds] = useState(() => embedsAllowed(readConsent()));

  useEffect(() => subscribeConsent((preferences) => setAllowEmbeds(embedsAllowed(preferences))), []);

  return (
    <div className="blog-page">
      <Seo
        title="Blog - Data Diplomats"
        description="AI for Nonprofits: writing from Data Diplomats on human-centered AI for mission-driven organizations."
        type="website"
        name="Blog"
      />

      {/* Kept even with the embed showing: Substack can refuse to load inside
          other sites, and then this is the way through. */}
      <p className="blog-bar">
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
          Read and subscribe on Substack →
        </a>
      </p>

      {allowEmbeds ? (
        <iframe className="blog-embed" src={SUBSTACK_URL} title="AI for Nonprofits on Substack" />
      ) : (
        <div className="blog-blocked">
          <p>The embedded blog is off because of your privacy choices.</p>
          <button type="button" className="button accent" onClick={openCookieSettings}>
            Change cookie settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
