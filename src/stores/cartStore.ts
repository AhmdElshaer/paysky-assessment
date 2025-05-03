import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => CartItem | undefined;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );
          
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }
          
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        const removedItem = get().items.find(item => item.product.id === productId);
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
        return removedItem;
      },

      updateItemQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        
        set((state) => ({
          items: state.items.map(item => 
            item.product.id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;