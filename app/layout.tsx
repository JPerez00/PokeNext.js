// app/layout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Theme from './components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - PokeNext.js',
    default: 'PokeNext.js - A simple Pokedex page using the RESTful Pokémon API',
  },
  description:
    'A simple Next.js, Typescript and Tailwind CSS Pokedex page using the RESTful Pokémon API.',
}

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
