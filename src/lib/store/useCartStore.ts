import { create } from 'zustand';
import { CartItem, Product, ModifierOption } from '@/types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  fulfillmentType: 'dine_in' | 'pickup' | 'delivery';

  addItem: (product: Product, quantity?: number, selectedOptions?: { groupId: string; option: ModifierOption }[]) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setFulfillmentType: (type: 'dine_in' | 'pickup' | 'delivery') => void;

  getSubtotalPaise: () => number;
  getTaxPaise: () => number;
  getTotalPaise: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  fulfillmentType: 'pickup',

  addItem: (product: Product, quantity = 1, selectedOptions = []) => {
    const formattedModifiers = selectedOptions.map((o) => ({
      groupId: o.groupId,
      optionId: o.option.id,
      name: o.option.name,
      priceDeltaPaise: o.option.priceDeltaPaise,
    }));

    const optionsPriceDelta = formattedModifiers.reduce((acc, curr) => acc + curr.priceDeltaPaise, 0);
    const unitPricePaise = product.basePricePaise + optionsPriceDelta;

    const modifierKey = formattedModifiers
      .map((m) => m.optionId)
      .sort()
      .join('-');
    const cartItemId = `${product.id}-${modifierKey}`;

    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += quantity;
        return { items: updatedItems, isCartOpen: true };
      }

      const newItem: CartItem = {
        cartItemId,
        product,
        quantity,
        selectedModifiers: formattedModifiers,
        unitPricePaise,
      };

      return { items: [...state.items, newItem], isCartOpen: true };
    });
  },

  removeItem: (cartItemId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.cartItemId !== cartItemId),
    }));
  },

  updateQuantity: (cartItemId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    });
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (open: boolean) => set({ isCartOpen: open }),
  setFulfillmentType: (type) => set({ fulfillmentType: type }),

  getSubtotalPaise: () => {
    const { items } = get();
    return items.reduce((acc, item) => acc + item.unitPricePaise * item.quantity, 0);
  },

  getTaxPaise: () => {
    // 5% GST for F&B in India
    const subtotal = get().getSubtotalPaise();
    return Math.round(subtotal * 0.05);
  },

  getTotalPaise: () => {
    return get().getSubtotalPaise() + get().getTaxPaise();
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((acc, item) => acc + item.quantity, 0);
  },
}));
