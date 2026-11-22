'use client';

import React, { useState } from 'react';
import { X, Award, Compass, Heart, Star, MapPin, Clock, Phone, Sparkles, Quote } from 'lucide-react';
import { useSceneStore } from '@/lib/store/useSceneStore';

export const StoryModal: React.FC = () => {
  const { isStoryModalOpen, closeModals } = useSceneStore();
  const [activeTab, setActiveTab] = useState<'story' | 'gallery' | 'reviews'>('story');

  if (!isStoryModalOpen) return null;

  const testimonials = [
    {
      name: 'Aarav Singhania',
      role: 'Architect & Regular',
      comment: 'The fidelity between their physical Colaba sanctuary and this 3D experience is breathtaking. Their Velvet Cortado is unmatched anywhere in Mumbai.',
      rating: 5,
    },
    {
      name: 'Claire Beauchamp',
      role: 'Food & Wine Critic',
      comment: 'The 72-hour cold-fermented viennoiserie achieves that elusive Parisian shatter and buttery honeycomb interior. An extraordinary standard.',
      rating: 5,
    },
    {
      name: 'Dr. Rohan Kelkar',
      role: 'Coffee Connoisseur',
      comment: 'Single-origin washed catuai poured over V60 with notes of jasmine and wild honey. You can literally smell the Chikmagalur estate in every cup.',
      rating: 5,
    },
  ];

  const galleryImages = [
    { title: 'Artisanal Teak & Marble Counter', subtitle: 'Custom La Marzocco Station' },
    { title: 'The Sunlit Arch Windows', subtitle: 'Colaba Heritage Promenade' },
    { title: 'Micro-Lot Chikmagalur Harvest', subtitle: 'Biodiverse Shade-Grown Arabica' },
    { title: 'Daily Viennoiserie Lamination', subtitle: '84% Cultured Normandy Butter' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={closeModals}
      />

      <div className="relative w-full max-w-xl bg-cafe-cream rounded-3xl border border-cafe-line shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[88vh] overflow-y-auto flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeModals}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-cafe-sand/50 text-cafe-espresso transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-cafe-line pb-4 mb-4">
          <span className="text-[11px] font-bold text-cafe-gold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Zone 5: Brand Experience & Heritage
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-cafe-dark mt-1">
            Maison Sanctuary & Story
          </h3>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4">
            {(['story', 'gallery', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-cafe-roast text-cafe-cream shadow-sm'
                    : 'bg-white border border-cafe-line text-cafe-espresso hover:border-cafe-gold'
                }`}
              >
                {tab === 'story' ? 'Our Heritage' : tab === 'gallery' ? 'Café Gallery' : 'Customer Reviews'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Heritage Story */}
        {activeTab === 'story' && (
          <div className="space-y-4 text-xs text-cafe-espresso/90 leading-relaxed">
            <p>
              Maison Café was conceived as a communion between architectural honesty and single-origin coffee reverence. Built with reclaimed teak timber, hand-pressed terracotta tiles, and brutalist exposed concrete, our physical space in Colaba is now faithfully mirrored in this interactive 3D digital twin.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1">
              <div className="p-3.5 bg-white rounded-2xl border border-cafe-line shadow-xs">
                <Award className="w-5 h-5 text-cafe-gold mb-1" />
                <h4 className="font-serif font-bold text-sm text-cafe-dark">Shade Grown</h4>
                <p className="text-[11px] text-cafe-espresso/70 mt-0.5">Sustainably cultivated Arabica under native rainforest canopies.</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-cafe-line shadow-xs">
                <Heart className="w-5 h-5 text-cafe-gold mb-1" />
                <h4 className="font-serif font-bold text-sm text-cafe-dark">84% Butter Bakes</h4>
                <p className="text-[11px] text-cafe-espresso/70 mt-0.5">Slow 72-hour cold-fermented doughs for airy golden layers.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cafe-paper/70 border border-cafe-line/80 space-y-1.5">
              <h5 className="font-serif font-bold text-xs text-cafe-dark flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cafe-gold" />
                Colaba Physical Sanctuary
              </h5>
              <p className="text-[11px] text-cafe-espresso/80">
                Plot 14, Heritage Promenade, Colaba Arts District, Mumbai. Open daily 07:30 AM – 11:30 PM.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Actual Café Photographs & Visual Gallery */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 gap-3 py-1">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-cafe-line p-3 shadow-xs space-y-2 hover:border-cafe-gold transition-colors"
              >
                <div className="w-full h-24 rounded-xl bg-gradient-to-br from-cafe-sand to-cafe-paper flex items-center justify-center text-cafe-gold/60 font-serif font-bold text-xs text-center p-2">
                  {img.title}
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xs text-cafe-dark">{img.title}</h5>
                  <p className="text-[10px] text-cafe-espresso/70">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Customer Testimonials */}
        {activeTab === 'reviews' && (
          <div className="space-y-3 py-1">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-cafe-line p-4 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-serif font-bold text-xs text-cafe-dark">{t.name}</h5>
                    <span className="text-[10px] text-cafe-gold font-medium">{t.role}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-cafe-espresso/80 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={closeModals}
          className="w-full mt-6 py-3 rounded-2xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-semibold text-xs tracking-wider uppercase shadow-md transition-all"
        >
          Resume 3D Tour Exploration
        </button>
      </div>
    </div>
  );
};
