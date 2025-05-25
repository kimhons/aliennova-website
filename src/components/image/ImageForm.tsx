import { useState } from 'react';
import { IMAGE_STYLES, IMAGE_MODELS, getStyleById } from '@/config/image-styles';

interface ImageFormProps {
  onGenerate: (prompt: string, model: string, style: string) => void;
  isGenerating: boolean;
}

export default function ImageForm({ onGenerate, isGenerating }: ImageFormProps) {
  const [selectedStyle, setSelectedStyle] = useState(IMAGE_STYLES[0]);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(selectedStyle.defaultModel);
  
  const handleStyleChange = (styleId: string) => {
    const style = getStyleById(styleId);
    setSelectedStyle(style);
    setSelectedModel(style.defaultModel);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isGenerating || !prompt.trim()) return;
    
    // Combine user prompt with style prompt
    const fullPrompt = `${prompt}. ${selectedStyle.prompt}`;
    
    onGenerate(fullPrompt, selectedModel, selectedStyle.id);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">Create an Image</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {IMAGE_STYLES.map(style => (
              <button
                type="button"
                key={style.id}
                onClick={() => handleStyleChange(style.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedStyle.id === style.id 
                    ? 'border-blue-900 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{style.icon}</div>
                <div className="font-medium">{style.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{style.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {IMAGE_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
