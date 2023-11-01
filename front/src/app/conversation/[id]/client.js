"use client"
import { useEffect, useState } from 'react';

function ChatClient({ conversationId }) {
  const [newMessage, setNewMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Envoyer le message au serveur ici et mettre à jour messageHistory

      // Simuler l'ajout du message à la liste des messages
      const newMessageObj = { text: newMessage, user: 'You' };
      setMessageHistory([...messageHistory, newMessageObj]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Ici, vous devrez mettre en place la récupération des messages depuis le serveur
    // Utilisez fetch ou WebSocket pour obtenir les messages de la conversation
    // Mettez à jour messageHistory avec les messages reçus
  }, [conversationId]);

  return (
    <div className="h-screen">
        <div className="m-10 rounded-lg overflow-hidden">
          <h1>Chat with {conversationId}</h1>
          <div>
            {messageHistory.map((message, index) => (
              <div key={index} className={`message ${message.user === 'You' ? 'sent' : 'received'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
    </div>
  );
}


export default ChatClient;
