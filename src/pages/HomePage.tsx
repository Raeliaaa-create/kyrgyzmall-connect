import React from 'react';
import { products } from '@/data/products';
import BottomNav from '@/components/BottomNav';
import SearchBar from '@/components/SearchBar';
import PromoBanner from '@/components/PromoBanner';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';

const HomePage: React.FC = () => {
  // Get featured products (mix of different categories with badges)
  const featuredProducts = products
    .filter(p => p.badge)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <h1 className="text-xl font-black text-primary">KyrgyzMall</h1>
          </div>
        </div>
        <div className="mt-3">
          <SearchBar />
        </div>
      </header>

      <main className="px-4 py-4 space-y-6 max-w-lg mx-auto">
        {/* Promo Banner */}
        <PromoBanner />

        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold mb-3">Категории</h2>
          <CategoryGrid />
        </section>

        {/* Featured Products */}
        <section>
          <ProductGrid products={featuredProducts} title="🔥 Популярное" />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
