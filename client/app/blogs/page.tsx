'use client';
import React, { useState, useEffect } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import api from '@/lib/api';
interface Blog { id: number; title: string; content: string; imageUrl: string; createdAt: string; User: { name: string; }; }
export default function BlogsPage() {
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
    <div className="container mx-auto p-8">
      <h1 className="font-serif text-4xl font-bold mb-8">All Posts</h1>
      {loading ? <p>Loading...</p> : blogs.map((post) => (
        <BlogPostCard key={post.id} authorName={post.User.name} title={post.title} snippet={createSnippet(post.content)} imageUrl={post.imageUrl || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400'} date={new Date(post.createdAt).toLocaleDateString()} readTime="5 min read" postUrl={`/post?id=${post.id}`} />
      ))}
    </div>
  );
}