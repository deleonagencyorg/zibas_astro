import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.zibaspapas.com',
  trailingSlash: 'always',
  redirects: {
    '/': { status: 301, destination: '/es/' },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
    tailwind({
      // Configuración explícita de Tailwind
      config: { path: './tailwind.config.js' },
      // Asegurarse de que Tailwind se aplique a todos los archivos
      applyBaseStyles: true,
    }),
  ],
});