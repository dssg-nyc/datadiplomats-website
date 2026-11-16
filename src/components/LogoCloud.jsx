import PropTypes from 'prop-types';
import './LogoCloud.css';

/* Logo strip in the site's paper-card style. Logos with an href link out;
   the rest are plain images. Equal cells so round seals and wide wordmarks
   carry similar visual weight. */
const LogoCloud = ({ title, logos }) => (
  <div className="logo-cloud">
    <h3 className="logo-cloud-title">{title}</h3>
    <div className="logo-cloud-logos">
      {logos.map((logo) =>
        logo.href ? (
          <a
            key={logo.alt}
            className="logo-cloud-item"
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </a>
        ) : (
          <span key={logo.alt} className="logo-cloud-item">
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </span>
        ),
      )}
    </div>
  </div>
);

LogoCloud.propTypes = {
  title: PropTypes.string.isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default LogoCloud;
