import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check, Trash2, MapPin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';

const ShoppingListPage: React.FC = () => {
  const { shoppingList, removeFromShoppingList, toggleShoppingListItem, checkedItems } = useApp();

  const totalPrice = shoppingList.reduce((sum, p) => sum + p.price, 0);
  const checkedCount = checkedItems.size;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Список покупок</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {shoppingList.length > 0 ? (
          <>
            {/* Summary */}
            <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {checkedCount} из {shoppingList.length} куплено
                  </p>
                  <p className="text-xl font-black text-price">
                    {totalPrice.toLocaleString()} сом
                  </p>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${(checkedCount / shoppingList.length) * 176} 176`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {Math.round((checkedCount / shoppingList.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {shoppingList.map(product => {
                const isChecked = checkedItems.has(product.id);
                
                return (
                  <div
                    key={product.id}
                    className={`bg-card rounded-xl p-3 shadow-card flex items-center gap-3 transition-opacity ${
                      isChecked ? 'opacity-60' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleShoppingListItem(product.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked 
                          ? 'bg-badge-new border-badge-new text-white' 
                          : 'border-muted-foreground'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4" />}
                    </button>
                    
                    <Link to={`/product/${product.id}`} className="flex-1 flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`w-14 h-14 object-cover rounded-lg ${isChecked ? 'grayscale' : ''}`}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm line-clamp-1 ${isChecked ? 'line-through' : ''}`}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {product.seller.name}
                        </p>
                        <p className="text-sm font-bold text-price">
                          {product.price.toLocaleString()} сом
                        </p>
                      </div>
                    </Link>
                    
                    <div className="flex flex-col gap-1">
                      <Link
                        to={`/map?seller=${product.seller.id}`}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => removeFromShoppingList(product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Group by Seller */}
            <div className="mt-6">
              <h3 className="font-bold mb-3">По продавцам</h3>
              {Array.from(new Set(shoppingList.map(p => p.seller.id))).map(sellerId => {
                const sellerProducts = shoppingList.filter(p => p.seller.id === sellerId);
                const seller = sellerProducts[0].seller;
                
                return (
                  <Link
                    key={sellerId}
                    to={`/map?seller=${sellerId}`}
                    className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-card mb-2 hover:shadow-elevated transition-all"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{seller.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Ряд {seller.row}, Контейнер {seller.container}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {sellerProducts.length} товаров
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold mb-2">Список пуст</h2>
            <p className="text-muted-foreground mb-6">
              Добавьте товары, которые хотите купить на рынке
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

export default ShoppingListPage;
