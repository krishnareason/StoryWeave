'use client';
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import api from '@/lib/api';
import AIHelperPanel from '@/components/AIHelperPanel';
const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), { ssr: false, loading: () => <p>Loading...</p> });
function EditForm() {
  const router = useRouter();
  const id = useSearchParams().get('id');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (id) api.get(`/blogs/${id}`).then(res => {
      setTitle(res.data.title); setContent(res.data.content); setSummary(res.data.summary || ''); setTags((res.data.tags || []).join(', ')); setIsLoaded(true);
    });
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/blogs/${id}`, { title, content, summary, tags: tags.split(',').map(tag => tag.trim()) });
    router.push(`/post?id=${id}`);
  };
  if (!isLoaded) return <p>Loading form...</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
        <div><label>Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md mt-1" /></div>
        <div><label>Content</label><div className="mt-1"><TiptapEditor content={content} onChange={setContent} /></div></div>
        <div><label>Summary</label><textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border rounded-md mt-1" rows={3} /></div>
        <div><label>Tags</label><input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded-md mt-1" /></div>
        <div className="flex justify-end"><button type="submit" className="px-6 py-2 bg-text-main text-white rounded-full">Update Post</button></div>
      </form>
      <div className="md:col-span-1"><AIHelperPanel content={content} onTitleSuggestion={setTitle} onSummarySuggestion={setSummary} onTagsSuggestion={setTags} /></div>
    </div>
  );
}
export default function EditBlogPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Edit Post</h1>
      <Suspense fallback={<p>Loading...</p>}><EditForm /></Suspense>
    </div>
  );
}