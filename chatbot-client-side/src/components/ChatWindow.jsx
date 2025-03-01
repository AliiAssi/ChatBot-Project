import { useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';
import ChatWindowHeader from './ChatWindowHeader';

const ChatWindow = ({ onClose }) => {
  const {
    messages,
    inputMessage,
    isLoading,
    handleSendMessage,
    setInputMessage,
    messagesEndRef
  } = useChat();

  const handleShowBookmark = (bookmarkContent) => {
    // Implement logic to show the bookmarked content
    console.log("Show bookmark:", bookmarkContent);
    // You might want to set this content in the message input
    // or display it in the chat history
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]); 

  return (
    <div className="fixed right-0 h-full w-97 bg-gray-50 shadow-xl border-l border-gray-200 flex flex-col z-50">
      <ChatWindowHeader 
        onClose={onClose} 
        onShowBookmarks={handleShowBookmark}
      />

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