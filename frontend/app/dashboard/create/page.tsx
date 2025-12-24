'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGuide } from '../../../services/guideService';
import Link from 'next/link';

export default function CreateGuidePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState(''); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const guide = await createGuide({ title, description, audience });
      router.push(`/guides/${guide._id}`);
    } catch (error) {
      console.error('Failed to create guide', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create New Guide
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Start documenting a new workflow
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-8 shadow-sm rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">
                Guide Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to Deploy to Production"
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 sm:text-sm px-4 py-2.5 shadow-sm transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">
                What is this guide for?
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the goal..."
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 sm:text-sm px-4 py-2.5 shadow-sm transition-all"
              />
            </div>

            <div>
              <label htmlFor="audience" className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">
                Target Audience (Optional)
              </label>
              <input
                id="audience"
                name="audience"
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Developers, Customer Support"
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 sm:text-sm px-4 py-2.5 shadow-sm transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl border border-transparent bg-blue-600 py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                {loading ? 'Creating...' : 'Start Building Guide'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
             <button onClick={() => router.back()} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
               Cancel
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
