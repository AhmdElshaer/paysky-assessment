'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const { updateItemQuantity, removeItem } = useCart();
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
  
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price * quantity);
  
  const increaseQuantity = () => {
    updateItemQuantity(product.id, quantity + 1);
  };
  
  const decreaseQuantity = () => {
    updateItemQuantity(product.id, quantity - 1);
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  return (
    <li className="py-6 first:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="96px"
            className="object-contain p-2 animate-pulse"
            onLoad={(e) => {e.currentTarget.classList.remove('animate-pulse');}}
            onError={(e) => {e.currentTarget.src = "https://placehold.co/96?text=PaySky+Mart";}}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 sm:gap-2">
          <div className="flex justify-between">
            <Link href={`/product/${product.id}`} className="hover:text-primary">
              <h3 className="text-base font-medium">{product.title}</h3>
            </Link>
            <p className="font-medium">{formattedPrice}</p>
          </div>
          
          <p className="text-sm text-muted-foreground">{product.category}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
              </Button>
              
              <div className="flex h-8 w-10 items-center justify-center border-y">
                {quantity}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{formattedSubtotal}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}