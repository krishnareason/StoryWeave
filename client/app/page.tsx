'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';
import SidebarTopics from '@/components/SidebarTopics';
import api from '@/lib/api';
interface Blog { id: number; title: string; content: string; imageUrl: string; createdAt: string; User: { name: string; }; }
export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchBlogs();
  }, []);
  const createSnippet = (content: string) => content.replace(/<[^>]+>/g, '').substring(0, 100) + '...';
  return (
    <>
      <div className="border-b border-gray-300">
        <div className="container mx-auto flex items-center p-8 md:p-16">
          <div className="flex flex-col space-y-6">
            <h1 className="font-serif text-6xl md:text-8xl">Human stories & ideas</h1>
            <p className="text-xl text-gray-600">A place to read, write, and deepen your understanding.</p>
            <div className="pt-4"><Link href="/blogs" className="bg-text-main text-white px-6 py-3 rounded-full text-lg">Start reading</Link></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {loading ? <p>Loading...</p> : blogs.map((post) => (
            <BlogPostCard key={post.id} authorName={post.User.name} title={post.title} snippet={createSnippet(post.content)} imageUrl={post.imageUrl || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400'} date={new Date(post.createdAt).toLocaleDateString()} readTime="5 min read" postUrl={`/post?id=${post.id}`} />
          ))}
        </div>
        <div className="md:col-span-1"><SidebarTopics /></div>
      </div>
    </>
  );
}