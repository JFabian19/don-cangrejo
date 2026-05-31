import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Footer from './components/Footer';
import OrderPanel from './components/OrderPanel';
import FloatingOrderButton from './components/FloatingOrderButton';
import { OrderProvider } from './context/OrderContext';
import { menuData } from './data/menu';
import type { MenuCategory } from './types';

function App() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    // 1. Set the menu categories
    setMenu(menuData.menu);

    // 2. Inject Google Fonts dynamically
    if (menuData.tipografia?.url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = menuData.tipografia.url;
      document.head.appendChild(link);
    }
    if (menuData.tipografia_de_titulos?.url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = menuData.tipografia_de_titulos.url;
      document.head.appendChild(link);
    }

    // 3. Inject CSS custom properties on document root
    const root = document.documentElement;
    root.style.setProperty('--color-principal', menuData.colores.principal);
    root.style.setProperty('--color-secundario', menuData.colores.secundario);
    root.style.setProperty('--color-fondo-bg', menuData.colores.fondo);
    root.style.setProperty('--color-tarjeta-bg', menuData.colores.tarjeta_bg);
    root.style.setProperty('--color-destacado', menuData.colores.destacado);

    root.style.setProperty('--font-cuerpo', `'${menuData.tipografia.fuente_cuerpo}', sans-serif`);
    root.style.setProperty('--font-titulo', `'${menuData.tipografia_de_titulos.fuente_titulo}', sans-serif`);

    root.style.setProperty('--color-text-titulo', menuData.color_de_letras.titulo);
    root.style.setProperty('--color-text-subtitulo', menuData.color_de_letras.subtitulo);
    root.style.setProperty('--color-text-cuerpo', menuData.color_de_letras.cuerpo);
    root.style.setProperty('--color-text-precio', menuData.color_de_letras.precio);

    const radiusMap: Record<string, string> = {
      'none': '0px',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px'
    };
    const roundedValue = radiusMap[menuData.diseno.redondeado] || '0.75rem';
    root.style.setProperty('--radius-custom', roundedValue);
  }, []);

  return (
    <OrderProvider>
      <div 
        className="min-h-screen relative transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-cuerpo)',
          background: menuData.tipo_de_fondo.tipo === 'degradado' 
            ? menuData.tipo_de_fondo.valor 
            : menuData.colores.fondo,
          color: 'var(--color-text-cuerpo)'
        }}
      >
        {/* Decorative pattern overlay */}
        <div 
          className="fixed inset-0 z-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(var(--color-principal) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <Hero />
          
          <main className="py-8">
            <Menu menuData={menu} />
          </main>

          <Footer />
        </div>

        {/* Floating Order Button */}
        <FloatingOrderButton onClick={() => setOrderOpen(true)} />

        {/* Order Panel */}
        <OrderPanel isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      </div>
    </OrderProvider>
  );
}

export default App;
