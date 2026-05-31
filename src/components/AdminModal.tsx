import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { MenuItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: MenuItem | null;
  categoriaActual: string;
  categorias: string[];
  onSave: (item: MenuItem, categoria: string, oldCategoria?: string) => void;
}

export default function AdminModal({ isOpen, onClose, itemToEdit, categoriaActual, categorias, onSave }: AdminModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: categoriaActual
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        id: itemToEdit.id,
        nombre: itemToEdit.nombre,
        descripcion: itemToEdit.descripcion || '',
        precio: itemToEdit.precio.toString(),
        categoria: categoriaActual
      });
    } else {
      setFormData({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: categoriaActual
      });
    }
  }, [itemToEdit, categoriaActual, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: formData.id || Date.now().toString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio) || 0
    };
    onSave(newItem, formData.categoria, itemToEdit ? categoriaActual : undefined);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display text-gray-800">
              {itemToEdit ? 'Editar Plato' : 'Nuevo Plato'}
            </h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-label text-gray-600 mb-1">Nombre</label>
              <input
                required
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cat-clasicos"
              />
            </div>

            <div>
              <label className="block text-sm font-label text-gray-600 mb-1">Categoría</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cat-clasicos"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-label text-gray-600 mb-1">Precio (S/)</label>
              <input
                required
                type="number"
                step="0.10"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cat-clasicos"
              />
            </div>

            <div>
              <label className="block text-sm font-label text-gray-600 mb-1">Descripción (Opcional)</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cat-clasicos"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cat-especiales text-white font-bold rounded-full py-3 mt-4 hover:opacity-90 transition-opacity"
            >
              Guardar
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
