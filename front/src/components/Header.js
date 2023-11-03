'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { usePathname } from 'next/navigation'

export default function Example () {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [connected, setConnected] = useState(null)
  const path = usePathname()

  useEffect(() => {
    setMobileMenuOpen(false);
    (async () => {
      const token = window.localStorage.getItem('token')
      try {
        let response = await fetch(`${process.env.ROOTAPI}/auth/verifyToken`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setConnected(response.ok)
      } catch {
        setConnected(false)
      }
    })()
  }, [path])

  const logout = () => {
    window.localStorage.removeItem('token')
    setConnected(false)
  }

  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Y logo</span>
            <img className='h-8 w-auto' src='/logo.svg' alt='Y logo' />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <img
              className='h-6 w-auto'
              src='/bars-icon.svg'
              alt='open main menu'
            />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <Link
            href='/'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Home
          </Link>
          <Link
            href='/conversations'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Conversations
          </Link>
          <Link
            href='/about'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            About us
          </Link>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:gap-x-4 lg:justify-end lg:items-center'>
          {connected == null
            ? []
            : connected
            ? [
                <Link
                  key={0}
                  href='/'
                  onClick={logout}
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Log out
                </Link>,
                <Link
                  key={1}
                  href='/profile'
                  className='flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  <img
                    className='h-4 w-auto'
                    src='/settings-icon.svg'
                    alt='open main menu'
                  />
                  Settings
                </Link>
              ]
            : [
                <Link
                  key={0}
                  href='/login'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Log in <span aria-hidden='true'>&rarr;</span>
                </Link>,
                <Link
                  key={1}
                  href='/register'
                  className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Register
                </Link>
              ]}
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Y logo</span>
              <img className='h-8 w-auto' src='/logo.svg' alt='Y logo' />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <img
                className='h-6 w-auto'
                src='/xmark-icon.svg'
                alt='close menu'
              />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <Link
                  href='/'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Home
                </Link>
                <Link
                  href='/conversations'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Conversations
                </Link>
                <Link
                  href='/about'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  About us
                </Link>
              </div>
              <div className='py-6'>
                {connected == null
                  ? []
                  : connected
                  ? [
                      <Link
                        key={0}
                        href='/'
                        onClick={logout}
                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      >
                        Log out
                      </Link>,
                      <Link
                        key={1}
                        href='/profile'
                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      >
                        Settings
                      </Link>
                    ]
                  : [
                      <Link
                        key={0}
                        href='/login'
                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      >
                        Log in
                      </Link>,
                      <Link
                        key={1}
                        href='/register'
                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      >
                        Register
                      </Link>
                    ]}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
