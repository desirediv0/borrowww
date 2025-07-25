import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Borrowww - Change the way you use your money',
  description:
    'From your everyday spending, to planning for your future with savings and investments, Borrowww helps you get more from your money.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 overflow-x-hidden`}>{children}</body>
    </html>
  );
}
