"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirectUnautorized } from '../../utils/security';
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [about, setAbout] = useState("");
    const [phone, setPhone] = useState("");
    const [messNotif, setMessNotif] = useState(false);
    const [convNotif, setConvNotif] = useState(false);
    const [offerNotif, setOfferNotif] = useState(true);
    const [phoneNotif, setPhoneNotif] = useState(0);
    const router = useRouter();

  useEffect(() => {
     (async () => {
        await redirectUnautorized(router);
        const token = window.localStorage.getItem("token");
        let response = await fetch(`${process.env.ROOTAPI}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            let jsonResponse = await response.json();
            setEmail(jsonResponse.user.email);
            setUsername(jsonResponse.user.username);
            setAbout(jsonResponse.user.about);
            setPhone(jsonResponse.user.phone ?? "");
            setMessNotif(jsonResponse.user.mess_notif);
            setConvNotif(jsonResponse.user.conv_notif);
            setOfferNotif(jsonResponse.user.offer_notif);
            setPhoneNotif(jsonResponse.user.phone_notif);    
        }
     })()
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    let response = await fetch(`${process.env.ROOTAPI}/user/update`, {
      method: 'PUT',
      body: JSON.stringify({
        username: username,
        about: about,
        phone: phone,
        mess_notif: messNotif,
        conv_notif: convNotif,
        offer_notif: offerNotif,
        phone_notif: phone ? phoneNotif : 0 
      }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (response.ok) {
      toast.success("Modifications saved");
    }
    else {
      toast.error("Error: failed to update profile");
    }
  };

  const deleteAccount = async () => {
    const token = window.localStorage.getItem("token");
    let response = await fetch(`${process.env.ROOTAPI}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    if (response.ok) {
      toast.success("Account deleted successfully");
      window.localStorage.removeItem("token");
      router.push("/");
    }
    else {
      toast.error("Error: account deletion failed");
    }
  };


  return (
    <form className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8' method='POST' onSubmit={saveProfile}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Those information will be displayed publicly so be careful about what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-md"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">What do you want your friends to know about you?</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Safeguard your account with ease and manage your essential contact details.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  readOnly
                  className="block w-full bg-gray-100 cursor-not-allowed rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We&apos;ll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="messages"
                      name="messages"
                      type="checkbox"
                      checked={messNotif}
                      onChange={() => setMessNotif(!messNotif)}    
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="messages" className="font-medium text-gray-900">
                      Messages
                    </label>
                    <p className="text-gray-500">Get notified when you receive a message in one of your conversations.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="conversations"
                      name="conversations"
                      type="checkbox"
                      checked={convNotif}
                      onChange={() => setConvNotif(!convNotif)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="conversations" className="font-medium text-gray-900">
                      Conversations
                    </label>
                    <p className="text-gray-500">Get notified when someones starts a new discussion with you.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      checked={offerNotif}
                      onChange={() => setOfferNotif(!offerNotif)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Receive special offers from our partners.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    value="2"
                    checked={phoneNotif == 2 && phone}
                    disabled={!phone}
                    onChange={(e) => setPhoneNotif(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    value="1"
                    checked={phoneNotif == 1 && phone}
                    disabled={!phone}
                    onChange={(e) => setPhoneNotif(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    value="0"
                    checked={phoneNotif == 0 || !phone}
                    disabled={!phone}
                    onChange={(e) => setPhoneNotif(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={deleteAccount}
          className="mr-auto rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete Account
        </button>
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={router.back}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
