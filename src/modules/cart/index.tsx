"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuthStore } from "@/stores/authStore";
import { AlertCircle, ArrowRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-summary";
import Link from "next/link";

export default function CartPage() {
  const { items, totalItems } = useCart();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {totalItems > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              <CartSummary />

              {!user && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Login required</AlertTitle>
                  <AlertDescription>
                    You need to log in before proceeding to checkout.
                  </AlertDescription>
                </Alert>
              )}

              {user ? (
                <Button className="w-full mt-4" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="w-full mt-4" size="lg" onClick={handleLogin}>
                  Login to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Need help? Contact our support team.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <ShoppingCart
            height={64}
            width={64}
            className="text-muted-foreground mb-2"
          />
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
