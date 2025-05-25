import { useState } from 'react';
import TemplateForm from '@/components/write/TemplateForm';
import ContentDisplay from '@/components/write/ContentDisplay';

export default function WritePage() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentModel, setCurrentModel] = useState('gpt-4o');
  
  const handleGenerate = async (prompt: string, model: string) => {
    setIsGenerating(true);
    setCurrentModel(model);
    
    try {
      const response = await fetch('/api/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedContent(data.content);
      } else {
        setGeneratedContent(`Error: ${data.error || 'Failed to generate content'}`);
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
      setGeneratedContent('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">NebulaWrite AI Writing</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TemplateForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          <ContentDisplay 
            content={generatedContent} 
            isLoading={isGenerating} 
            model={currentModel}
          />
        </div>
      </div>
    </div>
  );
}
