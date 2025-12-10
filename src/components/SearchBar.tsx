import React, { useState, useRef } from 'react';
import { Search, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onPhotoSearch?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onPhotoSearch,
  placeholder = 'Поиск товаров...',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handlePhotoClick = () => {
    if (onPhotoSearch) {
      onPhotoSearch();
    } else {
      navigate('/search?photo=true');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 bg-card rounded-2xl px-4 py-3 shadow-card">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <button
          type="button"
          onClick={handlePhotoClick}
          className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
