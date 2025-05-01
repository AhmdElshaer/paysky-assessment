"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Store,
  LogIn,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Store className="h-6 w-6" />
              <span className="font-bold text-xl hidden sm:inline-block">
                PaySky Mart
              </span>
            </Link>
          </div>
          <div className="hidden md:flex max-w-md w-full mx-4">
            <Search height={12} width={12} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}>
              {mobileSearchVisible ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline-block">Login</span>
              </Button>
            </Link>
          </div>
        </div>

        {mobileSearchVisible && (
          <div className="md:hidden pb-3 w-full">
            <Search height={12} width={12} />
          </div>
        )}
      </div>
    </header>
  );
}
