import Link from 'next/link';
import Image from 'next/image';
import { getTypeColor } from '@/lib/typeColors';

interface PokemonCardProps {
  pokemon: {
    name: string;
    id: number;
    image: string;
    types: string[];
    abilities: string[];
  };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  if (!pokemon || !pokemon.name) {
    return null; // Render nothing if the pokemon object is undefined or incomplete
  }

  const formattedId = pokemon.id.toString().padStart(3, '0');

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-md hover:shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer ring-1 ring-zinc-900/5 backdrop-blur dark:ring-white/30 dark:hover:ring-white/40">
        <div className="relative w-full pb-full bg-gray-200 dark:bg-zinc-700" style={{ paddingBottom: '100%' }}>
          <Image 
            src={pokemon.image} 
            alt={pokemon.name} 
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 25vw"
            className="p-2 absolute top-0 left-0 w-full h-full object-cover" 
            priority
          />
        </div>
        <div className="px-6 py-4 text-left">
          <h2 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">{pokemon.name}</h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">#{formattedId}</p>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Types:</h3>
            <div className="flex space-x-2 mt-3 mb-1">
              {pokemon.types.map((type) => (
                <span 
                  key={type} 
                  className={`px-5 py-2 text-xs font-semibold rounded-full ${getTypeColor(type)}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
