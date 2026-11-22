'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    tableArea: 'window',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold">
          Table Concierge
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cafe-dark mt-2">
          Reserve Your Table
        </h1>
        <p className="text-xs sm:text-sm text-cafe-espresso/80 mt-3 leading-relaxed">
          Select your desired dining area, date, and party size. We hold reserved tables for up to 15 minutes past the booking slot.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cafe-line shadow-sm overflow-hidden p-8 sm:p-10">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-cafe-gold mx-auto" />
            <h2 className="text-3xl font-serif font-bold text-cafe-dark">
              Reservation Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-cafe-espresso/80 max-w-md mx-auto leading-relaxed">
              We look forward to welcoming you, <strong className="text-cafe-dark">{formData.name}</strong>. A reservation confirmation and calendar invite have been sent to <strong className="text-cafe-dark">{formData.email || formData.phone}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-cafe-paper inline-block text-left text-xs text-cafe-espresso space-y-1 mt-4">
              <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
              <p><strong>Party:</strong> {formData.guests} Guests ({formData.tableArea} Area)</p>
              <p><strong>Location:</strong> Plot 14, Heritage Promenade, Colaba, Mumbai</p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full bg-cafe-roast text-cafe-cream text-xs font-semibold uppercase tracking-wider"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rana Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rana@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Guests *
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Seating Area
                </label>
                <select
                  value={formData.tableArea}
                  onChange={(e) => setFormData({ ...formData, tableArea: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                >
                  <option value="window">Sunlit Arched Window (Booth)</option>
                  <option value="counter">Espresso Bar High Tops</option>
                  <option value="lounge">Heritage Library Lounge</option>
                  <option value="courtyard">Outdoor Botanical Veranda</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                  Preferred Time Slot *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                >
                  {['08:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '21:30'].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-espresso mb-2">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Anniversary celebration, high chair requested, vegan milk preference..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.01]"
            >
              Confirm Architectural Table Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
