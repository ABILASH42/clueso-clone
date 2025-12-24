'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    router.push('/login');
  };

  const links = [
    { href: '/dashboard', label: 'Projects', icon: LayoutDashboard },
  ];

  return (
    <div className="flex h-screen flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 w-64 p-4 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center px-4 py-2 mb-6">
           <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
             Clueso
           </h1>
        </div>
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-slate-800 group",
                pathname === link.href ? "bg-white dark:bg-slate-950 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
              )}
            >
              <link.icon className="mr-3 h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
         <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
         >
           <LogOut className="mr-3 h-4 w-4" />
           Logout
         </button>
      </div>
    </div>
  );
}
