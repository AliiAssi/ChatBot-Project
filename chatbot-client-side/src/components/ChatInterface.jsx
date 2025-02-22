import { useState, useEffect, useRef } from 'react';
import MarkdownComponent from './MarkDownMessage';

const ChatInterface = () => {
  const api = "https://db87-34-125-142-42.ngrok-free.app/predict";
  // State Management
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup effect to abort ongoing fetch on unmount
  useEffect(() => () => abortControllerRef.current?.abort(), []);

  // Function to send a request to the AI model
  const sendRequest = async (message) => {
    try {
      const response = await fetch(`${api}?input=${encodeURIComponent(message)}`, {
        method: 'GET',
        headers: { 'ngrok-skip-browser-warning': 'true' },
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      return { result: `**Error**: ${error.message}` };
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = { id: Date.now(), text: trimmedMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    try {
      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      const data = await sendRequest(trimmedMessage);
      
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        text: data.result, 
        isBot: true 
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        text: `**Error**: ${error.message}`,
        isBot: true,
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed w-full top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-end">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            <span>Ask Assistant</span>
          </button>
        </div>
      </header>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col mx-4">
            <div className="bg-gray-100 px-4 py-3 rounded-t-xl flex items-center justify-between">
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isBot ? 
                    (msg.isError ? 
                      'bg-red-100 text-red-800 [&_a]:text-red-700 [&_a]:underline' : 
                      'bg-gray-100 [&_pre]:bg-gray-800 [&_pre]:text-white [&_pre]:p-3 [&_pre]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-gray-800') : 
                      'bg-blue-600 text-white [&_a]:text-blue-200 [&_a]:underline'
                  }`}>
                  {msg.isBot ? <MarkdownComponent markdownText={msg.text} /> : msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center text-gray-500">
                  <span className="animate-pulse">Typing</span>
                  <div className="flex space-x-1 ml-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="border-t p-4 flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                disabled={!inputMessage.trim() || isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;