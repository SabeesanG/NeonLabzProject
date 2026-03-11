'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import ProductViews from '@/components/ProductViews';
import ProductForm from '@/components/ProductForm';
import TableSkeleton from '@/components/TableSkeleton';
import Modal from '@/components/Modal';
import GridMotion from '@/components/GridMotion';
import api from '@/lib/api';

const motionItems: string[] = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1573164574396-12044f7e677d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515876305429-47f9b9a0f42f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get('/records');
      setProducts(res.data);
    } catch {
      setError('Failed to load products. Are you logged in?');
      toast.error('Failed to load products');
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
    try {
      const res = await api.post('/records', {
        ...data,
        price: parseFloat(data.price),
      });
      setProducts((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
      toast.success('Product created successfully');
    } catch {
      toast.error('Failed to create product');
      throw new Error('Failed to create product');
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editingProduct) return;
    try {
      const res = await api.put(`/records/${editingProduct.id}`, {
        ...data,
        price: parseFloat(data.price),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? res.data : p)),
      );
      setEditingProduct(null);
      setIsModalOpen(false);
      toast.success('Product updated successfully');
    } catch {
      toast.error('Failed to update product');
      throw new Error('Failed to update product');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/records/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted successfully');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const editFormData = editingProduct
    ? {
        name: editingProduct.name,
        description: editingProduct.description,
        price: String(editingProduct.price),
      }
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100/70 text-slate-800">
      <GridMotion items={motionItems} gradientColor="white" />
      <Navbar />
      <div className="relative z-20 mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Product Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Manage your product catalog</p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="btn-primary inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
          >
            + Add Product
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <TableSkeleton />
        ) : (
          <ProductViews
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddProduct={handleOpenCreate}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        title={editingProduct ? 'Edit Product' : 'Create Product'}
        onClose={handleCloseModal}
      >
        <ProductForm
          initialData={editFormData}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
