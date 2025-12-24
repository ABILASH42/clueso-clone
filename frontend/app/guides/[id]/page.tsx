'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGuideById, getSteps, addStep, generateSummary, Guide, Step, deleteStep } from '../../../services/guideService';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function GuideEditorPage() {
  const { id } = useParams();
  const guideId = Array.isArray(id) ? id[0] : id; // Handle potential array params
  const router = useRouter();

  const [guide, setGuide] = useState<Guide | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [addingStep, setAddingStep] = useState(false);

  const [generating, setGenerating] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
  
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
  
    const handleAddStep = async (e: React.FormEvent) => {
      e.preventDefault();
      setAddingStep(true);
      if (!guideId) return;
      try {
          await addStep(guideId, { title: stepTitle, description: stepDesc });
          setStepTitle('');
          setStepDesc('');
          // Refresh steps
          const updatedSteps = await getSteps(guideId);
          setSteps(updatedSteps);
          toast.success('Step added successfully!');
      } catch (error) {
          console.error("Error adding step", error);
          toast.error('Failed to add step');
      } finally {
          setAddingStep(false);
      }
    };
  
    const handleDeleteStep = async (stepId: string) => {
        if(!confirm("Are you sure you want to delete this step?")) return;
        if (!guideId) return;
        try {
            await deleteStep(guideId, stepId);
            setSteps(steps.filter(s => s._id !== stepId));
            toast.success('Step deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete step');
        }
    }
  
    const handleGenerateAI = async () => {
        setGenerating(true);
        setSuccessMsg('');
        if (!guideId) return;
        try {
            const res = await generateSummary(guideId);
            setGuide(res.guide); // Update local guide state with new summary/status
            setSuccessMsg('Summary generated successfully!');
            toast.success('AI summary generated!');
            setTimeout(() => setSuccessMsg(''), 3000); // Clear after 3s
        } catch (error) {
            console.error("Error generating summary", error);
            toast.error('Failed to generate AI summary');
        } finally {
            setGenerating(false);
        }
    };
  
    if (loading) return <div className="p-10 text-center text-slate-500">Loading Guide...</div>;
    if (!guide) return <div className="p-10 text-center text-slate-500">Guide not found</div>;
  
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-20">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm transition-colors">
          <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Back to Dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </Link>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-md">{guide.title}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wide uppercase ${
                  guide.status === 'GENERATED' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
              }`}>
                  {guide.status === 'GENERATED' ? 'AI Ready' : 'Draft'}
              </span>
          </div>
          <div className="flex items-center gap-3">
              {successMsg && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400 animate-fade-in px-2">
                      {successMsg}
                  </span>
              )}
              <button 
                  onClick={handleGenerateAI}
                  disabled={generating || steps.length === 0}
                  className={`px-4 py-2 rounded-lg font-bold text-sm text-white transition-all flex items-center gap-2 ${
                      generating ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-sm hover:shadow-md'
                  }`}
              >
                  {generating ? (
                      <>
                         <div className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                         <span>Analyzing...</span>
                      </>
                  ) : (
                      <>
                          <span>✨ Generate AI Summary</span>
                      </>
                  )}
              </button>
              <Link
                  href={`/guides/${guideId}/preview`}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                  Preview
              </Link>
          </div>
        </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                Steps <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">{steps.length}</span>
            </h2>

            {steps.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 mb-2 text-lg font-medium">No steps added yet.</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">Add steps using the form on the right.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <div key={step._id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 rounded-xl flex items-center justify-center font-bold text-base">
                                    {index + 1}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-base leading-relaxed whitespace-pre-line">{step.description}</p>
                                    
                                    <div className="mt-4 bg-slate-50 dark:bg-slate-950 rounded-xl h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                                        <span className="text-2xl mb-2">📷</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Screen Recording</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDeleteStep(step._id)}
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all absolute top-4 right-4"
                                    title="Delete Step"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg sticky top-28">
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Add New Step</h3>
                <form onSubmit={handleAddStep} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Step Title</label>
                        <input
                            type="text"
                            required
                            value={stepTitle}
                            onChange={(e) => setStepTitle(e.target.value)}
                            placeholder="e.g. Click the 'Save' button"
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Description</label>
                        <textarea
                            required
                            rows={5}
                            value={stepDesc}
                            onChange={(e) => setStepDesc(e.target.value)}
                            placeholder="Explain what happens in this step..."
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={addingStep}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {addingStep ? 'Adding...' : 'Add Step'}
                    </button>
                </form>
            </div>
        </div>

      </main>
    </div>
  );
}
