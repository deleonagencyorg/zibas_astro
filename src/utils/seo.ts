export const SITE = 'https://www.zibaspapas.com';

export function canonicalPath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

const STATIC_PAIRS: Array<[string, string]> = [
  ['/es/', '/en/'],
  ['/es/contacto/', '/en/contact/'],
  ['/es/recetas/', '/en/recipes/'],
  ['/es/blog/', '/en/blog/'],
  ['/es/productos/', '/en/products/'],
  ['/es/marcas/', '/en/brands/'],
  ['/es/nosotros/', '/en/about-us/'],
  ['/es/yummiesone/', '/en/yummiesone/'],
];

export function hreflangAlternates(pathname: string): { lang: 'es' | 'en'; path: string }[] {
  const path = canonicalPath(pathname);
  const pair = STATIC_PAIRS.find(([es, en]) => path === es || path === en);
  if (pair) {
    return [
      { lang: 'es', path: pair[0] },
      { lang: 'en', path: pair[1] },
    ];
  }

  const productEs = path.match(/^\/es\/productos\/([^/]+)\/$/);
  if (productEs) {
    return [
      { lang: 'es', path },
      { lang: 'en', path: `/en/products/${productEs[1]}/` },
    ];
  }

  const productEn = path.match(/^\/en\/products\/([^/]+)\/$/);
  if (productEn) {
    return [
      { lang: 'es', path: `/es/productos/${productEn[1]}/` },
      { lang: 'en', path },
    ];
  }

  return [];
}
