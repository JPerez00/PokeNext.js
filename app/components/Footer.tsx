import Image from "next/image";
import heroImage from '@/public/PokeNextjs.png';

function ArrowIcon() {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
          fill="currentColor"
        />
      </svg>
    )
  }

export default function Footer() {
  return (
    <footer className="mx-auto flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-blue-800">
      <div className="flex justify-center items-center mx-auto max-w-2xl">
        <Image 
          src={heroImage} 
          alt='hero Image'
          width={200}
          height={80}
          priority
          className="mt-20 w-48 h-auto md:w-60 md:h-auto"
        />
      </div>
      <ul className="mt-6 mb-6 text-md flex flex-col items-center space-x-0 space-y-2 md:flex-row md:space-x-6 md:space-y-0 text-zinc-300 dark:text-zinc-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/JPerez00/PokeNext.js"
          >
            <ArrowIcon />
            <p className="ml-2 h-7 text-md tracking-tight">Star On Github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://pokeapi.co/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7 tracking-tight">PokéAPI</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://poke-nextjs-opal.vercel.app/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7 tracking-tight">Demo</p>
          </a>
        </li>
      </ul>
      <div className="text-md mb-20 flex flex-col items-center space-x-0 space-y-2 md:flex-row md:space-x-6 md:space-y-0 text-zinc-400 dark:text-zinc-300">
        <p className="text-zinc-400 text-center tracking-tight">
          © {new Date().getFullYear()} - PokeNext.js
        </p>
        <p className="text-zinc-400 text-center tracking-tight">
          Developed By Jorge Perez
        </p>
      </div>
    </footer>
  );
}


