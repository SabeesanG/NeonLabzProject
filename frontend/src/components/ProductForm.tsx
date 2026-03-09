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
    if (initialData) setForm(initialData);
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
      className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">
        {isEditing ? '✏️ Edit Product' : '➕ New Product'}
      </h2>

      {error && (
        <p className="text-sm text-red-400 bg-red-900/30 border border-red-700 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Product name"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          placeholder="Product description"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Price ($)</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="0.00"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          {loading ? 'Saving…' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
