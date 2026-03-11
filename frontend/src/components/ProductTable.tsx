'use client';

import { formatCurrency, formatDate } from '@/lib/format';

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
  onDelete: (product: Product) => void;
  onAddProduct: () => void;
}

export default function ProductTable({ products, onEdit, onDelete, onAddProduct }: Props) {
  if (products.length === 0) {
    return (
      <div className="animate-fade-in-up rounded-xl border border-slate-300 bg-white/88 px-6 py-14 text-center shadow-sm backdrop-blur-[2px]">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-slate-300 bg-slate-100" />
        <p className="text-lg font-medium text-slate-800">No products found</p>
        <p className="mt-1 text-sm text-slate-500">Add your first product to get started.</p>
        <button
          type="button"
          onClick={onAddProduct}
          className="btn-primary mt-5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
        >
          + Add Product
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up overflow-x-auto rounded-xl border border-slate-300 bg-white/90 shadow-sm backdrop-blur-[2px]">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-right">Price</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {products.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
              <td className="max-w-xs truncate px-6 py-4 text-slate-600">{p.description}</td>
              <td className="px-6 py-4 text-right text-emerald-400 font-semibold">
                {formatCurrency(p.price)}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {formatDate(p.createdAt)}
              </td>
              <td className="px-6 py-4 text-center space-x-3">
                <button
                  onClick={() => onEdit(p)}
                  className="font-medium text-sky-600 transition-colors hover:text-sky-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="font-medium text-red-500 transition-colors hover:text-red-400 disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
