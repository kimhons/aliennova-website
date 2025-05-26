"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-purple-400">
              AlienNova
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-1 md:gap-2">
            <Link
              href="/chat"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/chat') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              StarTalk
            </Link>
            
            <Link
              href="/write"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/write') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              NebulaWrite
            </Link>
            
            <Link
              href="/image"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/image') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              GalaxyArt
            </Link>
            
            <Link
              href="/scheduler"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/scheduler') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              CosmicScheduler
            </Link>
            
            <Link
              href="/translator"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/translator') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              OrbitTranslator
            </Link>
            
            <Link
              href="/summarizer"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/summarizer') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              NebulaSummarizer
            </Link>
            
            <Link
              href="/finance"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/finance') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              StarFinance
            </Link>
            
            <Link
              href="/voice"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/voice') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              GalaxyVoice
            </Link>
            
            <Link
              href="/learn"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith('/learn') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Learn
            </Link>
            
            <Link
              href="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/profile') ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
