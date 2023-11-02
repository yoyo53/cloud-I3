"use client"
import { useState, useEffect } from 'react';
import Message from './messagecomposant';
import MessageInput from './sendmessagecomposant';
import { useSearchParams } from 'next/navigation'

let token;

export default function ChatPage() {
  const id = new URLSearchParams(useSearchParams()).get("id");
  const [messageList, setMessageList] = useState([]);
  const [convinfos, setConvinfos] = useState([{}]);
  
  function getRandomProfilePicture(username) {
    const hash = username.split('').reduce((acc, char) => {
      acc = ((acc << 5) - acc) + char.charCodeAt(0);
      return acc & acc;
    }, 0);
    return `https://picsum.photos/seed/${hash}/200`;
  }

  function refreshChat(token) {
    fetch(`${process.env.ROOTAPI}/conversations/getmessage/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      })
      .then((response) => response.json())
      .then((data) => {
        // Stockez les données dans l'état du composant.
        console.log('Réponse reçue:', data);
        setMessageList(data);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des conversations:', error);
      });
  }
  useEffect(() => {
    document.querySelector('body').classList.add('max-h-screen');

    //fetch sur /getconversation/:conversationId pour récupérer les information de la conversation
    fetch(`${process.env.ROOTAPI}/conversations/getconversation/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Stockez les données dans l'état du composant.
      console.log('Réponse reçue:', data);
      let name = data.other_username;
      let creationdate = data.created_at.split("T")[0];
      setConvinfos({name, creationdate});
    })
    .catch((error) => {
      console.error('Une erreur s\'est produite lors de la récupération des informations de la conversation:', error);
    });

    // Lorsque le composant est monté, effectuez la requête fetch.
    token = window.localStorage.getItem("token");
    refreshChat(token);
  }, []);

  useEffect(() => {
    // Rafraîchir la liste des chats toutes les 5 secondes
    const intervalId = setInterval(() => {
      refreshChat(token);
    }, 5000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);


  return (
    
<div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-white">
  {/* Header */}
  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    {/* User information */}
    <div className="relative flex items-center space-x-4">
      {/* User avatar */}
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img
            src={getRandomProfilePicture(convinfos.name ||"")}
            alt="Profile Picture"
          className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
        />
      </div>
      {/* User details */}
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{convinfos.name}</span>
        </div>
        <span className="text-sm text-gray-400">Created at {convinfos.creationdate}</span>
      </div>
    </div>
    {/* Action buttons */}
    <div className="flex items-center space-x-2">
      {/* Action buttons go here */}
    </div>
  </div>
  {/* Chat messages */}
  <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto overflow-x-hidden scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
  {/* Chat messages go here */}
  {messageList && messageList.map((message, index) => (
    <Message
      key={index}
      text={message.message_text}
      imageUrl={getRandomProfilePicture(message.user_name)}
      isCurrentUser={message.user_type === 'actual_user'}
    />
  ))}
</div>

  {/* Message input */}
  
  <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    {/* Message input and send button */}
    <MessageInput 
    idconv={id}
    token={token}
    refreshChat={refreshChat}/>
  </div>
</div>

  );
}
  