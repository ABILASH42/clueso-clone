import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
        <div className="text-xl font-bold tracking-tight text-blue-600 flex items-center gap-2">
          <span>✦</span> <span className="text-slate-900 dark:text-white">Clueso.io Clone</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="px-6 pt-24 pb-32 text-center max-w-7xl mx-auto">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800 uppercase tracking-widest">
           New: AI-Powered Guides
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-8 leading-tight">
          Turn screen recordings into <br className="hidden sm:block"/>
          <span className="text-blue-600 dark:text-blue-500">step-by-step guides</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
          Instantly generate beautiful, AI-enhanced documentation, tutorials, and training materials. 
          Stop writing docs manually and start creating in minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup" className="px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Create Free Guide
          </Link>
          <Link href="#how-it-works" className="px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
            See How It Works
          </Link>
        </div>
      </section>

      <section id="how-it-works" className="bg-white dark:bg-slate-900 py-24 px-6 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
               Create documentation in 3 simple steps
             </h2>
             <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
               Our workflow is designed to be the fastest way to get knowledge out of your head and into a shareable format.
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 shadow-md shadow-blue-900/10">1</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Record or Mock</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Simulate a recording session to capture the perfect workflow steps correctly.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 shadow-md shadow-purple-900/10">2</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Enhancement</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our AI instantly analyzes your steps, generating strict titles, detailed descriptions, and summaries.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-500/30 transition-colors">
              <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 shadow-md shadow-green-900/10">3</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Share & Export</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Get a shareable link to a beautiful, hosted guide page ready for your team or customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 transition-colors">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">Perfect for any team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
               {[
                 { title: "Customer Support", desc: "Answer tickets faster with visual guides." },
                 { title: "Engineering", desc: "Document deployment processes and runbooks." },
                 { title: "HR & Onboarding", desc: "Train new employees with standard procedures." },
                 { title: "Product Management", desc: "Share new feature walkthroughs." }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="w-1.5 h-12 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <footer className="bg-white dark:bg-slate-900 py-12 px-6 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                  <div className="text-xl font-bold tracking-tight text-blue-600 flex items-center gap-2 mb-4">
                      <span>✦</span> <span className="text-slate-900 dark:text-white">Clueso.io Clone</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                      The fastest way to create beautiful step-by-step documentation.
                  </p>
              </div>
              <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Changelog</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
                      <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                  </ul>
              </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-8 text-center md:text-left text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Clueso.io Clone. All rights reserved.
          </div>
      </footer>
    </main>
  );
}
