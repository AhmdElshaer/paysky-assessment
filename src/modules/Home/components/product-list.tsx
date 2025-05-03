'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from './product-card';
import { getProducts, getProductsByCategory } from '@/lib/api/products';
import { CategoryFilter } from './category-filter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ProductSkeleton } from './product-skeleton';
import { useCart } from '@/hooks/useCart';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let productData: Product[];
        
        if (categoryParam) {
          productData = await getProductsByCategory(categoryParam);
        } else {
          productData = await getProducts();
        }
        
        setProducts(productData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryParam]);
  
  const handleAddToCart = (product: Product) => {
    addItem(product);
  };
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <section className="w-full">
        <CategoryFilter />
      {isLoading ? (
        <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Try changing your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}