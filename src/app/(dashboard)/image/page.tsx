import { useState } from 'react';
import ImageForm from '@/components/image/ImageForm';
import ImageDisplay from '@/components/image/ImageDisplay';

export default function ImagePage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentModel, setCurrentModel] = useState('dall-e-3');
  const [currentStyle, setCurrentStyle] = useState('realistic');
  
  const handleGenerate = async (prompt: string, model: string, style: string) => {
    setIsGenerating(true);
    setCurrentPrompt(prompt);
    setCurrentModel(model);
    setCurrentStyle(style);
    
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model,
          style,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        console.error('Error generating image:', data.error);
        // Handle error state
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      // Handle error state
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">GalaxyArt Image Generation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageForm 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
          />
          <ImageDisplay 
            imageUrl={generatedImage} 
            isLoading={isGenerating}
            prompt={currentPrompt}
            model={currentModel}
            style={currentStyle}
          />
        </div>
      </div>
    </div>
  );
}
