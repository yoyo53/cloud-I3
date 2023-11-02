import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Y. The new way to chat',
  description: 'S7 Web project'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'flex flex-col min-h-screen bg-white ' + inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
