import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Church } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Service Info', path: '/service-info' },
  { name: 'Ministries', path: '/ministries' },
  { name: 'Events', path: '/events' },
  { name: 'Sermons', path: '/sermons' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Connect', path: '/connect' },
  { name: 'Give', path: '/give' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navBlend, setNavBlend] = useState(0); // 0 = light logo, 1 = dark logo
  const location = useLocation();

  // Keep the navbar visible (solid background + dark text) on key routes like
  // the admin login so it doesn't blend into the page background.
  const forceSolidNav = location.pathname === '/login' || location.pathname === '/admin' || location.pathname.startsWith('/admin/dashboard');
  const isSolidNav = scrolled || forceSolidNav;

  // For admin dashboard, use dark background
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  // Choose a logo that contrasts with the navbar background.
  // We cross-fade between the light and dark versions for a smooth transition.
  const logoLight = '/images/logo1.png';
  const logoDark = '/images/logo2.png';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!forceSolidNav) {
        const blend = Math.min(1, window.scrollY / 150);
        setNavBlend(blend);
      }
    };

    // Set initial state in case the user refreshes while scrolled.
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceSolidNav]);

  useEffect(() => {
    // Force white logo on admin dashboard, dark logo on login/admin pages
    if (isAdminDashboard) {
      setNavBlend(0); // White logo for admin dashboard
    } else if (forceSolidNav) {
      setNavBlend(1); // Dark logo for login/admin pages
    }
  }, [forceSolidNav, isAdminDashboard]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        isAdminDashboard
          ? "bg-pap-primary shadow-lg py-3"
          : isSolidNav 
            ? "bg-white/40 backdrop-blur-2xl border-b border-white/20 shadow-sm py-3" 
            : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center transition-all duration-500 overflow-hidden flex-shrink-0">
              <img
                src={logoLight}
                alt="PAP Logo"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                style={{ opacity: 1 - navBlend }}
                referrerPolicy="no-referrer"
              />
              <img
                src={logoDark}
                alt="PAP Logo"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                style={{ opacity: navBlend }}
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 flex-nowrap">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs uppercase tracking-widest font-bold transition-all relative group py-1",
                  isAdminDashboard
                    ? "text-white/80"
                    : isSolidNav 
                      ? "text-pap-primary/80" 
                      : "text-white/80",
                  isAdminDashboard && location.pathname === link.path 
                    ? "text-white"
                    : location.pathname === link.path && (isSolidNav ? "text-pap-primary" : "text-white")
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-pap-sand transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path && "w-full"
                )} />
              </Link>
            ))}
            
            {/* (Edit toggle removed) */}
            
            { !location.pathname.startsWith('/admin/dashboard') && (
              <Link
                to="/connect"
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-sm hover:shadow-md active:scale-95",
                  isAdminDashboard
                    ? "bg-white text-pap-primary hover:bg-white/90"
                    : isSolidNav 
                      ? "bg-pap-primary text-white hover:bg-pap-primary/90" 
                      : "bg-pap-sand text-white hover:bg-pap-sand/90"
                )}
                // prevent button text from wrapping
                style={{ whiteSpace: 'nowrap' }}
              >
                Plan Your Visit
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 relative z-50 focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={cn(
                "w-full h-0.5 transition-all duration-300 rounded-full",
                isAdminDashboard 
                  ? "bg-white" 
                  : (isSolidNav || isOpen) 
                    ? "bg-pap-primary" 
                    : "bg-white",
                isOpen ? "rotate-45 translate-y-2" : ""
              )} />
              <span className={cn(
                "w-full h-0.5 transition-all duration-300 rounded-full",
                isAdminDashboard 
                  ? "bg-white" 
                  : (isSolidNav || isOpen) 
                    ? "bg-pap-primary" 
                    : "bg-white",
                isOpen ? "opacity-0 translate-x-2" : ""
              )} />
              <span className={cn(
                "w-full h-0.5 transition-all duration-300 rounded-full",
                isAdminDashboard 
                  ? "bg-white" 
                  : (isSolidNav || isOpen) 
                    ? "bg-pap-primary" 
                    : "bg-white",
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Moved outside of nav for better layering */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pap-primary/40 backdrop-blur-md z-[100] md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 35, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-pap-light shadow-2xl flex flex-col h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-pap-primary/10 flex items-center justify-center text-pap-primary hover:bg-pap-primary/20 transition-colors z-10"
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col h-full pt-16">
                <div className="p-6 flex flex-col gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-pap-primary/30">Navigation</span>
                    <div className="h-0.5 w-8 bg-pap-sand" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link, idx) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.04 }}
                      >
                        <Link
                          to={link.path}
                          className={cn(
                            "text-2xl font-serif font-bold transition-all block py-2 px-4 rounded-lg",
                            location.pathname === link.path 
                              ? "text-pap-sand bg-pap-primary/10 translate-x-1" 
                              : "text-pap-primary hover:text-pap-sand hover:bg-pap-primary/5 hover:translate-x-1"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto p-6 bg-gradient-to-t from-pap-primary/10 to-pap-primary/5 space-y-6">
                  {/* Admin Login Toggle - Mobile */}
                  {/* (Edit toggle removed) */}
                  
                  { !location.pathname.startsWith('/admin/dashboard') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        to="/connect"
                        className="block w-full bg-pap-primary text-white text-center py-4 rounded-xl font-bold text-base shadow-lg active:scale-95 transition-transform hover:bg-pap-primary/90"
                      >
                        Plan Your Visit
                      </Link>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="space-y-4 p-4 bg-white/30 rounded-lg backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-pap-primary/40">Our Location</span>
                      <p className="text-pap-primary text-sm font-medium">123 Apostolic Way, Pentecost City</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pap-primary text-white flex items-center justify-center shadow-md">
                        <Church className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-pap-primary">Praise Church</span>
                        <span className="text-xs text-pap-primary/60">Pentecostals</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </>
  );
}
