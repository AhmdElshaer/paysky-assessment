"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  X,
  Store,
  LogIn,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import { SearchBar } from "./search-bar";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  const { totalItems} = useCart();

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
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-6 w-6" />
            <span className="font-bold lg:text-xl hidden sm:inline-block text-nowrap">
              PaySky Mart
            </span>
          </Link>

          <div className="hidden md:flex max-w-sm lg:max-w-md w-full mx-4">
            <SearchBar />
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
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

                {user ? (
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-accent">
                    <Image
                      src={user?.avatar}
                      alt={user.username}
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium">
                      {user?.name?.firstname}
                    </span>
                    <div
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent cursor-pointer"
                      onClick={() => logout()}>
                      <LogOut className="h-5 w-5" />
                      <span className="hidden lg:block">Logout</span>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
          </div>
        </div>

        {mobileSearchVisible && (
          <div className="md:hidden pb-3 w-full">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
}
