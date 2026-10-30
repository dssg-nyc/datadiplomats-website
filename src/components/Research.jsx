import Seo from './Seo';
import PageIntro from './PageIntro';
import siteProperties from '../data/siteproperties.json';
import './Research.css';

const Research = () => (
  <div className="research-page">
    <Seo
      title="Research - Data Diplomats"
      description="Research from Data Diplomats on human-centered AI for nonprofits and the communities they serve."
      type="website"
      name="Research"
    />

    <PageIntro eyebrow="Research" title={<>Research is <em>coming soon.</em></>}>
      We are putting together our research on human-centered AI for nonprofits. Follow us on
      Substack to see it first.
    </PageIntro>

    <section className="page-cta-row">
      <a
        className="button accent"
        href={siteProperties.socialProfiles.substack}
        target="_blank"
        rel="noopener noreferrer"
      >
        Follow us on Substack
      </a>
    </section>
  </div>
);

export default Research;
