'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, Calendar, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CafeCanvas } from '@/three/CafeCanvas';
import { ZoneSwitcher } from '@/components/storefront/ZoneSwitcher';
import { PRODUCTS } from '@/lib/data/seedData';
import { formatINR } from '@/lib/utils';
import { useCartStore } from '@/lib/store/useCartStore';
import { useSceneStore } from '@/lib/store/useSceneStore';

export default function HomePage() {
  const addItem = useCartStore((state) => state.addItem);
  const { setZone, openHotspot } = useSceneStore();

  return (
    <div className="flex flex-col">
      {/* 3D VIRTUAL TOUR HERO SECTION */}
      <section className="relative w-full h-[82vh] min-h-[600px] bg-cafe-dark overflow-hidden select-none">
        {/* Floating Top Brand Title */}
        <div className="absolute top-6 left-6 z-30 pointer-events-none max-w-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cafe-gold/20 border border-cafe-gold/40 text-cafe-amber text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-cafe-gold" />
            Interactive 3D Virtual Twin
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide mt-2 drop-shadow-md">
            Maison Sanctuary
          </h1>
          <p className="text-xs text-cafe-sand/80 mt-1 leading-relaxed drop-shadow">
            Drag mouse to rotate · Scroll to zoom · Click pins on coffee counter & bakery to inspect and order.
          </p>
        </div>

        {/* The 3D Canvas */}
        <CafeCanvas className="w-full h-full" />

        {/* Floating Interactive Zone Switcher Bar */}
        <ZoneSwitcher />
      </section>

      {/* QUICK VALUE PROPOSITION BAR */}
      <div className="bg-cafe-paper border-y border-cafe-line py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-around gap-6 text-xs text-cafe-espresso/90 font-medium">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-cafe-gold" />
            <span>100% Single-Origin Arabica Roasts</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cafe-gold" />
            <span>72hr Laminated Viennoiserie</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cafe-gold" />
            <span>Real-time Architectural Table Reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cafe-gold" />
            <span>Verified Secure Razorpay Checkout</span>
          </div>
        </div>
      </div>

      {/* SIGNATURE PRODUCTS SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold block mb-2">
              Curated Roastery & Bakery
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafe-dark">
              Signature Café Offerings
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cafe-roast hover:text-cafe-gold mt-4 md:mt-0 transition-colors"
          >
            Explore Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-cafe-line p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-cafe-sand to-cafe-paper flex items-center justify-center relative overflow-hidden mb-4">
                  <Coffee className="w-12 h-12 text-cafe-gold/40 group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cafe-dark/80 backdrop-blur-sm text-[10px] uppercase font-bold text-cafe-gold tracking-wider">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-cafe-dark">
                  {product.name}
                </h3>
                <p className="text-xs text-cafe-espresso/70 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cafe-line flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cafe-espresso/60 block uppercase">Price</span>
                  <span className="text-lg font-serif font-bold text-cafe-dark">
                    {formatINR(product.basePricePaise)}
                  </span>
                </div>

                {product.modifierGroups && product.modifierGroups.length > 0 ? (
                  <button
                    onClick={() => {
                      if (product.hotspotId) {
                        openHotspot(product.hotspotId, 'open_product', product.id);
                      } else {
                        addItem(product);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Customize
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(product)}
                    className="px-4 py-2 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Add +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE RESERVATION BANNER */}
      <section className="bg-cafe-dark text-cafe-cream py-16 px-4 sm:px-6 lg:px-8 border-y border-cafe-walnut">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold">
              Reserved Dining Experiences
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Dine Amidst Our Sunlit Colaba Sanctuary
            </h2>
            <p className="text-xs text-cafe-sand/80 leading-relaxed">
              Guarantee your table by the arched steel-frame windows. Perfect for business meetings, afternoon coffee tastings, or intimate weekend brunches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setZone('seating');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full bg-cafe-paper/10 hover:bg-cafe-paper/20 text-cafe-cream border border-cafe-gold/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-cafe-gold" />
              View Table in 3D
            </button>
            <Link
              href="/reservations"
              className="px-7 py-3.5 rounded-full bg-cafe-gold hover:bg-cafe-amber text-cafe-dark font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              Book Table Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
