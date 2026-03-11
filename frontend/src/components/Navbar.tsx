'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-300 bg-white/90 px-6 py-4 backdrop-blur-sm flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold text-slate-800 tracking-tight">
        NeonLabz Products
      </Link>
      <button
        onClick={handleLogout}
        className="text-sm text-slate-600 transition-colors hover:text-red-500"
      >
        Logout
      </button>
    </nav>
  );
}
