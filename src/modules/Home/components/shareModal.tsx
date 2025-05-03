import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types";
import Image from "next/image";
import { Dispatch } from "react";

export default function ShareModal({
  product,
  setShareModal,
}: {
  product: Product | null;
  setShareModal: Dispatch<React.SetStateAction<Product | null>>;
}) {
  const handleClose = () => {
    setShareModal(null);
  };
  const handleShare = () => {
    if (product) {
      const shareData = {
        title: product.title,
        text: `Check out this product: ${product.title}`,
        url: window.location.href+`product/${product.id}`,
      };
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing:", error);
      });
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this product</DialogTitle>
          <DialogDescription>
            Share this product with your friends and family.
          </DialogDescription>
        </DialogHeader>
        {product && (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-md"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
        )}
        <Button variant="secondary" onClick={handleShare} className="mt-4">
          Share
        </Button>
      </DialogContent>
    </Dialog>
  );
}
