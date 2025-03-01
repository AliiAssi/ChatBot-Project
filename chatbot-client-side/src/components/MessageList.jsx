import MessageBubble from './MessageBubble';

const MessageList = ({ messages }) => (
  <>
    {messages.map((msg) => (
      <MessageBubble
        key={msg.id}
        isBot={msg.isBot}
        isError={msg.isError}
        text={msg.text}
      />
    ))}
  </>
);

export default MessageList;