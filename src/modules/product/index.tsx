import ProductRating from "@/components/ui/productRating";
import { Product } from "@/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./components/add-to-cart-button";

export default function ProductPage({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to products</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square bg-neutral-50 relative rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col">
          <span className="w-fit mb-2">{product.category}</span>
          <h1 className="font-bold text-2xl sm:text-3xl mb-2">
            {product.title}
          </h1>
          <ProductRating rating={product.rating} />
          <p className="font-bold text-2xl sm:text-3xl mb-6">
            {formattedPrice}
          </p>
          <div className="mb-8">
            <AddToCartButton product={product} />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-2">Product Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
