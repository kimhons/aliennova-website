import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">🌌 AlienNova</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-blue-200 transition">Home</Link>
          <Link href="/chat" className="hover:text-blue-200 transition">StarTalk</Link>
          <Link href="/write" className="hover:text-blue-200 transition">NebulaWrite</Link>
          <Link href="/image" className="hover:text-blue-200 transition">GalaxyArt</Link>
          <Link href="/learn" className="hover:text-blue-200 transition">Learn Hub</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
