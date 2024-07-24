'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';
import heroImage from '@/public/PokeNextjs.png'
import ballIcon from '@/app/icon.ico'
import { Github } from './Icons';

export default function Navbar() {
  return (
    <nav className="bg-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" aria-label="Home" className="flex items-center space-x-1">
          {/* <PokeballIcon /> */}
          <Image
            src={ballIcon} 
            alt='ball ico'
            width={20}
            height={20}
            priority
            className='drop-shadow'
          >
          </Image>
          <Image 
            src={heroImage} 
            alt='hero Image'
            width={140}
            height={60}
            priority
            className="w-24 h-auto md:w-40 md:h-auto"
          />
        </Link>
        <div className='flex flex-row gap-2'>
          <div className="items-center justify-center gap-2">
            {/* <Link
              className="shadow group flex max-w-fit items-center justify-center rounded-full px-3 py-1 text-sm leading-6 border border-zinc-700 bg-zinc-700 dark:bg-zinc-300 dark:border-zinc-300 text-white dark:text-zinc-800 transition-colors hover:bg-white hover:text-black dark:hover:bg-zinc-600 dark:hover:text-zinc-50"             
              href="https://github.com/JPerez00/PokeNext.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-4 w-4 group-hover:text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L20 20H4L12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className='ml-1'>Deploy to Vercel</p>
            </Link> */}
            <Link
              className="shadow inline-flex rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 hover:ring-gray-900/20 bg-zinc-100 ring-1 ring-zinc-900/10 backdrop-blur"
              href="https://github.com/JPerez00/PokeNext.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className='mt-1 items-center justify-center align-center'/>
              <p>
                <span className="ml-1 items-center justify-center">Star on</span> GitHub{" "}
              </p>
            </Link>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
