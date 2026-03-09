'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number;
  createdAt: string;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No products yet. Create one above!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-right">Price</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {products.map((p) => (
            <tr key={p.id} className="bg-gray-900/50 hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{p.name}</td>
              <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{p.description}</td>
              <td className="px-6 py-4 text-right text-emerald-400 font-semibold">
                ${Number(p.price).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  onClick={() => onEdit(p)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                >
                  {deletingId === p.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
