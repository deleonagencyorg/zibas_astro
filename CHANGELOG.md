# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2025-05-27

### Añadido

#### Sistema de Internacionalización (i18n)

- Sistema personalizado de i18n con soporte para español (Honduras) e inglés
- Archivos de traducción en formato JSON en `/public/locales/`
- Componente `LanguageSwitcher` con banderas de países (🇭🇳 para español, 🇺🇸 para inglés)
- Detección automática de idioma basada en geolocalización por IP usando `geoip-lite`
- Redirección inteligente que mantiene la ruta actual al cambiar de idioma
- Soporte para metadatos multilingües (títulos, descripciones, etc.)
- Soporte para assets multilingües (imágenes específicas por idioma)

#### Efectos Parallax y Animaciones

- Integración de `rellax.js` para efectos parallax
- Integración de `simple-parallax-js` para efectos parallax en imágenes
- Integración de `scrollreveal` para animaciones de aparición al hacer scroll
- Componentes reutilizables:
  - `RellaxParallax.astro`: Para elementos con efecto parallax
  - `SimpleParallax.astro`: Para imágenes con efecto parallax
  - `ParallaxSection.astro`: Para secciones completas con fondo parallax
  - `ScrollReveal.astro`: Para animaciones de aparición al hacer scroll
- Página de demostración en `/es/parallax-demo` y `/en/parallax-demo`

#### Integración con Tailwind CSS

- Configuración completa de Tailwind CSS
- Personalización de fuentes (`FontdinerSwanky` para títulos y `Roboto` para texto)
- Clases personalizadas para tipografía (`font-title`, `font-sans`)
- Diseño responsive para móviles y escritorio

#### Componentes de UI

- Header con menú responsive y selector de idioma
- Footer con enlaces y redes sociales
- Componente `FormContainer` para formularios con estilo consistente

#### Integración con Strapi CMS

- Configuración de endpoints para autenticación y contenido
- Adaptadores de respuesta para transformación de datos
- Formularios de login, registro y recuperación de contraseña

#### Analítica y Seguimiento

- Integración con Google Tag Manager
- Seguimiento automático de páginas vistas
- Seguimiento de eventos de usuario (clics, envíos de formulario)
- Gestión de consentimiento de cookies

### Mejorado
- Estructura de archivos organizada por funcionalidad
- Rendimiento optimizado con carga diferida de scripts
- Experiencia de usuario mejorada con animaciones y transiciones
- SEO optimizado con metadatos dinámicos por idioma
- Accesibilidad mejorada con textos alternativos y etiquetas semánticas
