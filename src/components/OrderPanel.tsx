import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Send, Minus, Plus, Trash2 } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { menuData } from '../data/menu';

interface OrderPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderPanel({ isOpen, onClose }: OrderPanelProps) {
  const { items, addItem, removeItem, getTotalPrice, clearOrder } = useOrder();
  const whatsappNumber = menuData.informacion_restaurante.whatsapp || '51957279726';

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    let message = `🦀 *Pedido - ${menuData.informacion_restaurante.nombre}*\n\n`;
    
    // Group by category
    const grouped: Record<string, typeof items> = {};
    items.forEach(item => {
      if (!grouped[item.categoria]) grouped[item.categoria] = [];
      grouped[item.categoria].push(item);
    });

    Object.entries(grouped).forEach(([cat, catItems]) => {
      message += `📋 *${cat}*\n`;
      catItems.forEach(item => {
        message += `  • ${item.cantidad}x ${item.nombre} — S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
      });
      message += '\n';
    });

    message += `💰 *TOTAL: S/ ${getTotalPrice().toFixed(2)}*\n`;
    message += '\n¡Muchas gracias! 🙏';

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-sky-50 p-2.5 rounded-full" style={{ color: 'var(--color-principal)', backgroundColor: 'rgba(3, 105, 161, 0.08)' }}>
                  <ShoppingCart size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-titulo)' }}>Tu Pedido</h3>
                  <p className="text-sm text-gray-500">{items.length} producto{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-titulo)' }}>Tu pedido está vacío</p>
                  <p className="text-gray-400 text-sm mt-1">Agrega productos del menú</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border border-gray-100"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate" style={{ fontFamily: 'var(--font-titulo)' }}>{item.nombre}</p>
                        <p className="text-xs text-gray-400 font-medium">{item.categoria}</p>
                        <p className="font-bold mt-1" style={{ color: 'var(--color-text-precio)' }}>S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          {item.cantidad === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                        </button>
                        <span className="w-8 text-center font-bold text-gray-800" style={{ fontFamily: 'var(--font-titulo)' }}>{item.cantidad}</span>
                        <button
                          onClick={() => addItem(item, item.categoria)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
                          style={{ backgroundColor: 'var(--color-principal)' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-titulo)' }}>Total</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-titulo)', color: 'var(--color-text-precio)' }}>S/ {getTotalPrice().toFixed(2)}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => { clearOrder(); onClose(); }}
                    className="flex-1 py-3 rounded-xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 transition-colors"
                    style={{ fontFamily: 'var(--font-titulo)' }}
                  >
                    Vaciar
                  </button>
                  <button
                    onClick={handleSendWhatsApp}
                    className="flex-[2] py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:opacity-90"
                    style={{ 
                      fontFamily: 'var(--font-titulo)',
                      backgroundColor: 'var(--color-secundario)'
                    }}
                  >
                    <Send size={18} />
                    Enviar a WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
