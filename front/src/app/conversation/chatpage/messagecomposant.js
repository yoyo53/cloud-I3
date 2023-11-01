
export default function Message({ text, imageUrl, isCurrentUser }) {
    const messageClass = isCurrentUser
      ? "chat-message flex items-end justify-end"
      : "chat-message flex items-end";
  
    const messageContentClass = isCurrentUser
      ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
      : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
    
    const messageUserProfil = isCurrentUser
      ? "w-6 h-6 rounded-full order-2"
      : "w-6 h-6 rounded-full order-1";
    const messageUserBubble = isCurrentUser
        ? "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1"
        : "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2";
    return (
      <div className={messageClass}>
        <div className={messageUserBubble}>
          <div>
            <span className={messageContentClass}>{text}</span>
          </div>
        </div>
        <img
          src={imageUrl}
          alt="User Profile"
          className={messageUserProfil}
        />
      </div>
    );
  }
  