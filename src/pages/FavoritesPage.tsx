import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import ProductGrid from '@/components/ProductGrid';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites } = useApp();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-current" />
            <h1 className="text-lg font-bold">Избранное</h1>
          </div>
          {favorites.length > 0 && (
            <span className="ml-auto text-sm text-muted-foreground">
              {favorites.length} товаров
            </span>
          )}
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {favorites.length > 0 ? (
          <ProductGrid products={favorites} />
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold mb-2">Нет избранных товаров</h2>
            <p className="text-muted-foreground mb-6">
              Нажмите ❤️ на товаре, чтобы добавить его сюда
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Перейти к покупкам
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default FavoritesPage;
