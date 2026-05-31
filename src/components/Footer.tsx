import { motion } from 'framer-motion';
import { Smartphone, Copy, Check, MapPin } from 'lucide-react';
import { useState } from 'react';
import { menuData } from '../data/menu';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const { nombre, telefonos, direccion, notas_contacto } = menuData.informacion_restaurante;
  const mainPhone = telefonos[0] || "957 279 726";

  const handleCopy = () => {
    navigator.clipboard.writeText(mainPhone.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full text-white py-12 px-4 mt-20" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Address Section */}
        {direccion && (
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-white/10 p-3 rounded-full mb-4">
              <MapPin size={24} style={{ color: 'var(--color-secundario)' }} />
            </div>
            <p className="text-lg md:text-xl font-medium max-w-md" style={{ fontFamily: 'var(--font-titulo)' }}>
              {direccion}
            </p>
            {notas_contacto && (
              <p className="text-xs text-gray-400 mt-2 font-medium">
                {notas_contacto}
              </p>
            )}
          </div>
        )}

        {/* Payment Methods Section */}
        <div className="w-full max-w-md bg-white/5 rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Smartphone size={26} style={{ color: 'var(--color-secundario)' }} />
            <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-titulo)', color: 'var(--color-secundario)' }}>
              Método de Pago
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Visa */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-center h-16 shadow-md border border-white/20 overflow-hidden">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiM94VhYmT8xU6PmAKaXJr9WySnjARL7CyGA&s" 
                alt="Visa" 
                className="h-8 w-auto object-contain"
              />
            </div>
            {/* Mastercard */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-center h-16 shadow-md border border-white/20">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-8 w-auto object-contain"
              />
            </div>
            {/* Plin */}
            <div className="bg-white rounded-2xl p-2 flex items-center justify-center h-16 shadow-md border border-white/20">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe960jSnK_C4yhuRAy0anRYG9ejHgcuf39-A&s" 
                alt="Plin" 
                className="h-10 w-auto object-contain"
              />
            </div>
            {/* Yape */}
            <div className="bg-white rounded-2xl p-2 flex items-center justify-center h-16 shadow-md border border-white/20">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Icono_de_la_aplicaci%C3%B3n_Yape.png" 
                alt="Yape" 
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
            className="w-full text-white py-3.5 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg group relative overflow-hidden font-bold"
            style={{ backgroundColor: 'var(--color-principal)' }}
          >
            {copied ? (
              <Check size={20} className="text-green-400" />
            ) : (
              <Copy size={20} className="group-hover:scale-105 transition-transform" />
            )}
            <span className="text-lg md:text-xl tracking-wider" style={{ fontFamily: 'var(--font-titulo)' }}>
              {mainPhone}
            </span>
          </motion.button>

          <p className="text-center mt-4 text-xs text-gray-400">
            A nombre de: {nombre}
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 w-full text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} {nombre}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
