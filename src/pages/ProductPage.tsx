import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Store, Truck, Star, Plus, Check } from 'lucide-react';
import { getProductById, getRelatedProducts, getSimilarProducts } from '@/data/products';
import { useApp } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import ProductGrid from '@/components/ProductGrid';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { isFavorite, addToFavorites, removeFromFavorites, addToShoppingList, isInShoppingList } = useApp();
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Товар не найден</p>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const inList = isInShoppingList(product.id);
  const relatedProducts = getRelatedProducts(product);
  const similarProducts = getSimilarProducts(product);

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToList = () => {
    addToShoppingList(product);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-xl transition-colors ${favorite ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Heart className={`w-6 h-6 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          {product.badge && (
            <span className={`absolute top-4 left-4 ${
              product.badge === 'hot' ? 'badge-hot' : 
              product.badge === 'new' ? 'badge-new' : 'badge-top'
            }`}>
              {product.badge === 'hot' ? '🔥 Хит' : product.badge === 'new' ? '✨ Новинка' : '⭐ Топ'}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="px-4 py-4 space-y-4">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-price">
                {product.price.toLocaleString()} сом
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} сом
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="inline-block mt-1 bg-secondary text-secondary-foreground text-sm font-bold px-2 py-1 rounded-full">
                Экономия {(product.originalPrice - product.price).toLocaleString()} сом
              </span>
            )}
          </div>

          {/* Name & Description */}
          <div>
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Размеры:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className="px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Цвета:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className="px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seller Info */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{product.seller.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Ряд {product.seller.row}, Контейнер {product.seller.container}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{product.seller.rating}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/map?seller=${product.seller.id}`}
              className="flex items-center justify-center gap-2 bg-muted text-foreground font-bold py-3 px-4 rounded-xl hover:bg-muted/80 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span>На карте</span>
            </Link>
            <Link
              to={`/seller/${product.seller.id}`}
              className="flex items-center justify-center gap-2 bg-muted text-foreground font-bold py-3 px-4 rounded-xl hover:bg-muted/80 transition-colors"
            >
              <Store className="w-5 h-5" />
              <span>Магазин</span>
            </Link>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-semibold mb-3">Отзывы</h3>
            <div className="space-y-3">
              {product.reviews.map(review => (
                <div key={review.id} className="bg-card rounded-xl p-3 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex items-center gap-1 text-secondary">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🤖</span>
                AI подборка для вас
              </h3>
              <ProductGrid products={relatedProducts} />
            </div>
          )}

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Похожие товары</h3>
              <ProductGrid products={similarProducts} />
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border px-4 py-3 z-30">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleAddToList}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-colors ${
              inList 
                ? 'bg-badge-new text-white' 
                : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{inList ? 'В списке' : 'В список покупок'}</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity">
            <Truck className="w-5 h-5" />
            <span>Доставка</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductPage;
