import { createContext, useContext, useState, useCallback } from 'react';
import type { MenuItem } from '../types';

export interface OrderItem extends MenuItem {
  cantidad: number;
  categoria: string;
}

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: MenuItem, categoria: string) => void;
  removeItem: (itemId: string) => void;
  getItemQuantity: (itemId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = useCallback((item: MenuItem, categoria: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...item, cantidad: 1, categoria }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (!existing) return prev;
      if (existing.cantidad <= 1) {
        return prev.filter(i => i.id !== itemId);
      }
      return prev.map(i =>
        i.id === itemId ? { ...i, cantidad: i.cantidad - 1 } : i
      );
    });
  }, []);

  const getItemQuantity = useCallback((itemId: string) => {
    return items.find(i => i.id === itemId)?.cantidad || 0;
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, i) => sum + i.cantidad, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }, [items]);

  const clearOrder = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <OrderContext.Provider value={{ items, addItem, removeItem, getItemQuantity, getTotalItems, getTotalPrice, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}
