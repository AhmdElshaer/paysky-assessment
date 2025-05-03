"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  product: Product;
  showQuantity?: boolean;
}

export function AddToCartButton({
  product,
  showQuantity = true,
}: AddToCartButtonProps) {
  const { addItem, updateItemQuantity, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const getProductQuantity = (productId: number): number => {
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 1;
  };

  useEffect(() => {
    const initialQuantity = getProductQuantity(product.id);
    if (initialQuantity !== quantity) {
      setQuantity(initialQuantity);
    }
  }, [items]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const handleAddToCart = () => {
    if(items.find((item) => item.product.id === product.id)){
      updateItemQuantity(product.id, quantity);
    }else{
      addItem(product, quantity);
    }
    setQuantity(1);
  };

  return (
    <div className="flex flex-col space-y-4">
      {showQuantity && (
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={decreaseQuantity}
            disabled={quantity <= 0}>
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="flex-1 border-y px-4 py-2 text-center">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none"
            onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      )}

      <Button className="w-full" size="lg" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {quantity > 0 ? "Add to Cart" : "Remove from Cart"}
      </Button>
    </div>
  );
}
