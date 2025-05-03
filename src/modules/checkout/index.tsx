"use client";

import { useCart } from "@/hooks/useCart";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CartSummary } from "../cart/components/cart-summary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { items, totalItems, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      toast.success("Thank you for your purchase.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to process your order. Please try again.");
    }
  };

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${user?.address?.geolocation?.lat},${user?.address?.geolocation?.long}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${user?.address?.geolocation?.lat},${user?.address?.geolocation?.long}&key={Company API Key}`;

  if (!user || totalItems === 0) {
    return null;
  }

  return (
    <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/cart")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to cart
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold mb-6">Confirm Your Order</h1>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h2 className="font-medium mb-2">Delivery Address</h2>
                  <p className="text-muted-foreground">
                    {user?.address?.number +
                      user?.address?.street +
                      user?.address?.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={mapUrl}
              alt="Delivery location"
              className="object-cover h-full w-full animate-pulse bg-slate-300"
              onLoad={(e) => {
                e.currentTarget.classList.remove("animate-pulse");
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x300.png?text=Map+Failed+to+Load";
              }}
            />
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Name: </span>
                  {user?.name?.firstname} {user?.name?.lastname}
                </p>
                <p>
                  <span className="text-muted-foreground">Email: </span>
                  {user?.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder}>
            <CreditCard className="mr-2 h-4 w-4" />
            Place Order
          </Button>
        </div>

        <div className="lg:pl-8">
          <div className="rounded-lg border p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4">
                  <div className="relative h-16 w-16 rounded border">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
