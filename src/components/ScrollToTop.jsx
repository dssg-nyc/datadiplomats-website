import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// On navigation, land on the #section the link asked for, else the top.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Wait a tick so the target page has rendered its sections.
    const timer = setTimeout(() => {
      document.getElementById(hash.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
