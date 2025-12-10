import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useApp } from '@/contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, addToFavorites, removeFromFavorites, addToShoppingList, isInShoppingList } = useApp();
  const favorite = isFavorite(product.id);
  const inList = isInShoppingList(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToShoppingList(product);
  };

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'hot': return 'badge-hot';
      case 'new': return 'badge-new';
      case 'top': return 'badge-top';
      default: return '';
    }
  };

  const getBadgeText = (badge?: string) => {
    switch (badge) {
      case 'hot': return '🔥 Хит';
      case 'new': return '✨ Новинка';
      case 'top': return '⭐ Топ';
      default: return '';
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="card-product animate-slide-up">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          
          {product.badge && (
            <span className={`absolute top-2 left-2 ${getBadgeClass(product.badge)}`}>
              {getBadgeText(product.badge)}
            </span>
          )}
          
          <button
            onClick={handleFavorite}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              favorite 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/80 text-foreground hover:bg-card'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>

          {product.originalPrice && (
            <div className="absolute bottom-2 left-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
        </div>
        
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="price-tag text-lg">
                {product.price.toLocaleString()} сом
              </p>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} сом
                </p>
              )}
            </div>
            <button
              onClick={handleAddToList}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                inList
                  ? 'bg-badge-new text-white'
                  : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <h3 className="mt-2 text-sm font-medium leading-tight line-clamp-2">
            {product.name}
          </h3>
          
          <p className="mt-1 text-xs text-muted-foreground">
            {product.seller.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
