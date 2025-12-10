import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera, X, Loader2, ImageIcon } from 'lucide-react';
import { searchProducts, products } from '@/data/products';
import BottomNav from '@/components/BottomNav';
import SearchBar from '@/components/SearchBar';
import ProductGrid from '@/components/ProductGrid';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPhotoSearch, setIsPhotoSearch] = useState(searchParams.get('photo') === 'true');
  const [isSearching, setIsSearching] = useState(false);
  const [photoResults, setPhotoResults] = useState<typeof products>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const results = query ? searchProducts(query) : [];

  const handleSearch = (q: string) => {
    setQuery(q);
    setSearchParams({ q });
    setIsPhotoSearch(false);
    setPhotoResults([]);
  };

  const handlePhotoSearch = () => {
    setIsPhotoSearch(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateAISearch();
    }
  };

  const simulateAISearch = () => {
    setIsSearching(true);
    // Simulate AI processing time
    setTimeout(() => {
      // Return random products as "similar" items
      const randomProducts = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setPhotoResults(randomProducts);
      setIsSearching(false);
    }, 2000);
  };

  const closePhotoSearch = () => {
    setIsPhotoSearch(false);
    setPhotoResults([]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Поиск</h1>
        </div>
        <SearchBar 
          onSearch={handleSearch} 
          onPhotoSearch={handlePhotoSearch}
          autoFocus 
        />
      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <main className="px-4 py-4 max-w-lg mx-auto">
        {/* Photo Search Modal */}
        {isPhotoSearch && (
          <div className="mb-6">
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  AI Поиск по фото
                </h3>
                <button onClick={closePhotoSearch} className="p-1 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Анализируем изображение...</p>
                  <p className="text-sm text-muted-foreground">Ищем похожие товары</p>
                </div>
              ) : photoResults.length > 0 ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Найдено {photoResults.length} похожих товаров:
                  </p>
                  <ProductGrid products={photoResults} />
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-muted rounded-xl flex flex-col items-center gap-3 hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Загрузите фото для поиска</p>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Text Search Results */}
        {query && !isPhotoSearch && (
          <div>
            {results.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Найдено {results.length} товаров по запросу "{query}"
                </p>
                <ProductGrid products={results} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-2">😕</p>
                <p className="text-muted-foreground">Ничего не найдено</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Попробуйте изменить запрос
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!query && !isPhotoSearch && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">Введите запрос или загрузите фото</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['худи', 'кроссовки', 'сумка', 'наушники'].map(term => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
