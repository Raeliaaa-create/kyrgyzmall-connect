import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { sellers, products } from '@/data/products';
import BottomNav from '@/components/BottomNav';

const mapRows = [
  { id: 'A', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 'B', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 'C', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 'D', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 'E', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
  { id: 'F', containers: Array.from({ length: 20 }, (_, i) => i + 1) },
];

const DordoiMapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedSellerId = searchParams.get('seller');
  const selectedSeller = sellers.find(s => s.id === selectedSellerId);

  const getSellerAtLocation = (row: string, container: number) => {
    return sellers.find(s => s.row === row && parseInt(s.container) === container);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold">Карта Дордой</h1>
            <p className="text-xs text-muted-foreground">Найдите продавца на рынке</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        {/* Selected Seller Info */}
        {selectedSeller && (
          <div className="bg-primary/10 rounded-2xl p-4 mb-4 border-2 border-primary">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">{selectedSeller.name}</h3>
                <p className="text-sm">
                  Ряд {selectedSeller.row}, Контейнер {selectedSeller.container}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>{selectedSeller.phone}</span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded" />
            <span>Продавец</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded" />
            <span>Выбрано</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <span>Контейнер</span>
          </div>
        </div>

        {/* Map */}
        <div className="bg-card rounded-2xl p-4 shadow-card overflow-x-auto">
          <div className="min-w-[500px]">
            {mapRows.map(row => (
              <div key={row.id} className="flex items-center gap-1 mb-2">
                <span className="w-8 font-bold text-primary">{row.id}</span>
                <div className="flex gap-1 flex-1">
                  {row.containers.map(container => {
                    const seller = getSellerAtLocation(row.id, container);
                    const isSelected = selectedSeller?.row === row.id && 
                      parseInt(selectedSeller?.container || '0') === container;
                    
                    return (
                      <Link
                        key={container}
                        to={seller ? `/seller/${seller.id}` : '#'}
                        className={`w-6 h-6 rounded text-[8px] flex items-center justify-center font-medium transition-all ${
                          isSelected
                            ? 'bg-secondary text-secondary-foreground scale-125 z-10'
                            : seller
                            ? 'bg-primary text-primary-foreground hover:scale-110'
                            : 'bg-muted text-muted-foreground'
                        }`}
                        title={seller ? `${seller.name} - Ряд ${row.id}, Контейнер ${container}` : `Контейнер ${container}`}
                      >
                        {container}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sellers List */}
        <div className="mt-6">
          <h3 className="font-bold mb-3">Все продавцы</h3>
          <div className="space-y-2">
            {sellers.map(seller => (
              <Link
                key={seller.id}
                to={`/seller/${seller.id}`}
                className={`flex items-center gap-3 p-3 bg-card rounded-xl shadow-card hover:shadow-elevated transition-all ${
                  selectedSeller?.id === seller.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{seller.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Ряд {seller.row}, Контейнер {seller.container}
                  </p>
                </div>
                <div className="text-sm font-medium text-secondary">
                  ⭐ {seller.rating}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DordoiMapPage;
