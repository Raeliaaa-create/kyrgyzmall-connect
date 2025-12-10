import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {categories.map(category => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="flex flex-col items-center gap-2 p-3 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
        >
          <span className="text-3xl">{category.icon}</span>
          <span className="text-xs font-medium text-center leading-tight">
            {category.nameRu}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
