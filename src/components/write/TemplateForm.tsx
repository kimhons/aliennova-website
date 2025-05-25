"use client";

import { useState } from 'react';
import { writingTemplates } from '@/config/writing-templates';

interface TemplateFormProps {
  onGenerate: (template: string, prompt: string, model: string) => void;
  isGenerating: boolean;
}

export default function TemplateForm({ onGenerate, isGenerating }: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(writingTemplates[0].id);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(selectedTemplate, prompt, selectedModel);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Content</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Template
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {writingTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Input
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            rows={4}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="gpt-4o">GPT-4o (OpenAI)</option>
            <option value="claude-3-opus">Claude 3 Opus (Anthropic)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Google)</option>
            <option value="mistral-large">Mistral Large</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </button>
      </form>
    </div>
  );
}
