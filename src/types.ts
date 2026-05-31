export interface MenuItem {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
}

export interface MenuCategory {
  categoria: string;
  imagen?: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  nombre: string;
  descripcion: string;
  telefonos: string[];
  whatsapp: string;
  direccion: string;
  redes_sociales: {
    facebook: string;
    instagram: string;
    tiktok: string;
    maps: string;
  };
  notas_contacto: string;
}

export interface DesignConfig {
  estilo_layout: string;
  columnas_items: number;
  redondeado: string;
  con_borde: boolean;
  con_sombra: boolean;
}

export interface ColorPalette {
  principal: string;
  secundario: string;
  fondo: string;
  tarjeta_bg: string;
  destacado: string;
}

export interface BackgroundConfig {
  tipo: string;
  valor: string;
}

export interface FontConfig {
  fuente_cuerpo: string;
  url: string;
}

export interface TitleFontConfig {
  fuente_titulo: string;
  url: string;
}

export interface LetterColors {
  titulo: string;
  subtitulo: string;
  cuerpo: string;
  precio: string;
}

export interface MenuData {
  informacion_restaurante: RestaurantInfo;
  diseno: DesignConfig;
  colores: ColorPalette;
  tipo_de_fondo: BackgroundConfig;
  tipografia: FontConfig;
  color_de_letras: LetterColors;
  tipografia_de_titulos: TitleFontConfig;
  menu: MenuCategory[];
}
