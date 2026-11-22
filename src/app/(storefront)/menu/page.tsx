'use client';

import React, { useState } from 'react';
import { Coffee, Plus, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/seedData';
import { formatINR } from '@/lib/utils';
import { useCartStore } from '@/lib/store/useCartStore';
import { useSceneStore } from '@/lib/store/useSceneStore';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const addItem = useCartStore((state) => state.addItem);
  const openHotspot = useSceneStore((state) => state.openHotspot);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'coffee', label: 'Espresso & Milk' },
    { id: 'brews', label: 'Single-Origin Brews' },
    { id: 'bakery', label: 'French Viennoiserie' },
    { id: 'dessert', label: 'Artisan Desserts' },
    { id: 'cold', label: 'Cold Beverages' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Description */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-cafe-gold">
          Seasonal Roasts & Bakes
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cafe-dark mt-2">
          The Artisanal Menu
        </h1>
        <p className="text-xs sm:text-sm text-cafe-espresso/80 mt-3 leading-relaxed">
          Every espresso is pulled from micro-lot single-origin Arabica; every pastry is laminated in small batches using 84% butter and cold-fermented for 72 hours.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === c.id
                ? 'bg-cafe-roast text-cafe-cream shadow-md'
                : 'bg-white border border-cafe-line text-cafe-espresso hover:border-cafe-gold'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-cafe-line p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-48 rounded-xl bg-gradient-to-br from-cafe-sand to-cafe-paper flex items-center justify-center relative overflow-hidden mb-5">
                <Coffee className="w-12 h-12 text-cafe-gold/40" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cafe-dark/80 backdrop-blur-sm text-[10px] uppercase font-bold text-cafe-gold tracking-wider">
                  {product.category}
                </span>
                {product.hotspotId && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-cafe-gold/20 border border-cafe-gold text-[10px] uppercase font-bold text-cafe-espresso flex items-center gap-1 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-cafe-gold" />
                    3D Object
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-cafe-dark">
                    {product.name}
                  </h3>
                  <p className="text-xs text-cafe-espresso/70 mt-1.5 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cafe-line flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cafe-espresso/60 block uppercase">Price</span>
                <span className="text-xl font-serif font-bold text-cafe-dark">
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
                  className="px-5 py-2.5 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4 text-cafe-gold" />
                  Customize & Add
                </button>
              ) : (
                <button
                  onClick={() => addItem(product)}
                  className="px-5 py-2.5 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4 text-cafe-gold" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
