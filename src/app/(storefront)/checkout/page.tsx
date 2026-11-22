'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, CheckCircle2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatINR } from '@/lib/utils';

export default function CheckoutPage() {
  const {
    items,
    getSubtotalPaise,
    getTaxPaise,
    getTotalPaise,
    clearCart,
    fulfillmentType,
    setFulfillmentType,
  } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: 'Rana Das',
    email: 'rana.das@example.com',
    phone: '+91 98200 12345',
    address: 'Flat 402, Sea Green Mansions, Colaba, Mumbai',
    notes: 'Please pack in eco-friendly kraft bag with paper cup sleeves.',
  });

  const subtotal = getSubtotalPaise();
  const tax = getTaxPaise();
  const deliveryFee = fulfillmentType === 'delivery' ? 5000 : 0; // ₹50 delivery fee
  const total = totalWithDelivery();

  function totalWithDelivery() {
    return subtotal + tax + deliveryFee;
  }

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate server order creation and Razorpay checkout handshake
    setTimeout(() => {
      const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(generatedOrderId);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="py-20 px-4 max-w-lg mx-auto text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-cafe-gold mx-auto" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-cafe-gold block">
          Order Confirmed & Paid
        </span>
        <h1 className="text-3xl font-serif font-bold text-cafe-dark">
          Thank You For Your Order!
        </h1>
        <p className="text-xs text-cafe-espresso/80 leading-relaxed">
          Order reference: <strong className="text-cafe-dark font-mono">{orderId}</strong>. We have dispatched a digital receipt and real-time status tracker to {formData.phone}.
        </p>

        <div className="p-5 rounded-2xl bg-white border border-cafe-line text-left text-xs space-y-2 mt-6">
          <div className="flex justify-between border-b border-cafe-paper pb-2">
            <span className="text-cafe-espresso/70">Fulfillment Mode</span>
            <span className="font-bold text-cafe-dark capitalize">{fulfillmentType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between border-b border-cafe-paper pb-2">
            <span className="text-cafe-espresso/70">Estimated Preparation</span>
            <span className="font-bold text-cafe-dark">15 – 20 Minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cafe-espresso/70">Pickup Address</span>
            <span className="font-bold text-cafe-dark">Maison Café, Colaba Promenade</span>
          </div>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-block px-7 py-3 rounded-full bg-cafe-roast text-cafe-cream text-xs font-semibold uppercase tracking-wider"
          >
            Return to Virtual Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 max-w-md mx-auto text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-cafe-gold/50 mx-auto" />
        <h2 className="text-2xl font-serif font-bold text-cafe-dark">Your Basket is Empty</h2>
        <p className="text-xs text-cafe-espresso/70">
          Add artisanal coffees and fresh pastries from our 3D tour or menu before proceeding to checkout.
        </p>
        <Link
          href="/menu"
          className="inline-block mt-4 px-6 py-2.5 rounded-full bg-cafe-roast text-cafe-cream text-xs font-semibold uppercase tracking-wider"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Link
        href="/menu"
        className="inline-flex items-center gap-1.5 text-xs text-cafe-espresso hover:text-cafe-gold font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Customer Information Form */}
        <form onSubmit={handlePayNow} className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-cafe-line p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-serif font-bold text-cafe-dark border-b border-cafe-line pb-3">
              1. Fulfillment Method
            </h2>
            <div className="grid grid-cols-3 gap-3 text-xs font-medium">
              {(['pickup', 'dine_in', 'delivery'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFulfillmentType(type)}
                  className={`py-3 px-3 rounded-xl border text-center capitalize transition-all ${
                    fulfillmentType === type
                      ? 'bg-cafe-roast text-white border-cafe-roast shadow-sm font-bold'
                      : 'bg-cafe-cream/40 text-cafe-espresso border-cafe-line hover:border-cafe-gold'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-serif font-bold text-cafe-dark border-b border-cafe-line pb-3 pt-4">
              2. Customer Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-cafe-espresso mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-cafe-espresso mb-1">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold uppercase tracking-wider text-cafe-espresso mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-cafe-espresso mb-1">
                    Delivery Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block font-semibold uppercase tracking-wider text-cafe-espresso mb-1">
                  Barista & Kitchen Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cafe-line bg-cafe-cream/30 text-cafe-dark text-sm focus:outline-none focus:border-cafe-gold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-cafe-line flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-cafe-gold font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit SSL Encrypted Razorpay Sandbox Checkout</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-cafe-roast hover:bg-cafe-espresso disabled:opacity-60 text-cafe-cream font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <CreditCard className="w-4 h-4 text-cafe-gold" />
              {isProcessing ? 'Processing Secure Payment...' : `Pay ${formatINR(total)} with Razorpay`}
            </button>
          </div>
        </form>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-cafe-line p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-cafe-dark border-b border-cafe-line pb-3">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-cafe-dark">
                      {item.quantity}x {item.product.name}
                    </h4>
                    {item.selectedModifiers.length > 0 && (
                      <p className="text-[11px] text-cafe-gold">
                        {item.selectedModifiers.map((m) => m.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-cafe-dark">
                    {formatINR(item.unitPricePaise * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-cafe-line space-y-2 text-xs text-cafe-espresso">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-cafe-dark">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cafe-espresso/70">
                <span>GST (5%)</span>
                <span>{formatINR(tax)}</span>
              </div>
              {fulfillmentType === 'delivery' && (
                <div className="flex justify-between text-cafe-espresso/70">
                  <span>Standard Delivery Fee</span>
                  <span>{formatINR(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-cafe-dark pt-3 border-t border-cafe-line">
                <span>Total Amount</span>
                <span className="font-serif text-cafe-gold text-lg">{formatINR(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
