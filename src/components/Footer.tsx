import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-pap-primary text-white/80 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
        <div className="space-y-4 sm:space-y-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight">PAP</span>
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed">
            Praise Church Pentecostals. A community of believers dedicated to worshiping God, growing in faith, and serving our neighbors with the love of Christ.
          </p>
          <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            <a href="https://www.facebook.com/share/1aCtXYyDg2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-pap-sand hover:text-pap-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"><Facebook size={18} className="sm:w-5 sm:h-5" /></a>
            <a href="https://www.instagram.com/papchurch" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-pap-sand hover:text-pap-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"><Instagram size={18} className="sm:w-5 sm:h-5" /></a>
            <a href="#" aria-label="Watch us on YouTube" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-pap-sand hover:text-pap-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"><Youtube size={18} className="sm:w-5 sm:h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6">Quick Links</h4>
          <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-[11px] xs:text-xs sm:text-sm">
            <li><Link to="/about" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">About Us</Link></li>
            <li><Link to="/service-info" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Service Info</Link></li>
            <li><Link to="/ministries" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Ministries</Link></li>
            <li><Link to="/events" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Events</Link></li>
            <li><Link to="/sermons" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Sermons</Link></li>
            <li><Link to="/gallery" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Gallery</Link></li>
            <li><Link to="/connect" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Connect</Link></li>
            <li><Link to="/give" className="hover:text-pap-sand transition-colors block py-1.5 min-h-[44px] flex items-center">Give</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6">Contact Us</h4>
          <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-[11px] xs:text-xs sm:text-sm">
            <li className="flex items-start gap-2 sm:gap-3">
              <MapPin size={14} className="shrink-0 text-pap-sand mt-0.5 sm:mt-1" />
              <span>144 7th St. Countryside Ave, Brgy. Sta Lucia, Pasig, Philippines 1608</span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <Phone size={14} className="shrink-0 text-pap-sand" />
              <span>(555) 777-1234</span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <Mail size={14} className="shrink-0 text-pap-sand" />
              <span className="break-all">contact@papchurch.org</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6">Service Times</h4>
          <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-[11px] xs:text-xs sm:text-sm">
            <li>
              <p className="font-semibold text-white text-[11px] xs:text-xs sm:text-sm">Sunday Morning Service</p>
              <p className="text-[10px] xs:text-[11px] sm:text-xs">9:00 AM</p>
            </li>
            <li>
              <p className="font-semibold text-white text-[11px] xs:text-xs sm:text-sm">Sunday Afternoon Service</p>
              <p className="text-[10px] xs:text-[11px] sm:text-xs">2:00 PM (1st Sunday)</p>
            </li>
            <li>
              <p className="font-semibold text-white text-[11px] xs:text-xs sm:text-sm">Midweek Bible Class</p>
              <p className="text-[10px] xs:text-[11px] sm:text-xs">Wednesdays at 7:30 PM</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-white/10 text-center text-[10px] xs:text-xs sm:text-[11px]">
        <p>&copy; {new Date().getFullYear()} Praise Church Pentecostals. All rights reserved.</p>
      </div>
    </footer>
  );
}
