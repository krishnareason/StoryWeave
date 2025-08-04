import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const metadata: Metadata = { title: 'StoryWeave', description: 'An AI-powered blogging platform' };
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background font-sans text-text-main">
        <AuthProvider><Header /><main>{children}</main></AuthProvider>
      </body>
    </html>
  );
}