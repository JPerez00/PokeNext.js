# PokeNext.js

![Image](/public/images/poke-nextjs-thumb.png)

PokeNext.js is a web application built using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/[) & [Tailwind CSS](https://tailwindcss.com/) that serves as a Pokédex. This project integrates with the RESTful Pokémon API [PokéAPI](https://pokeapi.co/) to fetch and display detailed information about the first 151 Pokémon, including their sprites, stats, types, abilities, evolution chains and even playing the Pokémon’s cry sound.

## Live Demo

[https://poke-nextjs-opal.vercel.app/](https://poke-nextjs-opal.vercel.app/)

## Features

- Responsive design (desktop & mobile).
- Search and sort functionality.
- Full Pokemon cards & detail page for the first 151 Pokémon.
- Interactive features: Hover a button to see the shiny sprite and play the Pokémon’s cry sound.
- Optimized image handling (loading gifs).
- Dark mode support, with toggle (Next Themes).
- Efficient data fetching & local caching with SWR and Axios, as requested in the PokéAPI doc page, more info below.

## Clone & Deploy

First, execute create-next-app with npm to bootstrap the example:

```bash
npm create next-app --example https://github.com/JPerez00/PokeNext.js/tree/main your-project-name-here
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Start Editing

- Edit the Home page by modifying `app/page.tsx`,
- Edit the Pokemon card displayed on the home page by modifying `app/component/PokemonCard.tsx`,
- Edit the Pokemon detail page by modifying `app/pokemon/[name]/page.tsx`,
- Edit all the Pokemon constants like names, type weaknesses & type colours by modifying the files inside `lib/...ts`,
- Edit the custom hook for data fetching by modifying `lib/usePokemonData.ts`:

## Data Caching

One of the rules or requests of the PokéAPI [documentation page](https://pokeapi.co/docs/v2#fairuse), is to implement a way to locally cache resources whenever you request them.

So I created a custom hook for data fetching, which includes efficient local caching using SWR and Axios. The custom hook `lib/usePokemonData.ts` handles fetching the data and caching it locally to improve performance and reduce unnecessary network requests.

For more details, and a step-by-step process, check the [blog post.](https://www.jorge-perez.dev/blog/poke-next-js)

## Font

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
