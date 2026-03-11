'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import GlareHover from '@/components/GlareHover';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (err: unknown) {
      toast.error('Login failed');
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Invalid credentials');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-200 px-4 py-10">
      <div className="pointer-events-none absolute -left-10 top-20 h-28 w-20 -rotate-45 bg-cyan-500/70" />
      <div className="pointer-events-none absolute left-24 bottom-20 h-24 w-16 rotate-45 bg-blue-500/70" />
      <div className="pointer-events-none absolute right-20 top-16 h-24 w-16 -rotate-45 bg-fuchsia-500/70" />
      <div className="pointer-events-none absolute right-32 top-24 h-20 w-14 -rotate-45 bg-amber-400/80" />
      <div className="pointer-events-none absolute right-12 bottom-24 h-20 w-14 rotate-45 bg-cyan-400/70" />

      <section className="animate-fade-in-up grid w-full max-w-4xl overflow-hidden rounded-sm border border-slate-300 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.2)] md:grid-cols-[1.2fr_1fr]">
        <div
          className="relative min-h-75 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(2,6,23,0.28), rgba(2,6,23,0.4)), url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
            <div className="flex h-60 w-60 flex-col items-center justify-center rounded-full border-4 border-white/90 text-center">
              <p className="px-6 text-2xl font-semibold leading-tight">Product Record</p>
              <p className="px-6 text-2xl font-semibold leading-tight">Management System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-8 sm:px-10">
          <GlareHover className="w-full max-w-xs rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-full">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-xl text-pink-500">
                ❖
              </div>
              <h1 className="text-4xl font-light text-slate-700">Sign In</h1>
              <p className="mt-2 text-center text-xs text-slate-500">
                Enter your email address and password to access admin panel.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Username</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="enter your username"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-1 inline-flex w-full items-center justify-center gap-2 bg-slate-800 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                )}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-pink-500 hover:text-pink-400">
                Sign Up
              </Link>
            </p>
            </div>
          </GlareHover>
        </div>
      </section>
    </main>
  );
}
