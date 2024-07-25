# PokeNext.js

![Image](/public/images/poke-nextjs-thumb.png)

PokeNext.js is a web application built using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/[) & [Tailwind CSS](https://tailwindcss.com/) that serves as a Pokédex. This project integrates with the RESTful Pokémon API [PokéAPI](https://pokeapi.co/) to fetch and display detailed information about the first 151 Pokémon, including their sprites, stats, types, abilities, evolution chains and even playing the Pokémon’s cry sound.

## Demo

[https://poke-nextjs-opal.vercel.app/](https://poke-nextjs-opal.vercel.app/)

## Features

- Responsive design.
- Search and sort functionality.
- Full Pokemon cards & detail page for the first 151 Pokémon.
- Interactive features: Hover a button to see the shiny sprite and playing the Pokémon’s cry sound.
- Optimized image handling.
- Efficient data Fetching (Axios).
- Dark mode support, with toggle (Next Themes).

## Clone and Deploy

First, execute create-next-app with npm to bootstrap the example:

```bash
npm create next-app --example https://github.com/JPerez00/PokeNext.js/tree/main your-project-name-here
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the Home page by modifying `app/page.tsx`, and the Pokemon Detail Page by modifying `app/pokemon/[name]/page.tsx`, the pages will auto-updates as you edit the files.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.