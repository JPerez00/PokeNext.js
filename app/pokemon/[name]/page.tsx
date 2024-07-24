'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { getTypeColor } from '@/lib/typeColors';
import { pokemonNames } from '@/lib/pokemonNames';
import { typeWeaknesses } from '@/lib/typeWeaknesses';
import PokemonCard from '@/app/components/PokemonCard';
import loadingGif from '@/public/pikachu-sprint-animation.gif'
import { PlayIcon } from '@/app/components/Icons';

interface Pokemon {
  name: string;
  id: number;
  image: string;
  shinyImage: string;
  types: string[];
  abilities: string[];
  weight: number;
  height: number;
  stats: { name: string, base_stat: number }[];
  weaknesses: string[];
  category: string;
  species: {
    habitat: string;
    shape: string;
    color: string;
    generation: string;
  };
  evolutionChain: {
    name: string;
    id: number;
    image: string;
    types: string[];
    abilities: string[];
  }[];
  flavorText: string;
}

export default function PokemonDetail() {
  const { name } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!name) return;
  
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const speciesResponse = await axios.get(response.data.species.url);
      const speciesData = speciesResponse.data;
      const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
      const evolutionData = evolutionResponse.data;
  
      const types = response.data.types.map((typeInfo: any) => typeInfo.type.name);
  
      // Calculate weaknesses based on types
      const weaknesses = Array.from(new Set(types.flatMap((type: string) => typeWeaknesses[type]))) as string[];
  
      const getEvolutionChain = async (evolutionChain: any): Promise<{ name: string; id: number; image: string; types: string[]; abilities: string[]; }[]> => {
        const chain: { name: string; id: number; image: string; types: string[]; abilities: string[]; }[] = [];
        const fetchChainData = async (chainLink: any) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chainLink.species.name}`);
          const data = response.data;
          chain.push({
            name: data.name,
            id: data.id,
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map((typeInfo: any) => typeInfo.type.name),
            abilities: data.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
          });
          if (chainLink.evolves_to.length > 0) {
            await fetchChainData(chainLink.evolves_to[0]);
          }
        };
        await fetchChainData(evolutionChain.chain);
        return chain;
      };
  
      const evolutionChain = await getEvolutionChain(evolutionData);
  
      const englishFlavorText = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      ).flavor_text;
  
      const pokemonData: Pokemon = {
        name: response.data.name,
        id: response.data.id,
        image: response.data.sprites.other['official-artwork'].front_default,
        shinyImage: response.data.sprites.other['official-artwork'].front_shiny,
        types,
        abilities: response.data.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
        weight: response.data.weight,
        height: response.data.height,
        stats: response.data.stats.map((statInfo: any) => ({
          name: statInfo.stat.name,
          base_stat: statInfo.base_stat,
        })),
        weaknesses,
        category: speciesData.genera.find((genus: any) => genus.language.name === 'en').genus,
        species: {
          habitat: speciesData.habitat?.name || 'Unknown',
          shape: speciesData.shape?.name || 'Unknown',
          color: speciesData.color?.name || 'Unknown',
          generation: speciesData.generation?.name || 'Unknown',
        },
        evolutionChain,
        flavorText: englishFlavorText
      };
      setPokemon(pokemonData);
    };
  
    fetchPokemon();
  }, [name]);
  

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = pokemonNames.indexOf(name as string);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    const newName = pokemonNames[newIndex];
    if (newName) {
      router.push(`/pokemon/${newName}`);
    }
  };

  if (!pokemon) return <div className='mt-10 mb-10 text-center font-bold text-2xl tracking-tighter text-zinc-700 dark:text-zinc-300 animate-bounce transition-all'>
    <Image 
      src={loadingGif} 
      alt='Loading Gif'
      width={100}
      height={100}
      className='justify-center align-center text-center flex items-center mx-auto mb-4'
      priority
      unoptimized
    />
      Loading Pokémon...
    </div>;

  const formattedId = pokemon.id.toString().padStart(3, '0');

  const playCry = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto md:bg-zinc-50 md:dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden mb-10">
      <div className="flex justify-between p-6">
          <button
            onClick={() => handleNavigation('prev')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            disabled={pokemonNames.indexOf(name as string) === 0}
          >
            Previous Pokémon
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            disabled={pokemonNames.indexOf(name as string) === pokemonNames.length - 1}
          >
            Next Pokémon
          </button>
        </div>
        <div className="p-2 md:px-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-2/4 flex justify-center md:justify-start">
            <div className="relative w-full pb-full md:pb-0 md:h-0" style={{ paddingBottom: '100%' }}>
              {pokemon.image && (
                <Image 
                src={hover ? pokemon.shinyImage : pokemon.image} 
                alt={pokemon.name} 
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                className="absolute top-0 left-0 w-full h-full object-cover" 
                priority
              />
              )}
            </div>
          </div>
          <div className="w-full md:w-2/4 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold capitalize text-gray-900 dark:text-white">
              {pokemon.name}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">#{formattedId}</p>
            <div className='flex space-x-2 mt-2'>
              <button
                aria-hidden="true"
                onClick={playCry} 
                className="flex items-center bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 hover:dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 px-4 py-2 text-xs font-semibold rounded-full"
              >
                Play Cry
                <PlayIcon className="ml-1 h-3 w-3 stroke-none fill-zinc-900 dark:fill-zinc-50" />
              </button>
              <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 hover:dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 px-4 py-2 text-xs font-semibold rounded-full"
              >
                Shiny Version
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Types:</h2>
              <div className="flex space-x-2 mt-2">
                {pokemon.types.map((type) => (
                  <span 
                    key={type} 
                    className={`capitalize px-4 py-2 text-xs font-semibold rounded-full ${getTypeColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Abilities:</h2>
              <div className="flex space-x-2 mt-2">
                {pokemon.abilities.map((ability) => (
                  <span key={ability} className="capitalize text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full px-3 py-1">
                    {ability}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Weaknesses:</h2>
              <div className="flex space-x-2 mt-2">
                {pokemon.weaknesses.map((weakness) => (
                  <span key={weakness} className={`capitalize text-xs font-semibold rounded-full ${getTypeColor(weakness)} px-3 py-1`}>
                    {weakness}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">Details:</h2>
            <div className="mt-2">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">{pokemon.flavorText}</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 mt-2">Category: {pokemon.category}</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Height: {pokemon.height / 10} m</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Weight: {pokemon.weight / 10} kg</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">Species Information</h2>
            <div className="mt-2">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Habitat: {pokemon.species.habitat}</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Shape: {pokemon.species.shape}</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Color: {pokemon.species.color}</p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">Generation: {pokemon.species.generation}</p>
            </div>
          </div>
        </div>
        <div className="py-6 md:px-6">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">Stats</h2>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 capitalize">{stat.name}</h3>
                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300">{stat.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 md:px-6 mb-6">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">Evolution Chain</h2>
          <div className="group flex max-md:flex-col justify-center gap-10 md:gap-6 mt-6 px-4 md:px-0">
            {pokemon.evolutionChain.map((evolution) => (
              <PokemonCard key={evolution.id} pokemon={evolution} />
            ))}
          </div>
        </div>
        <audio ref={audioRef} src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`} />
      </div>
    </div>
  );
}

