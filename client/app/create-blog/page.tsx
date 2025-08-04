'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import api from '@/lib/api';
import AIHelperPanel from '@/components/AIHelperPanel';
const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), { ssr: false, loading: () => <p>Loading Editor...</p> });
export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const response = await api.post('/blogs', { title, content, summary, tags: tags.split(',').map(tag => tag.trim()) });
      router.push(`/post?id=${response.data.id}`);
    } catch (err) { alert('Failed to create post'); }
    finally { setLoading(false); }
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Create a New Post</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div><label>Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md mt-1" /></div>
          <div><label>Content</label><div className="mt-1"><TiptapEditor content={content} onChange={setContent} /></div></div>
          <div><label>Summary</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border rounded-md mt-1" rows={3} /></div>
          <div><label>Tags (comma-separated)</label><input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded-md mt-1" /></div>
          <div className="flex justify-end"><button type="submit" disabled={loading} className="px-6 py-2 bg-text-main text-white rounded-full">{loading ? 'Publishing...' : 'Publish'}</button></div>
        </form>
        <div className="md:col-span-1"><AIHelperPanel content={content} onTitleSuggestion={setTitle} onSummarySuggestion={setSummary} onTagsSuggestion={setTags} /></div>
      </div>
    </div>
  );
}