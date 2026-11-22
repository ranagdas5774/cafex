'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { useSceneStore } from '@/lib/store/useSceneStore';

export const ReservationModal: React.FC = () => {
  const { isReservationModalOpen, closeModals } = useSceneStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
  });

  if (!isReservationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModals}
      />

      <div className="relative w-full max-w-md bg-cafe-cream rounded-2xl border border-cafe-line shadow-2xl overflow-hidden p-6">
        <button
          onClick={closeModals}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-cafe-sand/50 text-cafe-espresso transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-cafe-gold mx-auto" />
            <h3 className="font-serif font-bold text-2xl text-cafe-dark">Table Reserved!</h3>
            <p className="text-xs text-cafe-espresso/80 max-w-xs mx-auto leading-relaxed">
              Your table for {formData.guests} on {formData.date} at {formData.time} is held. We have sent an SMS confirmation to {formData.phone || 'your phone'}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                closeModals();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-cafe-roast text-cafe-cream text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-cafe-line pb-3">
              <span className="text-[11px] font-semibold text-cafe-gold uppercase tracking-widest block">
                Virtual 3D Table Reservation
              </span>
              <h3 className="text-xl font-serif font-bold text-cafe-dark mt-0.5">
                Reserve Table No. 4 (Window Booth)
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-cafe-espresso mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rana Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-cafe-line bg-white focus:outline-none focus:border-cafe-gold text-cafe-dark"
                />
              </div>

              <div>
                <label className="block font-medium text-cafe-espresso mb-1">Mobile Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98200 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-cafe-line bg-white focus:outline-none focus:border-cafe-gold text-cafe-dark"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-medium text-cafe-espresso mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-cafe-gold" /> Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-2.5 py-2.5 rounded-lg border border-cafe-line bg-white focus:outline-none focus:border-cafe-gold text-cafe-dark"
                  >
                    {[1, 2, 3, 4, 6, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-cafe-espresso mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cafe-gold" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-2 py-2 rounded-lg border border-cafe-line bg-white focus:outline-none focus:border-cafe-gold text-cafe-dark"
                  />
                </div>

                <div>
                  <label className="block font-medium text-cafe-espresso mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cafe-gold" /> Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-2 py-2.5 rounded-lg border border-cafe-line bg-white focus:outline-none focus:border-cafe-gold text-cafe-dark"
                  >
                    {['09:00', '11:30', '14:00', '16:30', '19:00', '20:30', '21:30'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-semibold text-xs tracking-wider uppercase shadow-md transition-all"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
