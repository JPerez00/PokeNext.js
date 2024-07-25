// app/layout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Theme from './components/theme-provider';

// Update your project URL here
const baseUrl = 'https://poke-nextjs-opal.vercel.app/'
// Update Font here
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s - PokeNext.js',
    default: 'PokeNext.js - A simple Pokedex page using the RESTful Pokémon API.',
  },
  description: 'A simple Next.js, Typescript and Tailwind CSS Pokedex page using the RESTful Pokémon API.',
  authors: [
    { 
      name: 'Jorge Perez',
    },
  ],
  openGraph: {
    title: 'PokeNext.js',
    description: 'A simple Next.js, Typescript and Tailwind CSS Pokedex page using the RESTful Pokémon API.',
    url: baseUrl,
    siteName: 'PokeNext.js',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}public/images/twitter-card.png`,
        width: 800,
        height: 600,
        alt: 'Social Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    images: [`${baseUrl}public/images/twitter-card.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex-auto antialiased bg-zinc-100 dark:bg-zinc-900 ${inter.className}`}>
        <Theme>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
          <BackToTop />
        </Theme>
      </body>
    </html>
  );
}
