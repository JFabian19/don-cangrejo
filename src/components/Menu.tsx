import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItemCard from './MenuItemCard';
import type { MenuCategory } from '../types';
import { menuData } from '../data/menu';

interface MenuProps {
  menuData: MenuCategory[];
}

export default function Menu({ menuData: menuItems }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(menuItems[0]?.categoria || '');
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const design = menuData.diseno;

  useEffect(() => {
    if (menuItems.length === 0) return;
    if (!activeCategory && menuItems[0]) {
      setActiveCategory(menuItems[0].categoria);
    }
  }, [menuItems, activeCategory]);

  useEffect(() => {
    // ScrollSpy observer
    observerRef.current = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by how much of the element is visible
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = visibleEntries[0].target.getAttribute('data-category');
        if (mostVisible && mostVisible !== activeCategory) {
          setActiveCategory(mostVisible);
        }
      }
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    const elements = document.querySelectorAll('.category-section');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [menuItems, activeCategory]);

  // Auto-scroll the pill bar when active category changes
  useEffect(() => {
    if (categoryNavRef.current) {
      const activeBtn = categoryNavRef.current.querySelector(`button[data-active="true"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoria: string) => {
    setActiveCategory(categoria);
    const element = document.getElementById(`category-${categoria.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredMenuData = menuItems.filter(cat => cat.items.length > 0);

  // Set the dynamic columns based on design settings
  const gridClass = design.columnas_items === 1
    ? 'grid-cols-1'
    : design.columnas_items === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div 
      id="menu-section" 
      className="max-w-5xl mx-auto px-4 relative my-4"
    >
      {/* Categories Bar */}
      <div 
        ref={categoryNavRef}
        className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8 sticky top-0 z-40 pt-4 backdrop-blur-md rounded-2xl px-2 border-b"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          borderColor: 'rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
        }}
      >
        {menuItems.map((cat) => {
          const isActive = activeCategory === cat.categoria;
          
          return (
            <button
              key={cat.categoria}
              data-active={isActive}
              onClick={() => handleCategoryClick(cat.categoria)}
              className="whitespace-nowrap px-6 py-2.5 rounded-full text-sm md:text-base transition-all duration-300 font-bold border-2"
              style={{
                fontFamily: 'var(--font-titulo)',
                backgroundColor: isActive ? 'var(--color-principal)' : 'transparent',
                borderColor: isActive ? 'var(--color-principal)' : 'rgba(0, 0, 0, 0.1)',
                color: isActive ? '#FFFFFF' : 'var(--color-text-subtitulo)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {cat.categoria}
            </button>
          );
        })}
      </div>

      {/* Categories Sections */}
      <div className="space-y-16 mt-8">
        {filteredMenuData.length > 0 ? (
          filteredMenuData.map((cat) => {
            return (
              <div 
                key={cat.categoria} 
                id={`category-${cat.categoria.replace(/[^a-zA-Z0-9]/g, '-')}`}
                className="category-section scroll-mt-32 animate-fadeIn"
                data-category={cat.categoria}
              >
                {/* Header Category */}
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold drop-shadow-sm border-l-4 pl-4"
                    style={{ 
                      fontFamily: 'var(--font-titulo)', 
                      color: 'var(--color-text-titulo)',
                      borderColor: 'var(--color-secundario)'
                    }}
                  >
                    {cat.categoria}
                  </h2>
                </div>

                {/* Category Cover Image or Placeholder Banner */}
                {cat.imagen ? (
                  <div 
                    className="w-full h-44 md:h-56 mb-6 flex items-center justify-center overflow-hidden relative shadow-sm border border-white/20"
                    style={{
                      borderRadius: 'var(--radius-custom)'
                    }}
                  >
                    <img 
                      src={cat.imagen} 
                      alt={cat.categoria} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.parentElement?.classList.add('hidden');
                      }}
                    />
                  </div>
                ) : (
                  <div 
                    className="w-full h-24 md:h-32 mb-6 flex items-center justify-center border-2 border-dashed border-black/10 select-none"
                    style={{
                      borderRadius: 'var(--radius-custom)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      color: 'var(--color-text-cuerpo)',
                    }}
                  >
                    <span className="text-sm md:text-base font-bold uppercase tracking-wider opacity-60">
                      aca va imagen
                    </span>
                  </div>
                )}

                {/* Grid of items */}
                <motion.div 
                  layout
                  className={`grid ${gridClass} gap-6`}
                >
                  <AnimatePresence mode="popLayout">
                    {cat.items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuItemCard
                          item={item}
                          categoria={cat.categoria}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            No se encontraron productos.
          </div>
        )}
      </div>
    </div>
  );
}
