import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Большая распродажа!',
    subtitle: 'Скидки до 50% на всё',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'Новая коллекция',
    subtitle: 'Весна-Лето 2024',
    gradient: 'from-badge-new to-primary',
  },
  {
    id: 3,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 3000 сом',
    gradient: 'from-secondary to-accent',
  },
];

const PromoBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent(c => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent(c => (c + 1) % banners.length);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map(banner => (
          <div
            key={banner.id}
            className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.gradient} p-6 min-h-[140px] flex flex-col justify-center`}
          >
            <h2 className="text-2xl font-black text-white drop-shadow-lg">
              {banner.title}
            </h2>
            <p className="text-white/90 font-medium mt-1">
              {banner.subtitle}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
