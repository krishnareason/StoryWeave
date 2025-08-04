'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
interface Props { content: string; onTitleSuggestion: (title: string) => void; onSummarySuggestion: (summary: string) => void; onTagsSuggestion: (tags: string) => void; }
export default function AIHelperPanel({ content, onTitleSuggestion, onSummarySuggestion, onTagsSuggestion }: Props) {
  const [loading, setLoading] = useState('');
  const handleAICall = async (type: string, endpoint: string, onSuccess: (data: string) => void) => {
    if (!content) { alert('Please write content first.'); return; }
    setLoading(type);
    try {
      const response = await api.post(`/ai/${endpoint}`, { content });
      onSuccess(response.data.result);
    } catch (error) { alert(`Failed to generate ${type}.`); }
    finally { setLoading(''); }
  };
  return (
    <div className="p-4 bg-gray-50 border rounded-lg">
      <h3 className="font-bold mb-4">AI Assistant</h3>
      <div className="flex flex-col space-y-3">
        <button type="button" onClick={() => handleAICall('title', 'suggest-title', onTitleSuggestion)} disabled={!!loading} className="w-full text-left px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50">{loading === 'title' ? 'Generating...' : '💡 Suggest Title'}</button>
        <button type="button" onClick={() => handleAICall('summary', 'summarize', onSummarySuggestion)} disabled={!!loading} className="w-full text-left px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50">{loading === 'summary' ? 'Generating...' : '✍️ Generate Summary'}</button>
        <button type="button" onClick={() => handleAICall('tags', 'seo-tags', onTagsSuggestion)} disabled={!!loading} className="w-full text-left px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50">{loading === 'tags' ? 'Generating...' : '🏷️ Suggest SEO Tags'}</button>
      </div>
    </div>
  );
}