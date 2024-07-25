// lib/usePokemonData.ts
// Custom Hook for Data Fetching and Caching

import useSWR from 'swr';
import axios from 'axios';
import { typeWeaknesses } from '@/lib/typeWeaknesses';

const fetcher = async (url: string) => {
  // Uncomment below if you want to see the data caching in action - Part I
  // console.log(`Fetching data from: ${url}`);
  const response = await axios.get(url);
  return response.data;
};

const getEvolutionChain = async (evolutionChainUrl: string) => {
  const response = await axios.get(evolutionChainUrl);
  const evolutionData = response.data;
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
  await fetchChainData(evolutionData.chain);
  return chain;
};

const getPokemonData = async (name: string) => {
  const response = await fetcher(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const speciesResponse = await fetcher(response.species.url);
  const speciesData = speciesResponse;
  const evolutionChain = await getEvolutionChain(speciesData.evolution_chain.url);
  const types = response.types.map((typeInfo: any) => typeInfo.type.name);
  const weaknesses = Array.from(new Set(types.flatMap((type: string) => typeWeaknesses[type]))) as string[];
  const flavorTextEntries = speciesData.flavor_text_entries
    .filter((entry: any) => entry.language.name === 'en')
    .map((entry: any) => ({ version: entry.version.name, text: entry.flavor_text }));

  return {
    name: response.name,
    id: response.id,
    image: response.sprites.other['official-artwork'].front_default,
    shinyImage: response.sprites.other['official-artwork'].front_shiny,
    types,
    abilities: response.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
    weight: response.weight,
    height: response.height,
    stats: response.stats.map((statInfo: any) => ({
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
    flavorTextEntries,
  };
};

// Uncomment below if you want to see the data caching in action - Part II
// export default function usePokemonData(name: string) {
//   const { data, error } = useSWR(
//     name ? `pokemon/${name}` : null, 
//     () => getPokemonData(name),
//     {
//       revalidateOnFocus: false,  // Do not revalidate when window gains focus
//       dedupingInterval: 60000,   // Deduplicate requests within 1 minute
//       onSuccess: (data) => {
//         console.log('Data fetched successfully:', data);
//       },
//       onError: (error) => {
//         console.error('Error fetching data:', error);
//       }
//     }
//   );

//   console.log('Data:', data);
//   console.log('Error:', error);

//   return {
//     data,
//     loading: !data && !error,
//     error,
//   };
// }

export default function usePokemonData(name: string) {
  const { data, error } = useSWR(
    name ? `pokemon/${name}` : null,
    () => getPokemonData(name),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    loading: !data && !error,
    error,
  };
}