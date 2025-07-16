/** @format */

import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Imo State Ministry Of Works',
  description: 'The Official Site Of The Imo State Ministry Of Works',
  favicon: '../../../../public/imo-logo2.jpg',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
