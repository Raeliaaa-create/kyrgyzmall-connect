import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div>
      {title && (
        <h2 className="text-lg font-bold mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
