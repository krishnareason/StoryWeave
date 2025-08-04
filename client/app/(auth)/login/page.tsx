'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);
      router.push('/');
    } catch (err: any) { setError(err.response?.data?.message || 'Login failed.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div><label htmlFor="email" className="block text-sm font-medium">Email address</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 border rounded-md p-2" /></div>
        <div><label htmlFor="password" className="block text-sm font-medium">Password</label><input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 border rounded-md p-2" /></div>
        <div><button type="submit" disabled={loading} className="w-full py-2 text-white bg-text-main rounded-full hover:bg-gray-700 disabled:bg-gray-400">{loading ? 'Signing In...' : 'Sign In'}</button></div>
      </form>
      <p className="text-sm text-center">No account? <Link href="/register" className="font-medium text-accent hover:underline">Register</Link></p>
    </div>
  );
}