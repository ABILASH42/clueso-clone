'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Guide, getGuides } from '../../services/guideService';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function Dashboard() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const data = await getGuides();
      setGuides(data);
    } catch (error) {
      console.error('Failed to fetch guides', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20 transition-colors">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-blue-600">✦</span> Clueso Dashboard
        </h1>
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
                href="/profile"
                className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all cursor-pointer"
                title="Profile Settings"
            >
                JD
            </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Your Guides</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage and create your step-by-step documentations.</p>
          </div>
          <Link
            href="/dashboard/create"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span>+</span> Create New Guide
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : guides.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl border border-blue-100 dark:border-slate-700">
                📝
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">No guides yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">Start creating your first step-by-step guide to document your workflows effectively.</p>
            <Link
                href="/dashboard/create"
                className="inline-flex px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 transition-all shadow-sm"
            >
                Create Guide
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {guides.map((guide) => (
              <div
                key={guide._id}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {guide.title}
                    </h3>
                    <span 
                        className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wide uppercase ${
                            guide.status === 'GENERATED' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        }`}
                    >
                        {guide.status === 'GENERATED' ? 'AI Ready' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-base line-clamp-1 max-w-2xl">
                    {guide.description || "No description provided."}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="text-right hidden sm:block">
                         <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-1">Last Updated</span>
                         <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{new Date(guide.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block"></div>

                    <Link
                        href={`/guides/${guide._id}`}
                        className="px-5 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                    >
                        Edit Steps
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
