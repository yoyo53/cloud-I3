"use client"
import { useState, useEffect } from 'react';
import Message from './messagecomposant';
import MessageInput from './sendmessagecomposant';
import { useSearchParams } from 'next/navigation'

let token;

export default function ChatPage() {
  const id = new URLSearchParams(useSearchParams()).get("id");
  const [messageList, setMessageList] = useState([]);
  
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
    // Lorsque le composant est monté, effectuez la requête fetch.
    token = window.localStorage.getItem("token");
    refreshChat(token);
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
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt=""
          className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
        />
      </div>
      {/* User details */}
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-gray-700 mr-3">Anderson Vanhron</span>
        </div>
        <span className="text-lg text-gray-600">Junior Developer</span>
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
  {messageList.map((message, index) => (
    <Message
      key={index}
      text={message.message_text}
      imageUrl="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
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
  