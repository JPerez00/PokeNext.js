'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Link from 'next/link';
import heroImage from '@/public/PokeNextjs.png';
import Image from 'next/image';
import loadingGif from '@/public/pikachu-sprint-animation.gif';
import { Github } from './components/Icons';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  types: string[];
  abilities: string[];
}

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(16);
  const [sortOrder, setSortOrder] = useState('Lowest Number (First)');
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(response.data.results.map(async (pokemon: any) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            name: pokemonDetails.data.name,
            url: pokemon.url,
            id: pokemonDetails.data.id,
            image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
            types: pokemonDetails.data.types.map((typeInfo: any) => typeInfo.type.name),
            abilities: pokemonDetails.data.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
          };
        }));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchPokemon();
  }, []);

  // Handle the sorting.
  const handleSort = (list: Pokemon[], order: string) => {
    switch (order) {
      case 'Lowest Number (First)':
        return list.sort((a, b) => a.id - b.id);
      case 'Highest Number (First)':
        return list.sort((a, b) => b.id - a.id);
      case 'A-Z':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'Z-A':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  };

  const sortedPokemon = handleSort([...pokemonList], sortOrder);

  const filteredPokemon = sortedPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisiblePokemonCount(prevCount => Math.min(prevCount + 16, filteredPokemon.length));
  };

  return (
    <div className="pb-16 pt-20 text-center lg:pt-24 px-2">
      <div className="mx-auto mt-6 flex items-center justify-center gap-2">
        <Link
          className="shadow group flex max-w-fit items-center justify-center rounded-full px-3 py-1 text-sm leading-6 border border-zinc-700 bg-zinc-700 dark:bg-zinc-300 dark:border-zinc-300 text-white dark:text-zinc-800 transition-colors hover:bg-white hover:text-black dark:hover:bg-zinc-600 dark:hover:text-zinc-50"             
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="h-4 w-4 group-hover:text-black"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L20 20H4L12 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className='ml-1'>Deploy to Vercel</p>
        </Link>
        <Link
          className="shadow inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className='mt-1 items-center justify-center align-center'/>
          <p>
            <span className="ml-1 items-center justify-center">Star on</span> GitHub{" "}
          </p>
        </Link>
      </div>
      <div className="flex justify-center items-center mx-auto max-w-2xl">
        <Image 
          src={heroImage} 
          alt='Hero Image'
          width={560}
          height={180} 
          className="mt-6 drop-shadow-lg" 
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-zinc-500 dark:text-zinc-400">
        A simple Pokédex page using the RESTful Pokémon API from{' '}
        <Link href="https://pokeapi.co/" aria-label="Poke API">
          <span className='dark:text-blue-400 text-blue-500 font-bold underline'>PokéAPI</span>
        </Link>
      </p>
      <div className='mt-4 flex gap-2 flex-row align-center items-center justify-center'>
        <p className='text-lg tracking-tight text-zinc-500 dark:text-zinc-400'>Built with</p>
        <div className="shadow inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Next.js
        </div>
        <div className="shadow inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Typescript
        </div>
        <div className="shadow inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Tailwind CSS
        </div>
      </div>
      <div className='mt-10 mx-auto max-w-2xl'>
        <SearchBar setSearchQuery={setSearchQuery} />
        <Dropdown setSortOrder={setSortOrder} />
      </div>
      {loading ? (
        <div className='mt-16 mb-10 text-center font-bold text-2xl tracking-tighter text-zinc-600 dark:text-zinc-300 animate-bounce transition-all'>
          <Image 
            src={loadingGif} 
            alt='Loading Gif'
            width={100}
            height={50}
            className='justify-center align-center text-center flex items-center mx-auto mb-4'
            priority
            style={{ height: 'auto' }}
          />
          Loading Pokémon...
        </div>
      ) : (
        <>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPokemon.slice(0, visiblePokemonCount).map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          {visiblePokemonCount < filteredPokemon.length && (
            <div className="mt-20">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-500 text-white rounded-md"
              >
                Load more Pokémon
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
