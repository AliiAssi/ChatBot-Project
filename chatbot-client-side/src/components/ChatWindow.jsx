import { useEffect, useState } from 'react';
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
  
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(prev => prev + ' ' + transcript);
      };

      recognition.onerror = (event) => {
        setError('Error occurred in recognition: ' + event.error);
      };

      setRecognition(recognition);
    } else {
      setError('Speech recognition not supported in this browser');
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      setError('');
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleShowBookmark = (bookmarkContent) => {
    console.log("Show bookmark:", bookmarkContent);
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
        conversation={messages} 
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
          isRecording={isRecording}
          toggleRecording={toggleRecording}
          error={error}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1 text-center">{error}</p>
        )}
        <p className="mt-2 text-xs text-gray-500 text-center">
          AI-generated content may be incorrect
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;