"use client";

import { useState } from 'react';
import TemplateForm from '@/components/write/TemplateForm';
import ContentDisplay from '@/components/write/ContentDisplay';
import Header from '@/components/Header';

export default function WritePage() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (template: string, prompt: string, model: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template, prompt, model }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate content');
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold mb-8 text-center">NebulaWrite AI Writing Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TemplateForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>
        <div>
          <ContentDisplay 
            content={generatedContent} 
            isGenerating={isGenerating}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
