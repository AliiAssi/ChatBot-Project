// hooks/useChat.js
import { useState, useCallback , useRef} from 'react';
import { sendRequest } from '../api/llm.js';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = { id: Date.now(), text: trimmedMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      setIsLoading(true);
      const botMessage = await sendRequest(trimmedMessage);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `**Error**: ${error.message}`,
        isBot: true,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading]);

  return {
    messages,
    inputMessage,
    isLoading,
    handleSendMessage,
    setInputMessage,
    messagesEndRef
  };
};

export default useChat;