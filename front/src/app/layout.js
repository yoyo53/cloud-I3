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
      <body className={'flex flex-col min-h-screen bg-white ' + inter.className}>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
