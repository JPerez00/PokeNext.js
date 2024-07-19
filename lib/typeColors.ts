const typeColors: { [key: string]: string } = {
  grass: 'bg-lime-400 text-zinc-900',
  poison: 'bg-purple-500 text-white',
  fire: 'bg-orange-500 text-white',
  water: 'bg-sky-600 text-white',
  flying: 'bg-gradient-to-b from-sky-300 to-gray-400 text-zinc-900',
  bug: 'bg-lime-700 text-white',
  normal: 'bg-gray-400 text-gray-800',
  electric: 'bg-yellow-300 text-zinc-900',
  ground: 'bg-yellow-500/60 text-zinc-900',
  fairy: 'bg-pink-300 text-zinc-900',
  fighting: 'bg-orange-700 text-white',
  psychic: 'bg-pink-500 text-white',
  rock: 'bg-yellow-600/60 text-white',
  steel: 'bg-gray-400/80 text-zinc-900',
  ice: 'bg-cyan-500 text-zinc-900',
  ghost: 'bg-purple-500/50 text-white',
  dragon: 'bg-gradient-to-b from-sky-300 to-orange-600 text-white',
  dark: 'bg-gray-800 text-gray-200',
};

export function getTypeColor(type: string): string {
  const color = typeColors[type.toLowerCase()];
  if (!color) {
    console.warn(`Type color for ${type} not found, defaulting to gray.`);
  }
  return color || 'bg-gray-200 text-gray-800';
}
