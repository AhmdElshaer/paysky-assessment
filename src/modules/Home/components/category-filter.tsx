'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategories } from '@/lib/api/products';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleCategoryClick = (category: string | null) => {
    if (category) {
      router.push(`/?category=${category}`);
    } else {
      router.push('/');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-10 w-24 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="relative mb-6">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(null)}
            className="rounded-full transition-all"
          >
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category)}
              className="rounded-full capitalize transition-all"
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}