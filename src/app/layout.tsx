import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";


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
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
