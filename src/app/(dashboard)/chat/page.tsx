import Header from '@/components/Header';
import ChatInterface from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">StarTalk AI Chat</h1>
        <ChatInterface />
      </div>
    </div>
  );
}
