import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-lime-400', 'text-zinc-800', 
    'bg-purple-500', 'text-purple-800',
    'bg-orange-500', 'text-zinc-50',
    'bg-sky-600', 'text-white',
    'bg-indigo-400', 'text-indigo-800',
    'bg-lime-400', 'text-lime-800',
    'bg-gray-400', 'text-gray-800',
    'bg-yellow-400', 'text-yellow-800',
    'bg-orange-400', 'text-orange-800',
    'bg-pink-400', 'text-pink-800',
    'bg-red-600', 'text-red-200',
    'bg-pink-600', 'text-pink-200',
    'bg-yellow-600', 'text-yellow-200',
    'bg-gray-600', 'text-gray-200',
    'bg-blue-200', 'text-blue-600',
    'bg-indigo-600', 'text-indigo-200',
    'bg-purple-600', 'text-purple-200',
    'bg-gray-800', 'text-gray-200',
    'bg-green-700', 'bg-lime-700',
    'bg-yellow-300', 'bg-amber-300',
    'text-zinc-900', 'bg-yellow-500/60',
    'bg-pink-300', 'bg-pink-300/90',
    'bg-pink-200/80', 'bg-gradient-to-b',
    'from-sky-300', 'to-gray-400',
    'via-gray-400', 'bg-orange-700',
    'bg-pink-500', 'bg-pink-500/90',
    'bg-pink-400/90', 'bg-yellow-500',
    'bg-yellow-600/60', 'bg-gray-500',
    'bg-gray-400/80', 'bg-blue-400',
    'bg-cyan-500', 'bg-purple-700/80',
    'bg-violet-600', 'bg-violet-700',
    'bg-purple-500/50', 'to-orange-600'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
