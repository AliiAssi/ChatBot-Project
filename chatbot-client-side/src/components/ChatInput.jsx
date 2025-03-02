import PropTypes from 'prop-types';

const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  disabled,
  isRecording,
  toggleRecording,
  error
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder="Type your message..."
        className="w-full p-2 pr-16 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        rows={2}
      />
      
      <div className="absolute right-2 bottom-2 flex items-center gap-2">
        <button
          onClick={toggleRecording}
          type="button"
          className={`p-1.5 rounded-lg transition-colors ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'hover:bg-gray-200 text-gray-600'
          }`}
          title={isRecording ? 'Stop recording' : 'Start recording'}
          disabled={disabled}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isRecording ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            )}
          </svg>
        </button>
        
        <button
          onClick={onSend}
          disabled={disabled}
          className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          title="Send message"
        >
          <svg
            className="w-6 h-6"
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
    </div>
  );
};

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isRecording: PropTypes.bool,
  toggleRecording: PropTypes.func,
  error: PropTypes.string
};

export default ChatInput;