'use client';

import { useMemo, useState } from 'react';
import ProductTable from '@/components/ProductTable';
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
  onDelete: (id: string) => void;
  onAddProduct: () => void;
}

type ViewMode = 'table' | 'cards' | 'pinpoint';

export default function ProductViews({ products, onEdit, onDelete, onAddProduct }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId) ?? products[0] ?? null,
    [products, selectedId],
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white/88 p-3 shadow-sm backdrop-blur-[2px]">
        <div>
          <p className="text-sm font-semibold text-slate-800">Records View</p>
          <p className="text-xs text-slate-500">Switch between multiple patterns to inspect products</p>
        </div>

        <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'table'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Table View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'cards'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Card View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('pinpoint')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'pinpoint'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pinpoint View
          </button>
        </div>
      </div>

      {viewMode === 'table' && (
        <ProductTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddProduct={onAddProduct}
        />
      )}

      {viewMode === 'cards' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <div className="col-span-full rounded-xl border border-slate-300 bg-white/88 px-6 py-14 text-center shadow-sm backdrop-blur-[2px]">
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
          ) : (
            products.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-slate-300 bg-white/90 p-4 shadow-sm backdrop-blur-[2px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-1 text-base font-semibold text-slate-800">{p.name}</h3>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    {formatCurrency(p.price)}
                  </span>
                </div>

                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>

                <p className="mt-3 text-xs text-slate-500">Created {formatDate(p.createdAt)}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(p)}
                    className="rounded-md bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === p.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {viewMode === 'pinpoint' && (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-xl border border-slate-300 bg-white/90 p-3 shadow-sm backdrop-blur-[2px]">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Added Products
            </p>

            {products.length === 0 ? (
              <p className="px-2 py-8 text-sm text-slate-500">No records to pinpoint yet.</p>
            ) : (
              <div className="max-h-130 space-y-2 overflow-auto pr-1">
                {products.map((p) => {
                  const active = p.id === selectedProduct?.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                        active
                          ? 'border-sky-300 bg-sky-50'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <p className="line-clamp-1 text-sm font-semibold text-slate-800">{p.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatCurrency(p.price)}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </aside>

          <section className="rounded-xl border border-slate-300 bg-white/90 p-5 shadow-sm backdrop-blur-[2px]">
            {!selectedProduct ? (
              <p className="text-sm text-slate-500">Choose a product to view its details.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Pinpoint Detail
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-800">{selectedProduct.name}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {formatCurrency(selectedProduct.price)}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product ID
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-700">{selectedProduct.id}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Added On
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {formatDate(selectedProduct.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Description
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(selectedProduct)}
                    className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-500"
                  >
                    Edit This Product
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedProduct.id)}
                    disabled={deletingId === selectedProduct.id}
                    className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === selectedProduct.id ? 'Deleting…' : 'Delete This Product'}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
