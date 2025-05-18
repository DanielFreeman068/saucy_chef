import "./globals.css";
import { Inder } from 'next/font/google'
import LogoutButton from './components/Logout';

const inder = Inder({
  subsets: ['latin'],
  weight: '400', // Inder only has 400
  display: 'swap',
})

export const metadata = {
  title: "The Saucy Chef",
  description: "The Saucy Chef is a full stack website allowing users to browse and filter through recipes, add recipes, and create weekly meal plans.",
  icons:{
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' }
    ]
  }
};

export default function RootLayout({ children }) {

  

  return (
    <html lang="en" className="h-full">
      <body className={`min-h-screen flex flex-col ${inder.className} antialiased`}>
        <main className="flex-grow">
          {children}
        </main>

        
      </body>
    </html>
  );
}
