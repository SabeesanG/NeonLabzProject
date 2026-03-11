'use client';

import { useState, useEffect } from 'react';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
}

interface Props {
  initialData?: ProductFormData | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      return;
    }
    setForm({ name: '', description: '', price: '' });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({ name: '', description: '', price: '' });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!initialData;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-300 bg-white p-6"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        {isEditing ? '✏️ Edit Product' : '➕ New Product'}
      </h2>

      {error && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-slate-600">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Product name"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-slate-600">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Product description"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-slate-600">Price (Rs.)</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="0.00"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 font-semibold text-white transition-colors hover:bg-sky-500 disabled:opacity-60"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
          )}
          {loading ? 'Saving…' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 rounded-lg bg-slate-200 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-300 disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
