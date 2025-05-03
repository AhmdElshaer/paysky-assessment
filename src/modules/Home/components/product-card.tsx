import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/types";
import ProductRating from "@/components/ui/productRating";
import { Dispatch } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  setShareModal: Dispatch<React.SetStateAction<Product | null>>;
}

export function ProductCard({ product, onAddToCart, setShareModal }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-md py-0">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full animate-pulse bg-slate-150 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              onLoad={(e) => {
                e.currentTarget.classList.remove("animate-pulse");
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/200.png?text=PaySky+Mart";
              }}
            />
          </div>
        </Link>
        <span className="absolute text-xs bg-white px-4 py-2 rounded-full left-2 top-2">
          {product.category}
        </span>
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {setShareModal(product)}}
                  className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share product</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-base font-medium transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <ProductRating rating={product.rating} />
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">{formattedPrice}</p>
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            onClick={() => onAddToCart(product)}>
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
