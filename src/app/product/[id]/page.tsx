import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api/products";
import ProductPage from "@/modules/product";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: { id: string };
}

export default async function Product({ params }: ProductPageProps) {
  const { id } = params;
  
  let product;
  let error = null;
  
  try {
    product = await getProduct(id);
  } catch (err) {
    error = 'Failed to load product details.';
    console.error(err);
  }
  
  if (error || !product) {
    return (
        <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
          <Link href="/" className="inline-flex items-center gap-1 mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </Link>
          
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the product you're looking for.
            </p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
    );
  }
  return (
    <ProductPage product={product} />)
};
