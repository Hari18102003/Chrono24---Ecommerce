import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { SessionContext } from '@/components/sessionContext/SessionContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chrono24 - Buy and groom your wrists',
  description: 'Ecommerce watch store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <main>
          <SessionContext>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </SessionContext>
        </main>
      </body>
    </html>
  )
}
