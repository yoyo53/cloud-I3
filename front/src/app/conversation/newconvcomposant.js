import React, { useState } from 'react';

function Newconv({token}) {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        const data = { email: email };
        fetch(`${process.env.ROOTAPI}/conversations/newconversation`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
            .then((response) => {
                console.log(response)
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Erreur lors de la requête.');
              }
            })
            .then((data) => {
            })
            .catch((error) => {
              console.error('Erreur :', error);
            });
            setEmail(''); // Réinitialisez le champ de message après l'envoi.
      };

  return (
    <div>
  <label
    htmlFor="email"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Nouvel conversation
  </label>
  <div className="flex w-full">
    <input
      id="email"
      name="email"
      type="email"
      autoComplete="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="flex-grow rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    <button
      type="button"
      className="ml-2 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-blue-400 focus:outline-none"
        onClick={handleSubmit}
    >
      <span className="font-bold">New</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6 ml-2 transform rotate-90"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
      </svg>
    </button>
  </div>
</div>

  );
}

export default Newconv;
