'use client'

import Link from 'next/link'

export default function Home () {
  return (
    <div className='flex flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full flex flex-col gap-y-8'>
        <h2 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center'>
          Y. The new way to chat
        </h2>
        <p className='text-xl leading-8 text-gray-600 text-center'>
          Join us now and start chatting with millions other users
        </p>
        <div className='flex flex-1 gap-x-2 justify-center items-center'>
          <Link
            href='/login'
            className='rounded-md bg-gray-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
          >
            Log in
          </Link>
          ,
          <Link
            href='/register'
            className='rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
