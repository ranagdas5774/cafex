import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Clock, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cafe-dark text-cafe-cream border-t border-cafe-walnut/50 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cafe-gold text-cafe-dark flex items-center justify-center font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-wider text-cafe-cream">
              MAISON CAFÉ
            </span>
          </div>
          <p className="text-xs text-cafe-sand/80 leading-relaxed">
            Where architecture, roasted single-origin coffees, and artisanal French viennoiserie converge in an immersive sanctuary.
          </p>
          <div className="flex items-center gap-2 text-xs text-cafe-gold">
            <ShieldCheck className="w-4 h-4" />
            <span>FSSAI Certified · Verified Safe Ordering</span>
          </div>
        </div>

        {/* Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cafe-gold flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Opening Hours
          </h4>
          <ul className="text-xs text-cafe-sand/90 space-y-1.5">
            <li className="flex justify-between">
              <span>Monday – Friday:</span>
              <span className="font-medium text-white">07:30 AM – 10:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday – Sunday:</span>
              <span className="font-medium text-white">08:00 AM – 11:30 PM</span>
            </li>
            <li className="pt-2 text-[11px] text-cafe-amber">
              *Kitchen closes 45 minutes prior to closing.
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cafe-gold flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            Sanctuary Location
          </h4>
          <p className="text-xs text-cafe-sand/90 leading-relaxed">
            Plot 14, Heritage Promenade, Colaba Arts District, Mumbai, Maharashtra 400001
          </p>
          <div className="pt-1 text-xs space-y-1 text-cafe-sand/80">
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-cafe-gold" /> +91 98200 12345</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cafe-gold" /> bonjour@maisoncafe.in</p>
          </div>
        </div>

        {/* Navigation & Policies */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cafe-gold">
            Information
          </h4>
          <ul className="text-xs space-y-2 text-cafe-sand/80">
            <li><Link href="/menu" className="hover:text-cafe-gold transition-colors">Seasonal Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-cafe-gold transition-colors">Table Bookings & Private Events</Link></li>
            <li><Link href="/story" className="hover:text-cafe-gold transition-colors">Origin Roasters & Farmers</Link></li>
            <li><Link href="/admin/dashboard" className="text-cafe-gold/70 hover:text-cafe-gold transition-colors">Staff / Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-cafe-walnut/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cafe-sand/60">
        <p>© 2026 Maison Café India Private Limited. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Crafted with React Three Fiber, Three.js, Next.js & Razorpay.</p>
      </div>
    </footer>
  );
};
