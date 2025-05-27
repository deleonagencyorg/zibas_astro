/**
 * Barrier para centralizar todos los assets que se utilizan en la aplicación
 * Las dimensiones y estilos se definen en los componentes donde se utilizan
 */

// Base URL del bucket de S3
const S3_BASE_URL = 'https://assets.doguiygatibienestar.com/assets';

// Interfaz básica para assets
export interface Asset {
  url: string;
  alt?: string;
}

// Interfaz para enlaces de redes sociales
export interface SocialLink {
  name: string;
  url: string;
  iconUrl: string; // Asumimos que siempre habrá un iconUrl basado en el Header
  alt?: string; // Opcional, para accesibilidad
}

// Logos
export const logos = {
  cargill: {
    url: `${S3_BASE_URL}/Cargill.webp`,
    alt: 'Cargill'
  },
  bienestar: {
    url: `${S3_BASE_URL}/logobienestar.svg`,
    alt: 'Bien Estar'
  },
  dogui: {
    url: `${S3_BASE_URL}/logoDogi.svg`,
    alt: 'Dogui'
  },
  gati: {
    url: `${S3_BASE_URL}/logoGati.svg`,
    alt: 'Gati'
  }
};

// Enlaces de Redes Sociales
// Asegúrate de que las URLs de los iconos sean correctas y existan en tu S3_BASE_URL o donde los alojes.
export const socialMediaLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/taqueritosmx/', // Reemplaza con tu URL real
    iconUrl: `${S3_BASE_URL}/icons/facebook.svg`, // Ejemplo, ajusta la ruta y el nombre del icono
    alt: 'Facebook de Taqueritos'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/taqueritosmx/', // Reemplaza con tu URL real
    iconUrl: `${S3_BASE_URL}/icons/instagram.svg`, // Ejemplo, ajusta la ruta y el nombre del icono
    alt: 'Instagram de Taqueritos'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@taqueritosmx', // Reemplaza con tu URL real
    iconUrl: `${S3_BASE_URL}/icons/tiktok.svg`, // Ejemplo, ajusta la ruta y el nombre del icono
    alt: 'TikTok de Taqueritos'
  }
  // Añade más redes si es necesario
];
