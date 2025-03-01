import { useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

const ChatWindow = ({ onClose }) => {
  const {
    messages,
    inputMessage,
    isLoading,
    handleSendMessage,
    setInputMessage,
    messagesEndRef
  } = useChat();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]); 

  return (
    <div className="fixed right-0 h-full w-97 bg-gray-50 shadow-xl border-l border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-medium text-gray-800">Uni Chat</h3>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <MessageList messages={messages} />
        {isLoading && (
          <div className="flex justify-start">
            <LoadingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <ChatInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={handleSendMessage}
          disabled={isLoading}
        />
        <p className="mt-2 text-xs text-gray-500 text-center">
          AI-generated content may be incorrect
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;