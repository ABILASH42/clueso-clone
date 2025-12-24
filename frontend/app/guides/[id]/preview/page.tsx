'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getGuideById, getSteps, Guide, Step } from '../../../../services/guideService';
import Link from 'next/link';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function GuidePreviewPage() {
  const { id } = useParams();
  const guideId = Array.isArray(id) ? id[0] : id;
  
  const [guide, setGuide] = useState<Guide | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guideId) {
        fetchData();
    }
  }, [guideId]);

  const fetchData = async () => {
    if (!guideId) return;
    try {
        const [gData, sData] = await Promise.all([
            getGuideById(guideId),
            getSteps(guideId)
        ]);
        setGuide(gData);
        setSteps(sData);
    } catch (error) {
        console.error("Error fetching data", error);
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 dark:text-slate-400">Loading Preview...</div>;
  if (!guide) return <div className="p-10 text-center text-slate-500 dark:text-slate-400">Guide not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center px-8 py-4 sticky top-0 z-10 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <Link
            href={`/guides/${guideId}`}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Editor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <div className="font-bold text-blue-600 flex items-center gap-2 text-lg">
            <span>✦</span> <span className="text-slate-900 dark:text-white">Clueso Guide</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
                href={`/guides/${guideId}`}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
            >
                Edit Guide
            </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">{guide.title}</h1>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm text-left relative overflow-hidden ring-1 ring-blue-50 dark:ring-blue-900/20">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl select-none dark:text-white">✨</div>
                <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    ✨ AI Summary
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg text-pretty">
                    {guide.description || (
                        <span className="italic text-slate-400">
                             No summary generated yet. Go back to the editor and click "Generate AI Summary".
                        </span>
                    )}
                </p>
            </div>
        </header>

        <div className="space-y-16">
            {steps.map((step, index) => (
                <div key={step._id} className="relative pl-8 md:pl-0">
                     {/* Step Connector Line (Desktop) */}
                     {index !== steps.length - 1 && (
                        <div className="hidden md:block absolute left-[27px] top-14 bottom-[-64px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
                     )}

                     <div className="flex flex-col md:flex-row gap-8 relative z-10">
                        {/* Step Number */}
                        <div className="flex-shrink-0 pt-1">
                            <div className="w-14 h-14 bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 rounded-full flex items-center justify-center font-bold text-xl shadow-sm relative z-10">
                                {index + 1}
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed whitespace-pre-line">
                                <p>{step.description}</p>
                            </div>
                            
                            <div className="w-full aspect-video bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                <span className="text-4xl mb-3">🖼️</span>
                                <span className="font-semibold text-sm uppercase tracking-wider">Screen Recording / Screenshot</span>
                            </div>
                        </div>
                     </div>
                </div>
            ))}

            {steps.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-400 dark:text-slate-500 text-lg">This guide has no steps yet.</p>
                </div>
            )}
        </div>

        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
            Generated with Clueso Clone
        </div>
      </main>
    </div>
  );

}
