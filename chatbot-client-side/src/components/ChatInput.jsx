const ChatInput = ({ value, onChange, onSend, disabled }) => (
  <div className="border-t border-gray-200 p-4 flex space-x-2.5">
    <input        
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && onSend()}
      placeholder="Type your message..."
      className="flex-1 px-4 py-2.5 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200 focus:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      aria-label="Type your message"
    />
    <button
      onClick={onSend}
      className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
      disabled={!value.trim() || disabled}
      aria-label="Send message"
    >
      <svg 
        className="w-5 h-5 transform -translate-y-px"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
        />
      </svg>
    </button>
  </div>
);

export default ChatInput;