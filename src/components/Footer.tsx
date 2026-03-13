import { Link } from 'react-router-dom';
import { Church, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pap-primary text-white/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Church className="w-8 h-8" />
            <span className="font-serif text-xl font-bold tracking-tight">PAP</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Praise Church Pentecostals. A community of believers dedicated to worshiping God, growing in faith, and serving our neighbors with the love of Christ.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pap-sand transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pap-sand transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-pap-sand transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-pap-sand transition-colors">About Us</Link></li>
            <li><Link to="/service-info" className="hover:text-pap-sand transition-colors">Service Info</Link></li>
            <li><Link to="/ministries" className="hover:text-pap-sand transition-colors">Ministries</Link></li>
            <li><Link to="/events" className="hover:text-pap-sand transition-colors">Events</Link></li>
            <li><Link to="/sermons" className="hover:text-pap-sand transition-colors">Sermons</Link></li>
            <li><Link to="/gallery" className="hover:text-pap-sand transition-colors">Gallery</Link></li>
            <li><Link to="/connect" className="hover:text-pap-sand transition-colors">Connect</Link></li>
            <li><Link to="/give" className="hover:text-pap-sand transition-colors">Give</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-pap-sand" />
              <span>123 Apostolic Way, Pentecost City, PC 77777</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-pap-sand" />
              <span>(555) 777-1234</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-pap-sand" />
              <span>contact@papchurch.org</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">Service Times</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <p className="font-semibold text-white">Sunday Worship</p>
              <p>10:00 AM & 6:00 PM</p>
            </li>
            <li>
              <p className="font-semibold text-white">Midweek Service</p>
              <p>Thursdays at 7:30 PM</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Praise Church Pentecostals. All rights reserved.</p>
      </div>
    </footer>
  );
}
