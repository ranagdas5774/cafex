'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatINR } from '@/lib/utils';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    getSubtotalPaise,
    getTaxPaise,
    getTotalPaise,
    fulfillmentType,
    setFulfillmentType,
  } = useCartStore();

  if (!isCartOpen) return null;

  const subtotal = getSubtotalPaise();
  const tax = getTaxPaise();
  const total = getTotalPaise();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cafe-cream border-l border-cafe-line shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-cafe-line flex items-center justify-between bg-cafe-paper">
            <div className="flex items-center gap-2 text-cafe-espresso">
              <ShoppingBag className="w-5 h-5 text-cafe-gold" />
              <h3 className="font-serif font-bold text-lg">Your Café Order</h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-full hover:bg-cafe-sand/50 text-cafe-espresso transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="p-4 bg-cafe-paper/50 border-b border-cafe-line">
            <span className="block text-xs font-semibold text-cafe-espresso uppercase tracking-wider mb-2">
              Fulfillment Method:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-medium">
              {(['pickup', 'dine_in', 'delivery'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFulfillmentType(type)}
                  className={`py-2 px-3 rounded-lg border text-center capitalize transition-all ${
                    fulfillmentType === type
                      ? 'bg-cafe-roast text-white border-cafe-roast shadow-sm'
                      : 'bg-white text-cafe-espresso border-cafe-line hover:border-cafe-gold'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-cafe-espresso/60 space-y-3">
                <ShoppingBag className="w-12 h-12 text-cafe-gold/50" />
                <p className="text-sm font-medium">Your basket is currently empty.</p>
                <p className="text-xs max-w-xs">
                  Click on the 3D coffee counter hotspots or browse our menu to add artisanal brews and pastries.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-xl bg-white border border-cafe-line shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-cafe-dark">
                        {item.product.name}
                      </h4>
                      {item.selectedModifiers.length > 0 && (
                        <p className="text-[11px] text-cafe-gold font-medium mt-0.5">
                          {item.selectedModifiers.map((m) => m.name).join(' · ')}
                        </p>
                      )}
                      <span className="block text-xs text-cafe-espresso/80 font-semibold mt-1">
                        {formatINR(item.unitPricePaise)} each
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-cafe-espresso/40 hover:text-red-500 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-cafe-paper">
                    <div className="flex items-center border border-cafe-line rounded-lg overflow-hidden bg-cafe-paper/50">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 hover:bg-cafe-sand text-cafe-espresso transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-cafe-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 hover:bg-cafe-sand text-cafe-espresso transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-cafe-dark">
                      {formatINR(item.unitPricePaise * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 bg-cafe-paper border-t border-cafe-line space-y-4">
              <div className="space-y-1.5 text-xs text-cafe-espresso">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-cafe-espresso/70">
                  <span>Estimated GST (5%)</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-cafe-dark pt-2 border-t border-cafe-line">
                  <span>Total Amount</span>
                  <span className="text-cafe-gold font-serif text-base">{formatINR(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
              >
                Proceed to Payment
                <ArrowRight className="w-4 h-4 text-cafe-gold" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
