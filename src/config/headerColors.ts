export interface HeaderColorConfig {
  textColor: string;
  backgroundColor: string;
  hoverTextColor: string;
  hoverBackgroundColor: string;
  showMessageCarousel: boolean;
}

export interface HeaderColors {
  [section: string]: HeaderColorConfig;
}

// Configuración por defecto
export const defaultHeaderColors: HeaderColorConfig = {
  textColor: 'text-white',
  backgroundColor: 'bg-blue-900',
  hoverTextColor: 'hover:text-gray-300',
  hoverBackgroundColor: 'hover:bg-blue-800',
  showMessageCarousel: true,
};

// Configuración específica por sección
export const headerColors: HeaderColors = {
  // Configuración por defecto (se aplica a todas las páginas)
  default: {
    textColor: 'text-white',
    backgroundColor: 'bg-blue-900',
    hoverTextColor: 'hover:text-gray-300',
    hoverBackgroundColor: 'hover:bg-blue-800',
    showMessageCarousel: true,
  },

  // Configuración para la página de nosotros
  nosotros: {
    textColor: 'text-primary',
    backgroundColor: 'bg-white',
    hoverTextColor: 'hover:text-white',
    hoverBackgroundColor: 'hover:bg-primary',
    showMessageCarousel: true,
  },
  
  // Configuración para la página de brands
  brands: {
    textColor: 'text-primary',
    backgroundColor: 'bg-transparent',
    hoverTextColor: 'hover:text-primary',
    hoverBackgroundColor: 'hover:bg-blue-800',
    showMessageCarousel: false,
  },
  
  // Configuración para la página de blog
  blog: {
    textColor: 'text-white',
    backgroundColor: 'bg-transparent',
    hoverTextColor: 'hover:text-primary',
    hoverBackgroundColor: 'hover:bg-gray-100',
    showMessageCarousel: false,
  },
  
  // Configuración para la página de productos
  products: {
    textColor: 'text-white',
    backgroundColor: 'bg-blue-900',
    hoverTextColor: 'hover:text-gray-300',
    hoverBackgroundColor: 'hover:bg-blue-800',
    showMessageCarousel: true,
  },
  
  // Configuración para la página de recetas
  recipes: {
    textColor: 'text-white',
    backgroundColor: 'bg-green-800',
    hoverTextColor: 'hover:text-green-200',
    hoverBackgroundColor: 'hover:bg-green-700',
    showMessageCarousel: false,
  },
  
  // Configuración para la página de contacto
  contact: {
    textColor: 'text-white',
    backgroundColor: 'bg-gray-800',
    hoverTextColor: 'hover:text-gray-300',
    hoverBackgroundColor: 'hover:bg-gray-700',
    showMessageCarousel: false,
  },
  
  // Configuración para la página de noticias
  news: {
    textColor: 'text-white',
    backgroundColor: 'bg-purple-800',
    hoverTextColor: 'hover:text-purple-200',
    hoverBackgroundColor: 'hover:bg-purple-700',
    showMessageCarousel: false,
  },
  
  // Configuración para la página de inicio
  home: {
    textColor: 'text-white',
    backgroundColor: 'bg-blue-900',
    hoverTextColor: 'hover:text-gray-300',
    hoverBackgroundColor: 'hover:bg-blue-800',
    showMessageCarousel: true,
  },
};

// Función para obtener la configuración de colores basada en la ruta actual
export function getHeaderColors(pathname: string): HeaderColorConfig {
  const path = pathname.toLowerCase();
  
  // Determinar la sección basada en la ruta
  if (path.includes('/brands') || path.includes('/marcas')) {
    return headerColors.brands;
  }
  
  if (path.includes('/blog') || path.includes('/noticias')) {
    return headerColors.blog;
  }
  
  if (path.includes('/products') || path.includes('/productos')) {
    return headerColors.products;
  }
  
  if (path.includes('/recipes') || path.includes('/recetas')) {
    return headerColors.recipes;
  }
  
  if (path.includes('/contact')) {
    return headerColors.contact;
  }
  
  if (path.includes('/news')) {
    return headerColors.news;
  }
  
  // Para la página de inicio (ruta raíz)
  if (path === '/' || path === '/es' || path === '/en' || path.endsWith('/index')) {
    return headerColors.home;
  }
  
  // Si no coincide con ninguna sección específica, usar la configuración por defecto
  return headerColors.default;
} 