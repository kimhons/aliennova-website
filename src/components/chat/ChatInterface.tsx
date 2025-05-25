import { useState } from 'react';
import { useChat, Message } from '@/lib/hooks/useChat';
import MessageItem from './MessageItem';
import ModelSelector from './ModelSelector';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const { messages, sendMessage, isLoading, clearMessages } = useChat(selectedModel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="p-4 border-b bg-blue-900 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">StarTalk AI Assistant</h2>
            <p className="text-sm opacity-80">Powered by advanced AI models</p>
          </div>
          <button
            onClick={clearMessages}
            className="px-3 py-1 text-sm bg-blue-800 hover:bg-blue-700 rounded-md transition"
          >
            Clear Chat
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <h3 className="text-lg font-medium">Welcome to StarTalk</h3>
              <p className="mt-1">Ask me anything to get started!</p>
              <p className="mt-3 text-sm">Currently using: <span className="font-medium">{selectedModel}</span></p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 dark:bg-gray-800 dark:border-gray-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Thinking...
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
