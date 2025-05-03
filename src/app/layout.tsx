import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import AuthGuard from "@/lib/authGuard";
import Loading from "@/components/layout/loading";

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
        <Suspense fallback={<Loading />}>
          <AuthGuard>
            <Header />
            <div className="container mx-auto px-4 w-full">{children}</div>
          </AuthGuard>
          <Toaster position="top-center" />
        </Suspense>
      </body>
    </html>
  );
}
