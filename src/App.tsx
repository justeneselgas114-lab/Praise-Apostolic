import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { EditModeProvider } from './contexts/EditModeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PasswordPrompt from './components/PasswordPrompt';
import TurnOffNotification from './components/TurnOffNotification';
import Home from './pages/Home';
import About from './pages/About';
import Ministries from './pages/Ministries';
import Give from './pages/Give';
import Connect from './pages/Connect';
import ServiceInfo from './pages/ServiceInfo';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Gallery from './pages/Gallery';
import GalleryFolderView from './pages/GalleryFolderView';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service-info" element={<ServiceInfo />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:folderId" element={<GalleryFolderView />} />
          <Route path="/give" element={<Give />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <EditModeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        <PasswordPrompt />
        <TurnOffNotification />
      </Router>
    </EditModeProvider>
  );
}
