import { useState } from 'react';
import { AI_MODELS, AIModel } from '@/config/models';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentModel = AI_MODELS.find(model => model.id === selectedModel) || AI_MODELS[0];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          AI Model
        </label>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isExpanded ? 'Show Less' : 'Show Details'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {AI_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selectedModel === model.id
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-xl mb-1">{model.icon}</span>
              <span className="font-medium">{model.name}</span>
              <span className="text-xs opacity-75">{model.provider}</span>
            </div>
          </button>
        ))}
      </div>
      
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{currentModel.icon}</span>
            <div>
              <h4 className="font-medium">{currentModel.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentModel.provider}</p>
            </div>
          </div>
          
          <p className="text-sm mb-2">{currentModel.description}</p>
          
          <div className="text-sm">
            <p className="font-medium mb-1">Strengths:</p>
            <ul className="list-disc pl-5 space-y-1">
              {currentModel.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Context window: {(currentModel.contextWindow / 1000).toFixed(0)}K tokens
          </div>
        </div>
      )}
    </div>
  );
}
