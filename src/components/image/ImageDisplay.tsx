"use client";

import { useState } from 'react';

interface ImageDisplayProps {
  generatedImage: string | null;
  isGenerating: boolean;
  error: string | null;
}

export default function ImageDisplay({ generatedImage, isGenerating, error }: ImageDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
      
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        {isGenerating ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p>Creating your image...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 dark:text-red-400 text-center">
            <p>Error: {error}</p>
          </div>
        ) : generatedImage ? (
          <div className="w-full">
            <img 
              src={generatedImage} 
              alt="Generated image" 
              className="max-w-full max-h-[400px] mx-auto rounded-lg shadow-md" 
            />
            <div className="mt-4 flex justify-center">
              <a 
                href={generatedImage} 
                download="aliennova-generated-image.png"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Image
              </a>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center">
            <p>Your generated image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
