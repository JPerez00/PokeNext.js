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
      <div className='flex gap-2 flex-row justify-center'>  
        <div className="inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Next.js
        </div>
        <div className="inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Typescript
        </div>
        <div className="inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400 hover:ring-gray-900/20 bg-white dark:bg-zinc-800 ring-1 ring-zinc-900/10 backdrop-blur dark:ring-white/20 dark:hover:ring-white/30">
          Tailwind CSS
        </div>
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
        A simple Pokedex page using the RESTful Pokémon API from{' '}
        <Link href="https://pokeapi.co/" aria-label="Poke API">
          <span className='dark:text-blue-400 text-blue-500 font-semibold underline'>https://pokeapi.co/</span>
        </Link>
      </p>
      <div className='mt-8 mx-auto max-w-2xl'>
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
