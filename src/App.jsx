import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';
import DataDiplomats from './components/DataDiplomats';
import Apps from './components/Apps';
import Research from './components/Research';
import Workshops from './components/Workshops';
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
        <Header />
        <Routes>
          <Route path="/" element={<DataDiplomats />} />
          <Route path="/diplomats" element={<ToHome />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/*" element={<Navigate to="/blog" replace />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/research" element={<Research />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/portfolio" element={<Navigate to="/apps" replace />} />
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
