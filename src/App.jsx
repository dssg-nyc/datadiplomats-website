import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SiteBar from './components/SiteBar';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import DataDiplomats from './components/DataDiplomats';
import Portfolio from './components/Portfolio';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import AiPolicy from './components/legal/AiPolicy';

// The program page used to live at /diplomats; keep old links (and their
// #section) working now that it is the homepage.
const ToHome = () => {
  const { hash } = useLocation();
  return <Navigate to={{ pathname: '/', hash }} replace />;
};

function App() {
  return (
      <div className="App">
        <ScrollToTop />
        <SiteBar />
        <Routes>
          <Route path="/" element={<DataDiplomats />} />
          <Route path="/diplomats" element={<ToHome />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/ai-policy" element={<AiPolicy />} />
          <Route path="*" element={<ToHome />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
  );
}

export default App;
