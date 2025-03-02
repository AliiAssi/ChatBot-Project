import MarkdownComponent from './MarkdownComponent';

const MessageBubble = ({ isBot, isBotError, text }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-[85%] rounded-xl p-4 transition-all ${
      isBot ? 
        (isBotError ? 
          'bg-red-50 border border-red-200 text-red-800 [&_a]:text-red-700 [&_a]:hover:text-red-800 [&_a]:underline' : 
          'bg-white border border-gray-200 shadow-sm [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-gray-800 [&_a]:text-gray-700 [&_a]:hover:text-gray-900 [&_a]:underline') : 
        'bg-gray-900 text-gray-100 shadow-md [&_a]:text-gray-300 [&_a]:hover:text-white [&_a]:underline'
    }`}>
      {isBot ? <MarkdownComponent markdownText={text} /> : text}
    </div>
  </div>
);

export default MessageBubble;