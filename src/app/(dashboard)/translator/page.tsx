"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { languagePairs, specializedVocabularies, translationFormats } from '@/config/translator-config';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [format, setFormat] = useState('text');
  const [vocabulary, setVocabulary] = useState('general');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  
  // Get available target languages based on selected source language
  const availableTargetLanguages = languagePairs.find(pair => pair.sourceCode === sourceLanguage)?.targetLanguages || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/translator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sourceLanguage,
          targetLanguage,
          format,
          vocabulary
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTranslatedText(data.translatedText);
      } else {
        setError(data.error || 'Failed to translate text');
      }
    } catch (err) {
      setError('An error occurred during translation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">OrbitTranslator</h1>
      <p className="mb-8 text-gray-600">
        Real-time language translation tool with support for text, document, and conversation translation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                  Source Language
                </label>
                <select
                  id="sourceLanguage"
                  value={sourceLanguage}
                  onChange={(e) => {
                    setSourceLanguage(e.target.value);
                    // Reset target language when source changes
                    const newPair = languagePairs.find(pair => pair.sourceCode === e.target.value);
                    if (newPair && newPair.targetLanguages.length > 0) {
                      setTargetLanguage(newPair.targetLanguages[0].code);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {languagePairs.map((pair) => (
                    <option key={pair.sourceCode} value={pair.sourceCode}>
                      {pair.sourceName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Language
                </label>
                <select
                  id="targetLanguage"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableTargetLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {translationFormats.map((fmt) => (
                    <option key={fmt.id} value={fmt.id}>
                      {fmt.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="vocabulary" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialized Vocabulary
                </label>
                <select
                  id="vocabulary"
                  value={vocabulary}
                  onChange={(e) => setVocabulary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {specializedVocabularies.map((vocab) => (
                    <option key={vocab.id} value={vocab.id}>
                      {vocab.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
                Text to Translate
              </label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Translation Result</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          {translatedText ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="whitespace-pre-wrap">{translatedText}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg className="w-16 h-16 text-blue-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <h2 className="text-xl font-medium text-gray-600 mb-2">No Translation Yet</h2>
              <p className="text-gray-500">Enter text and click translate to see results</p>
            </div>
          )}
          
          {translatedText && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(translatedText);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About OrbitTranslator</h2>
        <p className="mb-4">
          OrbitTranslator uses advanced AI to provide accurate translations across multiple languages. Whether you need to translate
          simple text, complex documents, or facilitate real-time conversations, our tool has you covered.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Features:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Text translation between 50+ languages</li>
          <li>Document translation with format preservation</li>
          <li>Conversation mode for real-time bilingual chats</li>
          <li>Specialized vocabulary for technical, medical, and legal content</li>
          <li>Offline mode for common language pairs</li>
        </ul>
        
        <p>
          Get started by selecting your languages and entering the text you want to translate.
        </p>
      </div>
    </div>
  );
}
