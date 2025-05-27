import type { APIRoute } from 'astro';
import geoip from 'geoip-lite';

// Lista de países de habla inglesa (códigos ISO)
const ENGLISH_SPEAKING_COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'JM', 'BZ', 'BS', 
  'BB', 'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'TT', 'GY'
];

// Lista de países de habla hispana (códigos ISO)
const SPANISH_SPEAKING_COUNTRIES = [
  'HN', 'ES', 'MX', 'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 
  'EC', 'SV', 'GT', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'
];

export const get: APIRoute = async ({ request }) => {
  try {
    // Obtener la IP del cliente desde las cabeceras
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('cf-connecting-ip') || '127.0.0.1';
    
    // Detectar el país usando geoip-lite
    const geo = geoip.lookup(ip);
    const countryCode = geo?.country || null;
    
    // Determinar el idioma predeterminado basado en el país
    let defaultLocale = 'es'; // Valor predeterminado
    
    if (countryCode && ENGLISH_SPEAKING_COUNTRIES.includes(countryCode)) {
      defaultLocale = 'en';
    } else if (countryCode && SPANISH_SPEAKING_COUNTRIES.includes(countryCode)) {
      defaultLocale = 'es';
    }
    
    // Devolver el resultado como JSON
    return new Response(JSON.stringify({
      ip,
      country: countryCode,
      defaultLocale
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al detectar la localización:', error);
    return new Response(JSON.stringify({
      error: 'Error al detectar la localización',
      defaultLocale: 'es' // Valor predeterminado en caso de error
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
