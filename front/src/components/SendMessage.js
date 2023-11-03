"use client";

import React, { useState } from 'react';
import toast from "react-hot-toast";

function MessageInput({idconv, token, refreshChat}) {
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { message: message };
    fetch(`${process.env.ROOTAPI}/conversations/sendmessage/${idconv}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erreur lors de la requête.');
          }
        })
        .then((data) => {
            console.log('Message envoyé avec succès :', data);
            refreshChat(token);
        })
        .catch((error) => {
          toast.error("Error: failed to send message");
          console.error('Erreur :', error);
        });
    console.log(`Message envoyé : ${message}`);
    setMessage(''); // Réinitialisez le champ de message après l'envoi.
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
    <ul className="flex items-center justify-between w-full">
      <li className="flex-1 relative">
        <input
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          value={message}
          onChange={handleChange}
        />
      </li>
      <li className="ml-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-blue-400 focus:outline-none"
        >
          <span className="font-bold">Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </li>
    </ul>
    </form>
  );
}

export default MessageInput;
