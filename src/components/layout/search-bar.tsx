"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products";
import { Product } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";

export function SearchBar() {
  const [products, setProducts] = useState<Product[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInput = useDebounce(input, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedInput.length > 0) {
      setIsLoading(true);
      const normalizedQuery = debouncedInput.toLowerCase();
      setResults(products.filter(product => 
        product.title.toLowerCase().includes(normalizedQuery) || 
        product.description.toLowerCase().includes(normalizedQuery)
      ))
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, [debouncedInput]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
      };
      fetchProducts();
    }
    catch (error) {
      console.error("Error fetching products:", error);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsOpen(value.length > 0);
  };

  const handleClear = () => {
    setInput("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = () => {
    setIsOpen(false);
    setInput("");
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative flex w-full items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          className="pl-9 pr-10 border-[1.5px] border-neutral-3 rounded-md w-full py-2 px-2 placeholder:text-sm placeholder:text-[#94A3B8] mb-1 h-[40px] text-primary-1 focus-visible:border-primary-1 transition-all duration-150 ease-in-out"
          value={input}
          onChange={handleInputChange}
          onFocus={() => input.length > 0 && setIsOpen(true)}
        />
        {input.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 h-full px-3 hover:bg-transparent"
            onClick={handleClear}>
            <X className="h-2 w-2" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : results.length < 1 ? (
            <p className="px-2">No Result Found</p>
          ) : (
            <div className="max-h-60 overflow-y-auto px-2">
              {results.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  onClick={handleSelect}
                  className="flex items-center gap-2 py-2">
                  <div className="h-8 w-8 rounded bg-muted p-1">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="line-clamp-1 text-sm">
                      {product.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
