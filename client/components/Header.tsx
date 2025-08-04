'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => { logout(); router.push('/'); };
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-serif text-2xl font-bold">StoryWeave</Link>
        <div className="flex items-center space-x-4 text-sm">
          {user ? (
            <>
              <Link href="/create-blog" className="hover:text-accent">Write</Link>
              <button onClick={handleLogout} className="bg-text-main text-white px-4 py-2 rounded-full hover:bg-gray-700">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent">Sign In</Link>
              <Link href="/register" className="bg-text-main text-white px-4 py-2 rounded-full hover:bg-gray-700">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}