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
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold text-indigo-400 tracking-tight">
        NeonLabz Products
      </Link>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-400 hover:text-red-400 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}
