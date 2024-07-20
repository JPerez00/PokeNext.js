'use client';

import { useEffect, useRef } from 'react';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleReset();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSearchQuery]);

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSearchQuery('');
  };

  return (
    <div className="mb-4 relative max-w-3xl flex items-center">
      <svg
        className="absolute w-5 h-5 text-gray-400 left-4 top-3 dark:text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          className="stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-400"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        className="px-12 w-full py-2 border bg-white dark:bg-zinc-100 border-zinc-300 rounded-xl text-zinc-600"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="DocSearch-Cancel absolute right-5 top-2"
        type="reset"
        aria-label="ESC"
        onClick={handleReset}
      >
        ESC
      </button>
    </div>
  );
}
