'use client';

import React from 'react';
import { Compass, Coffee, Armchair, Croissant, Sparkles } from 'lucide-react';
import { useSceneStore } from '@/lib/store/useSceneStore';
import { ZONES } from '@/lib/data/seedData';
import { ZoneId } from '@/types';

export const ZoneSwitcher: React.FC = () => {
  const { currentZone, setZone } = useSceneStore();

  const zones: { id: ZoneId; label: string; icon: any }[] = [
    { id: 'entrance', label: 'Entrance', icon: Compass },
    { id: 'counter', label: 'Espresso Bar', icon: Coffee },
    { id: 'seating', label: 'Dining Area', icon: Armchair },
    { id: 'bakery', label: 'Artisan Bakery', icon: Croissant },
    { id: 'brand', label: 'Our Story', icon: Sparkles },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="bg-cafe-dark/90 backdrop-blur-md border border-cafe-gold/30 rounded-full p-1.5 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto">
        {zones.map((z) => {
          const Icon = z.icon;
          const isActive = currentZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => setZone(z.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-cafe-gold text-cafe-dark shadow-md scale-[1.02]'
                  : 'text-cafe-cream/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{z.label}</span>
            </button>
          );
        })}
      </div>

      {/* Zone Active Subtitle Badge */}
      <div className="text-center mt-2.5">
        <p className="text-[11px] text-cafe-cream/90 bg-cafe-dark/80 backdrop-blur-sm inline-block px-4 py-1 rounded-full border border-cafe-line/30 shadow">
          <span className="text-cafe-amber font-semibold uppercase tracking-wider mr-1.5">
            Viewing: {ZONES[currentZone]?.name}
          </span>
          · Click glowing markers to inspect items
        </p>
      </div>
    </div>
  );
};
