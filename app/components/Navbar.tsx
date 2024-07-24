'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';
import heroImage from '@/public/PokeNextjs.png'
import ballIcon from '@/app/icon.ico'

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
        <DarkModeToggle />
      </div>
    </nav>
  );
}
