'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '@/components/ui/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rehydrate user from localstorage if not in store
    const storedUser = localStorage.getItem('user');
    if (!user && storedUser) {
        login(JSON.parse(storedUser));
    } else if (!user && !storedUser) {
        router.push('/login');
    }
    setLoading(false);
  }, [user, router, login]);

  if (loading) {
     return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
      return null; // Will redirect
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
