'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Layers,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Today's Gross Sales",
      value: formatINR(4850000), // ₹48,500
      change: '+18.4% vs last Sunday',
      icon: DollarSign,
      color: 'text-emerald-600',
    },
    {
      title: 'Active Live Orders',
      value: '14',
      change: '4 preparing · 3 ready for pickup',
      icon: ShoppingBag,
      color: 'text-amber-600',
    },
    {
      title: 'Reservations Today',
      value: '28 Tables',
      change: '88% peak dining occupancy',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Active 3D Hotspots',
      value: '5 Mapped',
      change: 'All connected to live catalog',
      icon: Sparkles,
      color: 'text-purple-600',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-90214',
      customer: 'Priya Sharma',
      items: '2x Velvet Cortado (Oat Milk), 1x Cruffin',
      total: formatINR(74000),
      status: 'Preparing',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      time: '6 mins ago',
      type: 'Pickup',
    },
    {
      id: 'ORD-90213',
      customer: 'Vikram Mehta',
      items: '1x Chikmagalur V60, 2x French Croissant',
      total: formatINR(70000),
      status: 'Ready',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      time: '14 mins ago',
      type: 'Dine-In (Table 4)',
    },
    {
      id: 'ORD-90212',
      customer: 'Ananya Roy',
      items: '1x 24hr Nitro Cold Brew',
      total: formatINR(26000),
      status: 'Completed',
      statusColor: 'bg-gray-100 text-gray-800 border-gray-300',
      time: '28 mins ago',
      type: 'Delivery',
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cafe-line pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-cafe-gold block">
            Maison Back-Office Operations
          </span>
          <h1 className="text-3xl font-serif font-bold text-cafe-dark mt-1">
            Store & Sanctuary Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white border border-cafe-line hover:border-cafe-gold text-cafe-espresso text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cafe-gold" />
            View Live Virtual Café
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-cafe-line p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cafe-espresso/70 uppercase tracking-wider">
                  {s.title}
                </span>
                <div className={`p-2 rounded-lg bg-cafe-paper ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-serif font-bold text-cafe-dark">
                {s.value}
              </div>
              <div className="text-[11px] text-cafe-espresso/70 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                <span>{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Order Queue & Management Sections */}
      <div className="bg-white rounded-3xl border border-cafe-line p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-cafe-line pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-cafe-dark">
              Live Order Fulfillment Pipeline
            </h3>
            <p className="text-xs text-cafe-espresso/70 mt-0.5">
              Real-time orders validated and verified via Razorpay webhook.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Webhook Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cafe-paper text-cafe-espresso/60 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Order Reference</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Items & Modifiers</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-paper">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-cafe-cream/40 transition-colors">
                  <td className="py-4 font-mono font-bold text-cafe-dark">{order.id}</td>
                  <td className="py-4 font-medium text-cafe-dark">{order.customer}</td>
                  <td className="py-4 text-cafe-espresso/80 max-w-xs">{order.items}</td>
                  <td className="py-4 font-serif font-bold text-cafe-dark">{order.total}</td>
                  <td className="py-4 text-cafe-espresso/70">{order.type}</td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-cafe-paper hover:bg-cafe-sand text-cafe-espresso font-semibold text-[11px] transition-colors">
                      Advance Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
