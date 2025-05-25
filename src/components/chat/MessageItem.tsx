import { Message } from '@/lib/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-900 text-white'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        <div className={`text-xs mt-1 flex justify-between ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
          <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
          {message.model && !isUser && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {message.model.split('-')[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
