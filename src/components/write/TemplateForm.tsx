import { useState } from 'react';
import { WRITING_TEMPLATES, WritingTemplate, getTemplateById } from '@/config/writing-templates';
import { AI_MODELS } from '@/config/models';

interface TemplateFormProps {
  onGenerate: (prompt: string, model: string) => void;
  isGenerating: boolean;
}

export default function TemplateForm({ onGenerate, isGenerating }: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<WritingTemplate>(WRITING_TEMPLATES[0]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [selectedModel, setSelectedModel] = useState<string>(selectedTemplate.defaultModel);
  
  const handleTemplateChange = (templateId: string) => {
    const template = getTemplateById(templateId);
    setSelectedTemplate(template);
    setSelectedModel(template.defaultModel);
    // Reset form values when template changes
    setFormValues({});
  };
  
  const handleInputChange = (placeholder: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [placeholder]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isGenerating) return;
    
    // Replace placeholders in the prompt template
    let finalPrompt = selectedTemplate.prompt;
    selectedTemplate.placeholders.forEach(placeholder => {
      finalPrompt = finalPrompt.replace(`{${placeholder}}`, formValues[placeholder] || `[${placeholder}]`);
    });
    
    onGenerate(finalPrompt, selectedModel);
  };
  
  const isFormComplete = selectedTemplate.placeholders.every(placeholder => 
    formValues[placeholder] && formValues[placeholder].trim() !== ''
  );
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">Select Template</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {WRITING_TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => handleTemplateChange(template.id)}
            className={`p-4 rounded-lg border transition-colors ${
              selectedTemplate.id === template.id 
                ? 'border-blue-900 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-2xl mb-2">{template.icon}</div>
            <div className="font-medium">{template.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</div>
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100">
          {selectedTemplate.name} Details
        </h3>
        
        {selectedTemplate.placeholders.map(placeholder => (
          <div key={placeholder} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {placeholder}
            </label>
            <input
              type="text"
              value={formValues[placeholder] || ''}
              onChange={(e) => handleInputChange(placeholder, e.target.value)}
              placeholder={`Enter ${placeholder}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        ))}
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {AI_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.icon} {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormComplete || isGenerating}
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
              'Generate Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
