import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { menuData } from '../data/menu';

export default function Hero() {
  const { nombre, descripcion, telefonos, whatsapp, redes_sociales } = menuData.informacion_restaurante;
  const mainPhone = telefonos[0] || whatsapp;

  return (
    <div 
      className="relative w-full h-[45vh] min-h-[380px] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, var(--color-principal) 0%, rgba(2, 132, 199, 0.1) 100%)`
      }}
    >
      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden leading-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px]">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,130.42,190.26,120,240.21,111.36,281.33,70.52,321.39,56.44Z" 
            style={{ fill: menuData.tipo_de_fondo.tipo === 'degradado' ? '#F0F9FF' : 'var(--color-brand-bg)' }}
          ></path>
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center px-4"
      >
        {/* Logo Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-white shadow-xl mb-4 border-4 overflow-hidden"
          style={{ borderColor: 'var(--color-secundario)' }}
        >
          <img
            src="/logo.jpeg"
            alt={nombre}
            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full"
            onError={(e) => {
              // Fallback if logo.jpeg doesn't load yet
              e.currentTarget.src = "/logo.png";
              e.currentTarget.onerror = () => {
                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/1041/1041935.png";
              };
            }}
          />
        </motion.div>

        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-2 drop-shadow-sm"
          style={{ color: 'var(--color-text-titulo)', fontFamily: 'var(--font-titulo)' }}
        >
          {nombre}
        </h1>

        <p 
          className="text-sm md:text-base max-w-lg text-center mb-6 font-medium"
          style={{ color: 'var(--color-text-subtitulo)' }}
        >
          {descripcion}
        </p>

        {/* Social and Info Section */}
        <div className="flex gap-4">
          {whatsapp && (
            <a 
              href={`https://wa.me/${whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white p-3 rounded-full text-[#25D366] shadow-md hover:shadow-lg transition-all hover:scale-110"
              title="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.004 2C6.48 2 2.004 6.477 2.004 12c0 1.765.46 3.423 1.257 4.876L2 22l5.25-1.378A9.954 9.954 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.333a8.306 8.306 0 0 1-4.237-1.153l-.303-.18-3.146.825.839-3.068-.198-.314a8.306 8.306 0 0 1-1.286-4.443c0-4.595 3.738-8.333 8.333-8.333 4.595 0 8.333 3.738 8.333 8.333 0 4.595-3.738 8.333-8.333 8.333zm4.576-6.233c-.25-.125-1.477-.729-1.706-.813-.229-.083-.396-.125-.563.125-.166.25-.646.813-.792.979-.146.167-.292.188-.542.063-.25-.125-1.057-.39-2.012-1.242-.744-.663-1.245-1.48-1.391-1.73-.146-.25-.016-.385.109-.51.113-.113.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.771-1.854-.203-.489-.408-.423-.563-.43-.145-.007-.312-.007-.479-.007-.167 0-.438.062-.667.312-.229.25-.875.854-.875 2.083 0 1.229.896 2.417.99 2.542.094.125 1.76 2.687 4.26 3.77 2.5 1.084 2.5 1.375 2.959 1.334.458-.041 1.479-.604 1.688-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.166-.479-.291z"/>
              </svg>
            </a>
          )}
          {mainPhone && (
            <a 
              href={`tel:${mainPhone.replace(/\s/g, '')}`} 
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              style={{ color: 'var(--color-principal)' }}
              title="Llamar"
            >
              <Phone size={24} />
            </a>
          )}
          {redes_sociales?.maps && (
            <a 
              href={redes_sociales.maps} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              title="Ubicación"
            >
              <MapPin size={24} className="text-red-500" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
