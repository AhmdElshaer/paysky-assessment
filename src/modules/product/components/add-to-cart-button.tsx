'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  showQuantity?: boolean;
}

export function AddToCartButton({ product, showQuantity = true }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
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
            disabled={quantity <= 1}
          >
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
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      )}
      
      <Button
        className="w-full"
        size="lg"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}