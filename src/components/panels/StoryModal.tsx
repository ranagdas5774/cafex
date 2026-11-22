'use client';

import React from 'react';
import { X, Award, Compass, Heart } from 'lucide-react';
import { useSceneStore } from '@/lib/store/useSceneStore';

export const StoryModal: React.FC = () => {
  const { isStoryModalOpen, closeModals } = useSceneStore();

  if (!isStoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModals}
      />

      <div className="relative w-full max-w-lg bg-cafe-cream rounded-2xl border border-cafe-line shadow-2xl overflow-hidden p-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={closeModals}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-cafe-sand/50 text-cafe-espresso transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-cafe-line pb-4 mb-5">
          <span className="text-[11px] font-semibold text-cafe-gold uppercase tracking-widest block">
            Brand Heritage & Architecture
          </span>
          <h3 className="text-2xl font-serif font-bold text-cafe-dark mt-1">
            Our Physical & Digital Sanctuary
          </h3>
        </div>

        <div className="space-y-4 text-xs text-cafe-espresso/90 leading-relaxed">
          <p>
            Maison Café was conceived as a communion between architectural honesty and single-origin coffee reverence. Built with reclaimed teak timber, hand-pressed terracotta tiles, and brutalist exposed concrete, our physical space in Colaba is now faithfully mirrored in this interactive 3D realm.
          </p>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-3 bg-white rounded-xl border border-cafe-line">
              <Award className="w-5 h-5 text-cafe-gold mb-1" />
              <h4 className="font-serif font-bold text-sm text-cafe-dark">Shade Grown</h4>
              <p className="text-[11px] text-cafe-espresso/70 mt-0.5">Sustainably cultivated Arabica under native rainforest canopies.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-cafe-line">
              <Heart className="w-5 h-5 text-cafe-gold mb-1" />
              <h4 className="font-serif font-bold text-sm text-cafe-dark">84% Butter Viennoiserie</h4>
              <p className="text-[11px] text-cafe-espresso/70 mt-0.5">Slow 72-hour cold-fermented doughs for airy golden layers.</p>
            </div>
          </div>

          <p>
            Every 3D object in this digital twin reflects our actual dining floor, custom espresso bar, and artisan bakery. Whether you explore virtually or step through our physical doors, the experience remains uncompromisingly artisanal.
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-full mt-6 py-3 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-semibold text-xs tracking-wider uppercase shadow-md transition-all"
        >
          Resume 3D Exploration
        </button>
      </div>
    </div>
  );
};
