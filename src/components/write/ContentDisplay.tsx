import { useState } from 'react';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
  model: string;
}

export default function ContentDisplay({ content, isLoading, model }: ContentDisplayProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Generating your content...</p>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg">Your generated content will appear here</p>
          <p className="mt-2">Fill in the template details and click "Generate Content"</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Generated Content</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generated with {model.split('-')[0]} model
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
}
