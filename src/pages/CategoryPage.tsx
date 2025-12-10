import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductsByCategory, categories } from '@/data/products';
import BottomNav from '@/components/BottomNav';
import ProductGrid from '@/components/ProductGrid';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const products = id ? getProductsByCategory(id) : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Категория не найдена</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            <h1 className="text-lg font-bold">{category.nameRu}</h1>
          </div>
          <span className="ml-auto text-sm text-muted-foreground">
            {products.length} товаров
          </span>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        <ProductGrid products={products} />
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoryPage;
