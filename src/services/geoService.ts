import geoip from 'geoip-lite';
import { setLocale, getLocale, type Locale } from '../i18n/i18n';

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

/**
 * Detecta el país del usuario basado en su dirección IP
 * @param ip Dirección IP del usuario
 * @returns Código ISO del país o null si no se puede detectar
 */
export function detectCountry(ip: string): string | null {
  try {
    const geo = geoip.lookup(ip);
    return geo?.country || null;
  } catch (error) {
    console.error('Error al detectar el país:', error);
    return null;
  }
}

/**
 * Determina el idioma predeterminado basado en el país
 * @param countryCode Código ISO del país
 * @returns Idioma predeterminado ('en' o 'es')
 */
export function getDefaultLocaleByCountry(countryCode: string | null): Locale {
  if (!countryCode) return 'es'; // Valor predeterminado si no se detecta el país
  
  if (ENGLISH_SPEAKING_COUNTRIES.includes(countryCode)) {
    return 'en';
  }
  
  if (SPANISH_SPEAKING_COUNTRIES.includes(countryCode)) {
    return 'es';
  }
  
  // Para otros países, usar español como predeterminado
  return 'es';
}

/**
 * Establece el idioma predeterminado basado en la IP del usuario
 * @param ip Dirección IP del usuario
 * @returns El idioma establecido
 */
export function setLocaleByIp(ip: string): Locale {
  // Si ya hay un idioma establecido en localStorage, respetarlo
  const currentLocale = getLocale();
  if (currentLocale) return currentLocale;
  
  const countryCode = detectCountry(ip);
  const defaultLocale = getDefaultLocaleByCountry(countryCode);
  
  setLocale(defaultLocale);
  return defaultLocale;
}
