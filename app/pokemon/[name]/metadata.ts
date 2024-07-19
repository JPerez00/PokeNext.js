// app/pokemon/[name]/metadata.ts
import axios from 'axios';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = response.data;

  return {
    title: `${pokemon.name} - PokeNext.js`,
  };
}
