const ChatToggle = ({ isOpen, onToggle }) => (
  <header className="fixed w-full top-0">
    <div className="container mx-auto px-4 py-3 flex justify-end">
      <button
        onClick={onToggle}
        className={`flex items-center justify-center ${
          isOpen ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-500 hover:bg-indigo-600'
        } text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          // X (close) icon
          <svg 
            className="w-6 h-6 transform transition-transform duration-300 hover:rotate-90"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        ) : (
          // Chat bubble icon
          <svg 
            className="w-6 h-6 transform transition-transform duration-300 hover:scale-110"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        )}
      </button>
    </div>
  </header>
);

export default ChatToggle;