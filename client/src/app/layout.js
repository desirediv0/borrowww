import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ascone Finance - Change the way you use your money',
  description:
    'From your everyday spending, to planning for your future with savings and investments, Ascone helps you get more from your money.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
