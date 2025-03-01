// ChatWidget.jsx
import { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatToggle from './ChatToggle';

const ChatInterface = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="font-sans">
      <ChatToggle 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
      {isChatOpen && (
        <ChatWindow 
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatInterface;








