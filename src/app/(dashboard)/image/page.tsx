"use client";

import { useState } from 'react';
import ImageForm from '@/components/image/ImageForm';
import ImageDisplay from '@/components/image/ImageDisplay';
import Header from '@/components/Header';

export default function ImagePage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string, style: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, style }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold mb-8 text-center">GalaxyArt Image Generation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>
        <div>
          <ImageDisplay 
            generatedImage={generatedImage} 
            isGenerating={isGenerating}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
