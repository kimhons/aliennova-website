"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { summarizationLevels, documentTypes, focusAreas } from '@/config/summarizer-config';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [documentType, setDocumentType] = useState('article');
  const [summaryLevel, setSummaryLevel] = useState('standard');
  const [focusArea, setFocusArea] = useState('main-points');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          documentType,
          summaryLevel,
          focusArea
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSummary(data.summary);
        setWordCount(data.wordCount || 0);
      } else {
        setError(data.error || 'Failed to generate summary');
      }
    } catch (err) {
      setError('An error occurred during summarization');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedSummaryLevel = summarizationLevels.find(level => level.id === summaryLevel);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">NebulaSummarizer</h1>
      <p className="mb-8 text-gray-600">
        AI document summarization tool that condenses long articles, papers, and documents into concise summaries.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="summaryLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Summary Level
                </label>
                <select
                  id="summaryLevel"
                  value={summaryLevel}
                  onChange={(e) => setSummaryLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  {summarizationLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="focusArea" className="block text-sm font-medium text-gray-700 mb-1">
                Focus Area
              </label>
              <select
                id="focusArea"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                {focusAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {focusAreas.find(area => area.id === focusArea)?.description}
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Text to Summarize
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your article, document, or text here..."
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary Result</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          {summary ? (
            <div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="whitespace-pre-wrap">{summary}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {wordCount} words • {selectedSummaryLevel?.name || 'Standard'} summary
                </div>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(summary);
                  }}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg className="w-16 h-16 text-green-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-medium text-gray-600 mb-2">No Summary Yet</h2>
              <p className="text-gray-500">Paste your text and click generate to see results</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About NebulaSummarizer</h2>
        <p className="mb-4">
          NebulaSummarizer uses advanced AI to condense long documents into concise, informative summaries. Whether you're dealing with
          academic papers, news articles, or business reports, our tool helps you extract the key information quickly.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Features:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Multi-level summarization (brief, detailed, bullet points)</li>
          <li>Key point extraction</li>
          <li>Citation preservation for academic content</li>
          <li>Custom focus areas based on your interests</li>
          <li>Support for various document formats</li>
        </ul>
        
        <p>
          Get started by pasting your text and selecting your preferred summary options.
        </p>
      </div>
    </div>
  );
}
