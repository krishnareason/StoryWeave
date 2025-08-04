'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';
interface Blog { id: number; title: string; content: string; createdAt: string; authorId: number; User: { name: string; }; }
function PostContent() {
  const router = useRouter();
  const { user } = useAuth();
  const id = useSearchParams().get('id');
  const [blog, setBlog] = React.useState<Blog | null>(null);
  React.useEffect(() => {
    if (id) api.get(`/blogs/${id}`).then(res => setBlog(res.data)).catch(console.error);
  }, [id]);
  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) { await api.delete(`/blogs/${id}`); router.push('/blogs'); }
  };
  if (!blog) return <p>Loading post...</p>;
  const isAuthor = user && user.id === blog.authorId;
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <h1 className="font-serif text-5xl font-bold">{blog.title}</h1>
        {isAuthor && (<div className="flex space-x-2"><Link href={`/edit?id=${id}`} className="text-blue-600 hover:underline">Edit</Link><button onClick={handleDelete} className="text-red-600 hover:underline">Delete</button></div>)}
      </div>
      <p className="mb-8 text-gray-500">By {blog.User.name} · {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </>
  );
}
export default function BlogPostPage() {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Suspense fallback={<p>Loading...</p>}><PostContent /></Suspense>
    </div>
  );
}