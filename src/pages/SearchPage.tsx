import React, { useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera, X, Loader2, ImageIcon, Sparkles } from 'lucide-react';
import { products, Product } from '@/data/products';
import BottomNav from '@/components/BottomNav';
import SearchBar from '@/components/SearchBar';
import ProductGrid from '@/components/ProductGrid';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AISearchResult {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    badge?: string;
    colors?: string[];
    sizes?: string[];
    sellerId: string;
    sellerName: string;
    row: string;
    container: string;
  }>;
  detectedItem?: string;
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPhotoSearch, setIsPhotoSearch] = useState(searchParams.get('photo') === 'true');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [detectedItem, setDetectedItem] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Map AI results to full Product objects
  const mapAIResultsToProducts = (aiProducts: AISearchResult['products']): Product[] => {
    return aiProducts.map(ap => {
      // Find matching product from main products list
      const fullProduct = products.find(p => p.id === ap.id);
      if (fullProduct) return fullProduct;
      
      // Fallback: create product from AI result
      return {
        id: ap.id,
        name: ap.name,
        price: ap.price,
        image: ap.image,
        category: ap.category,
        description: ap.description,
        badge: ap.badge as 'hot' | 'new' | 'top' | undefined,
        colors: ap.colors,
        sizes: ap.sizes,
        seller: {
          id: ap.sellerId,
          name: ap.sellerName,
          location: 'Dordoi',
          row: ap.row,
          container: ap.container,
          phone: '+996 555 000 000',
          rating: 4.5
        },
        reviews: []
      };
    }).filter(Boolean) as Product[];
  };

  const handleTextSearch = async (q: string) => {
    setQuery(q);
    setSearchParams({ q });
    setIsPhotoSearch(false);
    setUploadedImage(null);
    setDetectedItem(null);
    setHasSearched(true);
    
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { searchType: 'text', query: q }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Ошибка поиска",
          description: data.error,
          variant: "destructive"
        });
        // Fallback to local search
        const localResults = products.filter(p => 
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
        );
        setSearchResults(localResults);
      } else {
        const mappedProducts = mapAIResultsToProducts(data.products || []);
        setSearchResults(mappedProducts);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local search
      const localResults = products.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(localResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePhotoSearch = () => {
    setIsPhotoSearch(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите изображение",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setQuery('');

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        setUploadedImage(base64);

        try {
          const { data, error } = await supabase.functions.invoke('ai-search', {
            body: { searchType: 'image', imageBase64: base64 }
          });

          if (error) throw error;

          if (data.error) {
            toast({
              title: "Ошибка поиска",
              description: data.error,
              variant: "destructive"
            });
            // Return random products as fallback
            const randomProducts = [...products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 6);
            setSearchResults(randomProducts);
          } else {
            const mappedProducts = mapAIResultsToProducts(data.products || []);
            setSearchResults(mappedProducts);
            setDetectedItem(data.detectedItem || null);
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          toast({
            title: "Ошибка AI поиска",
            description: "Не удалось обработать изображение. Показаны похожие товары.",
            variant: "destructive"
          });
          const randomProducts = [...products]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
          setSearchResults(randomProducts);
        } finally {
          setIsSearching(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File read error:', error);
      setIsSearching(false);
      toast({
        title: "Ошибка",
        description: "Не удалось прочитать файл",
        variant: "destructive"
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closePhotoSearch = () => {
    setIsPhotoSearch(false);
    setSearchResults([]);
    setUploadedImage(null);
    setDetectedItem(null);
    setHasSearched(false);
  };

  const popularSearches = ['худи', 'кроссовки', 'сумка', 'наушники', 'платье', 'джинсы'];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Поиск
          </h1>
        </div>
        <SearchBar 
          onSearch={handleTextSearch} 
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
        {/* Photo Search Section */}
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
                  <p className="text-foreground font-medium">Анализируем изображение...</p>
                  <p className="text-sm text-muted-foreground">AI ищет похожие товары</p>
                </div>
              ) : uploadedImage && searchResults.length > 0 ? (
                <div>
                  {/* Show uploaded image */}
                  <div className="mb-4">
                    <img 
                      src={uploadedImage} 
                      alt="Загруженное изображение" 
                      className="w-24 h-24 object-cover rounded-xl border-2 border-primary"
                    />
                  </div>
                  
                  {detectedItem && (
                    <div className="bg-primary/10 rounded-xl p-3 mb-4">
                      <p className="text-sm">
                        <span className="font-medium text-primary">AI определил: </span>
                        <span className="text-foreground">{detectedItem}</span>
                      </p>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Найдено {searchResults.length} похожих товаров:
                  </p>
                  <ProductGrid products={searchResults} />
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-muted rounded-xl flex flex-col items-center gap-3 hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-foreground font-medium">Загрузите фото товара</p>
                    <p className="text-sm text-muted-foreground mt-1">AI найдет похожие товары на рынке</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Text Search Results */}
        {query && !isPhotoSearch && (
          <div>
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Ищем товары...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Найдено {searchResults.length} товаров по запросу "{query}"
                </p>
                <ProductGrid products={searchResults} />
              </>
            ) : hasSearched ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">😕</p>
                <p className="text-foreground font-medium">Ничего не найдено</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Попробуйте изменить запрос или использовать поиск по фото
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Empty State - Popular Searches */}
        {!query && !isPhotoSearch && !hasSearched && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">AI Поиск товаров</h2>
            <p className="text-muted-foreground mb-6">
              Введите запрос или загрузите фото товара
            </p>
            
            <div className="text-left">
              <p className="text-sm font-medium text-foreground mb-3">Популярные запросы:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handleTextSearch(term)}
                    className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-card rounded-2xl text-left">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Поиск по фото
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Сфотографируйте товар, и AI найдет похожие на рынке Дордой
              </p>
              <button
                onClick={handlePhotoSearch}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Загрузить фото
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
