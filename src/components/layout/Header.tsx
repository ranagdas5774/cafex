'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Coffee, Calendar, Compass, Menu as MenuIcon, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useSceneStore } from '@/lib/store/useSceneStore';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const setZone = useSceneStore((state) => state.setZone);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cafe-cream/85 backdrop-blur-md border-b border-cafe-line transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-cafe-roast flex items-center justify-center text-cafe-amber shadow-sm group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-serif font-bold tracking-wider text-cafe-dark">
              MAISON CAFÉ
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-cafe-gold font-medium">
              Artisanal Roastery & Bistro
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cafe-espresso">
          <button
            onClick={() => {
              setZone('entrance');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 hover:text-cafe-gold transition-colors"
          >
            <Compass className="w-4 h-4 text-cafe-gold" />
            Virtual Tour
          </button>
          <Link href="/menu" className="hover:text-cafe-gold transition-colors">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-cafe-gold transition-colors">
            Reserve Table
          </Link>
          <Link href="/story" className="hover:text-cafe-gold transition-colors">
            Our Story
          </Link>
        </nav>

        {/* Right Actions: Cart & CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            aria-label="Open Cart"
            className="relative p-2.5 rounded-full bg-cafe-paper text-cafe-espresso border border-cafe-line hover:border-cafe-gold transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cafe-gold text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/reservations"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream text-xs font-semibold tracking-wider uppercase shadow-sm transition-all hover:shadow"
          >
            <Calendar className="w-3.5 h-3.5 text-cafe-gold" />
            Book Table
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-cafe-dark"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cafe-cream border-b border-cafe-line px-4 pt-2 pb-6 space-y-4">
          <button
            onClick={() => {
              setZone('entrance');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 w-full py-2 text-cafe-espresso font-medium border-b border-cafe-sand/50"
          >
            <Compass className="w-5 h-5 text-cafe-gold" />
            3D Virtual Tour
          </button>
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-cafe-espresso font-medium border-b border-cafe-sand/50"
          >
            Full Menu
          </Link>
          <Link
            href="/reservations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-cafe-espresso font-medium border-b border-cafe-sand/50"
          >
            Reserve Table
          </Link>
          <Link
            href="/story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-cafe-espresso font-medium"
          >
            Our Story & Heritage
          </Link>
        </div>
      )}
    </header>
  );
};
