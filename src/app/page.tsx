import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  const { userId } = auth();
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect("/chat");
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">🌌 AlienNova</div>
          <div className="space-x-4">
            <Link href="/sign-in" className="px-4 py-2 rounded-md bg-white text-blue-900 hover:bg-blue-100 transition">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-4 py-2 rounded-md border border-white hover:bg-white/10 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Hub for Advanced AI Tools
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-200">
            Access multiple AI models and tools in one place. Create, write, and explore with the power of AI.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <Link href="/sign-up" className="px-8 py-4 rounded-md bg-white text-blue-900 text-lg font-medium hover:bg-blue-100 transition">
              Get Started
            </Link>
            <Link href="/learn" className="px-8 py-4 rounded-md border border-white text-lg font-medium hover:bg-white/10 transition">
              Learn More
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">StarTalk AI Chat</h3>
              <p className="text-blue-200">
                Chat with multiple AI models and switch between them seamlessly for different tasks.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-2">NebulaWrite</h3>
              <p className="text-blue-200">
                Generate high-quality content with AI assistance for any writing task.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">GalaxyArt</h3>
              <p className="text-blue-200">
                Create stunning images with AI using text prompts and your imagination.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="text-center text-blue-300">
          <p>&copy; 2025 AlienNova.com - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
