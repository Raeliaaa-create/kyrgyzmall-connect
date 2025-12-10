import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Star, Store } from 'lucide-react';
import { sellers, products } from '@/data/products';
import BottomNav from '@/components/BottomNav';
import ProductGrid from '@/components/ProductGrid';

const SellerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const seller = sellers.find(s => s.id === id);
  
  if (!seller) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Продавец не найден</p>
      </div>
    );
  }

  // Get products from this seller
  const sellerProducts = products.filter(p => p.seller.id === seller.id).slice(0, 6);

  // Generate some reviews
  const reviews = [
    { id: '1', author: 'Алия М.', rating: 5, text: 'Отличный продавец! Качественные товары и хорошие цены.', date: '2024-12-01' },
    { id: '2', author: 'Темирлан К.', rating: 4, text: 'Быстро нашел нужный размер. Рекомендую!', date: '2024-11-28' },
    { id: '3', author: 'Жыргал А.', rating: 5, text: 'Всегда покупаю здесь. Никаких проблем.', date: '2024-11-25' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Магазин продавца</h1>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* Seller Card */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Store className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{seller.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{seller.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {sellerProducts.length}+ товаров
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>Дордой, Ряд {seller.row}, Контейнер {seller.container}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <a href={`tel:${seller.phone}`} className="text-primary hover:underline">
                {seller.phone}
              </a>
            </div>
          </div>

          <Link
            to={`/map?seller=${seller.id}`}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <MapPin className="w-5 h-5" />
            <span>Показать на карте</span>
          </Link>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-bold mb-3">Товары продавца</h3>
          <ProductGrid products={sellerProducts} />
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-bold mb-3">Отзывы о продавце</h3>
          <div className="space-y-3">
            {reviews.map(review => (
              <div key={review.id} className="bg-card rounded-xl p-4 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex items-center gap-1 text-secondary">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
                <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SellerPage;
