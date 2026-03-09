'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductTable from '@/components/ProductTable';
import ProductForm from '@/components/ProductForm';
import api from '@/lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number;
  createdAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get('/records');
      setProducts(res.data);
    } catch {
      setError('Failed to load products. Are you logged in?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [router, fetchProducts]);

  const handleCreate = async (data: ProductFormData) => {
    const res = await api.post('/records', {
      ...data,
      price: parseFloat(data.price),
    });
    setProducts((prev) => [res.data, ...prev]);
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editingProduct) return;
    const res = await api.put(`/records/${editingProduct.id}`, {
      ...data,
      price: parseFloat(data.price),
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? res.data : p)),
    );
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/records/${id}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editFormData = editingProduct
    ? {
        name: editingProduct.name,
        description: editingProduct.description,
        price: String(editingProduct.price),
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Product Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your product catalog</p>
        </div>

        <ProductForm
          initialData={editFormData}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={() => setEditingProduct(null)}
        />

        {error && (
          <div className="text-sm text-red-400 bg-red-900/30 border border-red-700 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading products…</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
