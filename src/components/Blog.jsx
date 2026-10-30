import Seo from './Seo';
import PageIntro from './PageIntro';
import siteProperties from '../data/siteproperties.json';
import './Blog.css';

// Substack refuses to load inside other sites, so the blog lives there.
const SUBSTACK_URL = siteProperties.socialProfiles.substack;

const Blog = () => (
  <div className="blog-page">
    <Seo
      title="Blog - Data Diplomats"
      description="AI for Nonprofits: writing from Data Diplomats on human-centered AI for mission-driven organizations."
      type="website"
      name="Blog"
    />

    <PageIntro eyebrow="Blog" title={<>Follow us on <em>Substack.</em></>}>
      We write about human-centered AI for nonprofits on AI for Nonprofits.
    </PageIntro>

    <section className="blog-follow">
      <a className="button accent" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
        Follow us on Substack
      </a>
    </section>
  </div>
);

export default Blog;
