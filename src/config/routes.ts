// src/config/routes.ts
export interface RouteConfig {
  id: string; // Identificador único para la ruta (ej: 'home', 'contact')
  slugs: { [key: string]: string }; // Mapeo de idioma a slug (ej: { es: 'contacto', en: 'contact' })
  contentComponent: string; // Ruta al componente Astro que renderiza el contenido (ej: '@/components/pages/ContactPage.astro')
  metaTitleKey?: string; // Clave para el título en common.json (ej: 'meta.contact.title')
  metaDescriptionKey?: string; // Clave para la descripción en common.json
}

export const routesConfig: RouteConfig[] = [
  {
    id: 'home',
    slugs: { es: '', en: '' }, // Slug vacío para la página de inicio base del idioma
    contentComponent: '@/components/pages/HomePage.astro',
    metaTitleKey: 'meta.home.title',
    metaDescriptionKey: 'meta.home.description',
  },
  {
    id: 'contact',
    slugs: { es: 'contacto', en: 'contact' },
    contentComponent: '@/components/pages/ContactPage.astro',
    metaTitleKey: 'meta.contact.title',
    metaDescriptionKey: 'meta.contact.description',
  },
  // ... Agrega más rutas aquí
];

// Función helper para obtener una ruta por ID
export function getRouteById(id: string): RouteConfig | undefined {
  return routesConfig.find(route => route.id === id);
}

// Función helper para encontrar una ruta por slug y lang
export function findRouteBySlug(lang: string, slug: string): RouteConfig | undefined {
  return routesConfig.find(route => route.slugs[lang] === slug);
}
