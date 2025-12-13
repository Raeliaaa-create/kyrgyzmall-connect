import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onPhotoSearch?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  enableDebounce?: boolean;
  debounceMs?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onPhotoSearch,
  placeholder = 'Поиск товаров...',
  autoFocus = false,
  enableDebounce = false,
  debounceMs = 400
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger search and blur input to hide mobile keyboard
  const triggerSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      // Blur input to hide mobile keyboard
      inputRef.current?.blur();
      
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  }, [onSearch, navigate]);

  // Debounced search effect
  useEffect(() => {
    if (!enableDebounce || !query.trim()) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      triggerSearch(query);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, enableDebounce, debounceMs, triggerSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    triggerSearch(query);
  };

  const handleSearchButtonClick = () => {
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    triggerSearch(query);
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
        {/* Visible search button */}
        <button
          type="button"
          onClick={handleSearchButtonClick}
          className="p-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
          aria-label="Поиск"
        >
          <Search className="w-5 h-5" />
        </button>
        
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          enterKeyHint="search"
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
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Очистить"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <button
          type="button"
          onClick={handlePhotoClick}
          className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          aria-label="Поиск по фото"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
