'use client';

import { useEffect } from 'react';

export default function GlobalError ({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className='flex flex-col min-h-screen bg-white'>
        <div className='grid my-16 flex-1 px-4 bg-white place-content-center'>
          <div className='text-center'>
            <h1 className='font-black text-gray-200 text-9xl'>error</h1>

            <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Uh-oh!
            </p>

            <p className='mt-4 text-gray-500'>Something went wrong.</p>

            <button
              onClick={() => reset()}
              className='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring'
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
