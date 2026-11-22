import React from 'react';
import Link from 'next/link';
import { Coffee, Award, MapPin, Compass, Clock } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold">
          Our Roasting & Architectural Philosophy
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark">
          From Shade-Grown Soil to Porcelain Cup
        </h1>
        <p className="text-xs sm:text-sm text-cafe-espresso/80 leading-relaxed">
          Maison Café was established in 2024 in Colaba, Mumbai, with an uncompromising devotion to architectural beauty, single-origin Indian coffee estates, and traditional French slow-fermented baking.
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-cafe-line p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cafe-paper flex items-center justify-center text-cafe-gold">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-cafe-dark">Chikmagalur Estates</h3>
          <p className="text-xs text-cafe-espresso/80 leading-relaxed">
            We partner directly with high-elevation, biodiverse shade-grown farms in Karnataka, roasting in micro-batches to accentuate origin terroir and natural floral sweetness.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cafe-line p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cafe-paper flex items-center justify-center text-cafe-gold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-cafe-dark">72hr Viennoiserie</h3>
          <p className="text-xs text-cafe-espresso/80 leading-relaxed">
            Our pastry chef laminates dough exclusively with 84% Normandy butter, slow-proofing across three days for micro-thin honeycomb interior crumb structure.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cafe-line p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cafe-paper flex items-center justify-center text-cafe-gold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-cafe-dark">Architectural Twin</h3>
          <p className="text-xs text-cafe-espresso/80 leading-relaxed">
            Our virtual 3D platform uses accurate architectural scans and real furniture materials, letting you experience our sanctuary from anywhere in the world.
          </p>
        </div>
      </div>

      {/* Physical Visit Card */}
      <div className="bg-cafe-dark text-cafe-cream rounded-3xl p-8 sm:p-12 border border-cafe-walnut flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold">
            Physical Sanctuary
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Visit Us in Colaba, Mumbai
          </h2>
          <p className="text-xs text-cafe-sand/80 leading-relaxed">
            Plot 14, Heritage Promenade, Colaba Arts District. Open daily for morning espresso tastings, afternoon business work, and weekend brunch.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-cafe-gold pt-2">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 07:30 AM – 11:30 PM</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Valet Parking Available</span>
          </div>
        </div>

        <Link
          href="/reservations"
          className="px-8 py-3.5 rounded-full bg-cafe-gold hover:bg-cafe-amber text-cafe-dark font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 whitespace-nowrap"
        >
          Book Your Table
        </Link>
      </div>
    </div>
  );
}
