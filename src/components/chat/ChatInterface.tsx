"use client";

import { useState } from 'react';
import { useChat, Message } from '@/lib/hooks/useChat';
import MessageItem from './MessageItem';
import ModelSelector from './ModelSelector';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const { messages, isLoading, sendMessage } = useChat(selectedModel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="mb-4">
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 my-8">
            <p>Start a conversation with StarTalk AI</p>
            <p className="text-sm mt-2">Choose from multiple AI models for different capabilities</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        )}
        {isLoading && (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <div className="animate-pulse">StarTalk is thinking...</div>
          </div>
        )}
        {/* Error messages are handled through the messages array */}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
