'use client';

import React, { useState } from 'react';
import { X, Plus, Check, Coffee, Sparkles } from 'lucide-react';
import { useSceneStore } from '@/lib/store/useSceneStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { PRODUCTS } from '@/lib/data/seedData';
import { formatINR } from '@/lib/utils';
import { ModifierOption } from '@/types';

export const ProductHotspotModal: React.FC = () => {
  const { isProductModalOpen, activeProductId, closeModals } = useSceneStore();
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.id === activeProductId);

  const [selectedModifiers, setSelectedModifiers] = useState<
    { groupId: string; option: ModifierOption }[]
  >([]);

  React.useEffect(() => {
    // Preselect defaults if available
    if (product?.modifierGroups) {
      const defaults = product.modifierGroups
        .filter((g) => g.required && g.options.length > 0)
        .map((g) => ({ groupId: g.id, option: g.options[0] }));
      setSelectedModifiers(defaults);
    } else {
      setSelectedModifiers([]);
    }
  }, [product]);

  if (!isProductModalOpen || !product) return null;

  const handleOptionSelect = (groupId: string, option: ModifierOption, isRequired: boolean) => {
    setSelectedModifiers((prev) => {
      if (isRequired) {
        return [...prev.filter((m) => m.groupId !== groupId), { groupId, option }];
      } else {
        const exists = prev.find((m) => m.groupId === groupId && m.option.id === option.id);
        if (exists) {
          return prev.filter((m) => !(m.groupId === groupId && m.option.id === option.id));
        } else {
          return [...prev, { groupId, option }];
        }
      }
    });
  };

  const optionsExtraPaise = selectedModifiers.reduce((acc, curr) => acc + curr.option.priceDeltaPaise, 0);
  const currentTotalPaise = product.basePricePaise + optionsExtraPaise;

  const handleAddToCart = () => {
    addItem(product, 1, selectedModifiers);
    closeModals();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModals}
      />

      <div className="relative w-full max-w-lg bg-cafe-cream rounded-2xl border border-cafe-line shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Banner */}
        <div className="relative bg-gradient-to-r from-cafe-espresso to-cafe-roast text-cafe-cream p-6 pb-5">
          <button
            onClick={closeModals}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-cafe-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-cafe-amber text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Product View</span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
            {product.name}
          </h3>
          <p className="text-xs text-cafe-sand/80 mt-1">
            {product.description}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Base Price & Highlights */}
          <div className="flex items-center justify-between pb-4 border-b border-cafe-line">
            <span className="text-xs font-semibold uppercase text-cafe-espresso tracking-wider">
              Estate Roast Unit Price
            </span>
            <span className="text-xl font-serif font-bold text-cafe-dark">
              {formatINR(product.basePricePaise)}
            </span>
          </div>

          {/* Modifier Groups */}
          {product.modifierGroups?.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-cafe-espresso">
                <span>{group.name}</span>
                {group.required && (
                  <span className="text-[10px] text-cafe-gold uppercase">Required</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.options.map((opt) => {
                  const isSelected = selectedModifiers.some(
                    (m) => m.groupId === group.id && m.option.id === opt.id
                  );
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleOptionSelect(group.id, opt, group.required)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isSelected
                          ? 'border-cafe-gold bg-cafe-paper shadow-sm font-semibold text-cafe-dark'
                          : 'border-cafe-line bg-white text-cafe-espresso/80 hover:border-cafe-gold/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-cafe-gold border-cafe-gold text-white'
                              : 'border-cafe-line'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <span>{opt.name}</span>
                      </div>
                      {opt.priceDeltaPaise > 0 && (
                        <span className="text-[11px] text-cafe-gold font-bold">
                          +{formatINR(opt.priceDeltaPaise)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Total and Add to Cart Button */}
        <div className="p-6 bg-cafe-paper border-t border-cafe-line flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-cafe-espresso/60">
              Total Selection
            </span>
            <span className="text-xl font-serif font-bold text-cafe-dark">
              {formatINR(currentTotalPaise)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-5 rounded-xl bg-cafe-roast hover:bg-cafe-espresso text-cafe-cream font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-cafe-gold" />
            Add to Order Cart
          </button>
        </div>
      </div>
    </div>
  );
};
