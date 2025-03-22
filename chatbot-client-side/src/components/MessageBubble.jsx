import MarkdownComponent from './MarkdownComponent';

const MessageBubble = ({ isBot, isBotError, text }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`max-w-[85%] rounded-2xl p-4 transition-all duration-200 ${
      isBot 
        ? (isBotError 
            ? 'bg-red-50 border border-red-200 text-red-800 [&_a]:text-red-700 [&_a]:hover:text-red-800 [&_a]:underline' 
            : 'bg-white border border-gray-100 shadow-md hover:shadow-lg [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-gray-800 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline')
        : 'bg-blue-600 text-white shadow-md hover:shadow-lg [&_a]:text-gray-200 [&_a]:hover:text-white [&_a]:underline'
    } ${!isBot ? 'font-medium' : ''}`}>
      {isBot 
        ? <MarkdownComponent markdownText={text} /> 
        : <div className="leading-relaxed">{text}</div>
      }
    </div>
  </div>
);

export default MessageBubble;