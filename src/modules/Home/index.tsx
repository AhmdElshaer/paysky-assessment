import { ProductList } from "./components/product-list";

export default function HomePage() {
  return (
    <main className="w-full max-w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-3 mb-8">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          Discover Exceptional Products
        </h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Explore our collection of premium items designed for quality, style,
          and value.
        </p>
      </div>

      <ProductList />
    </main>
  );
}
