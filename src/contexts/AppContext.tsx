import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

interface AppContextType {
  favorites: Product[];
  shoppingList: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addToShoppingList: (product: Product) => void;
  removeFromShoppingList: (productId: string) => void;
  isInShoppingList: (productId: string) => boolean;
  toggleShoppingListItem: (productId: string) => void;
  checkedItems: Set<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [shoppingList, setShoppingList] = useState<Product[]>([]);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.id === productId);
  };

  const addToShoppingList = (product: Product) => {
    setShoppingList(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromShoppingList = (productId: string) => {
    setShoppingList(prev => prev.filter(p => p.id !== productId));
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const isInShoppingList = (productId: string) => {
    return shoppingList.some(p => p.id === productId);
  };

  const toggleShoppingListItem = (productId: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      favorites,
      shoppingList,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addToShoppingList,
      removeFromShoppingList,
      isInShoppingList,
      toggleShoppingListItem,
      checkedItems,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
