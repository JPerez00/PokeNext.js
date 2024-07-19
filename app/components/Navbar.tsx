'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { JSX, SVGProps } from 'react';
import Image from 'next/image';
import heroImage from '@/public/PokeNextjs.png'

function PokeballIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="#dc2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" aria-label="Home" className="flex items-center space-x-1">
          <PokeballIcon />
          {/* <h1 className="text-yellow-300 text-xl font-semibold tracking-tighter">PokeNext.js</h1> */}
          <Image 
            src={heroImage} 
            alt='Loading Gif'
            width={140}
            height={60}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
