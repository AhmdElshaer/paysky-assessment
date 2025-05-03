import toast from "react-hot-toast";
import useCartStore from "@/stores/cartStore";
import { Product } from "@/types";

export const useCart = () => {
  const {
    items,
    addItem: storeAddItem,
    removeItem: storeRemoveItem,
    updateItemQuantity: storeUpdateItemQuantity,
    clearCart: storeClearCart,
  } = useCartStore();

  const addItem = (product: Product, quantity = 1) => {
    storeAddItem(product, quantity);
    toast.success(`${product.title} has been added to your cart.`);
  };

  const removeItem = (productId: number) => {
    const removedItem = storeRemoveItem(productId);
    if (removedItem) {
      toast.success(
        `${removedItem.product.title} has been removed from cart.`
      );
    }
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      storeUpdateItemQuantity(productId, quantity);
    }
  };

  const clearCart = () => {
    storeClearCart();
    toast.success("Your cart has been cleared.");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity ,
    0);

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
};
