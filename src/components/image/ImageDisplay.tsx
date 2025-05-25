import { useState } from 'react';
import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
  model: string;
  style: string;
}

export default function ImageDisplay({ imageUrl, isLoading, prompt, model, style }: ImageDisplayProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyPrompt = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt: ', err);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Generating your image...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">This may take up to 30 seconds</p>
        </div>
      </div>
    );
  }
  
  if (!imageUrl) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg">Your generated image will appear here</p>
          <p className="mt-2">Enter a description and click "Generate Image"</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Generated Image</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generated with {model.split('-')[0]} model
          </p>
        </div>
        <button
          onClick={handleCopyPrompt}
          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={imageUrl}
          alt="Generated image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Prompt</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{prompt}</p>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {style}
          </span>
        </div>
        <a 
          href={imageUrl} 
          download="galaxyart-image.png"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-900 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Download Image
        </a>
      </div>
    </div>
  );
}
