import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PaySky Mart",
  description: "Your one-stop shop for all things tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center h-screen w-screen">
              <Loader2 height={50} width={50} className="animate-spin text-muted-foreground" />
              <span>Loading...</span>
            </div>
          }>
          <Header />
          <div className="container mx-auto px-4 w-full">{children}</div>
          <Toaster position="top-center" />
        </Suspense>
      </body>
    </html>
  );
}
