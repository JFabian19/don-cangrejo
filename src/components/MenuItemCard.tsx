import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';
import { menuData } from '../data/menu';

interface MenuItemCardProps {
  item: MenuItem;
  categoria: string;
}

export default function MenuItemCard({ item, categoria }: MenuItemCardProps) {
  const { addItem, removeItem, getItemQuantity } = useOrder();
  const qty = getItemQuantity(item.id);
  const design = menuData.diseno;

  // Build card dynamic classes
  const cardShadow = design.con_sombra ? 'shadow-sm hover:shadow-md' : 'shadow-none';
  const cardBorder = design.con_borde ? 'border border-black/5' : 'border-none';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        backgroundColor: 'var(--color-tarjeta-bg)',
        borderRadius: 'var(--radius-custom)',
        ...((design.con_borde && !design.con_sombra) ? { border: '1px solid rgba(0, 0, 0, 0.08)' } : {})
      }}
      className={`${cardShadow} ${cardBorder} p-5 transition-all relative flex flex-col justify-between h-full`}
    >
      <div>
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 
            className="text-lg md:text-xl font-bold leading-tight"
            style={{ 
              fontFamily: 'var(--font-titulo)',
              color: 'var(--color-text-subtitulo)'
            }}
          >
            {item.nombre}
          </h3>
          <span 
            className="font-bold text-lg whitespace-nowrap"
            style={{ 
              fontFamily: 'var(--font-titulo)',
              color: 'var(--color-text-precio)'
            }}
          >
            S/ {item.precio.toFixed(2)}
          </span>
        </div>
        
        {item.descripcion && (
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-cuerpo)' }}
          >
            {item.descripcion}
          </p>
        )}
      </div>

      {/* Add to order controls */}
      <div className="flex items-center justify-end mt-4 gap-2">
        {qty > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => removeItem(item.id)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-90 bg-red-50 text-red-500 hover:bg-red-100"
            >
              <Minus size={16} />
            </button>
            <motion.span
              key={qty}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="w-6 text-center font-bold"
              style={{ color: 'var(--color-text-subtitulo)', fontFamily: 'var(--font-titulo)' }}
            >
              {qty}
            </motion.span>
          </motion.div>
        )}
        <button
          onClick={() => addItem(item, categoria)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-sm text-white"
          style={{
            backgroundColor: qty > 0 ? 'var(--color-principal)' : 'var(--color-secundario)',
          }}
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
}
