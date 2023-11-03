import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Y. The new way to chat',
  description: 'S7 Web project'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </head>
      <body className={'flex flex-col min-h-screen bg-white ' + inter.className}>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
