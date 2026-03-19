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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMinistries from './pages/AdminMinistries';
import AdminEvents from './pages/AdminEvents';
import AdminSermons from './pages/AdminSermons';
import AdminPastors from './pages/AdminPastors';
import AdminGallery from './pages/AdminGallery';
import AdminUsers from './pages/AdminUsers';

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
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/ministries" element={<AdminMinistries />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/sermons" element={<AdminSermons />} />
          <Route path="/admin/pastors" element={<AdminPastors />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/users" element={<AdminUsers />} />
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
          <NavbarWrapper />
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

function NavbarWrapper() {
  return <Navbar />;
}
