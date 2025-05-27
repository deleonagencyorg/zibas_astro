import { getLocale } from './i18n';
import type { Locale } from './i18n';

/**
 * Obtiene la ruta de un asset según el idioma actual
 * @param key Clave del asset en el archivo de traducción (ej: 'logo', 'hero')
 * @param locale Idioma opcional (si no se especifica, se usa el idioma actual)
 * @returns Ruta del asset
 */
export async function getAsset(key: string, locale?: Locale): Promise<string> {
  const currentLocale = locale || getLocale();
  
  try {
    // Importar dinámicamente el archivo de traducción según el idioma
    const module = await import(`../../public/locales/${currentLocale}/common.json`);
    const translations = module.default || module; // Los módulos JSON pueden tener el contenido en .default
    
    // Dividir la clave por puntos para acceder a objetos anidados
    const keys = key.split('.');
    let result = translations.assets;
    
    // Navegar por el objeto de traducciones siguiendo las claves
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Asset key not found: ${key} in ${currentLocale}/common.json`);
        return ''; // Devuelve cadena vacía si la clave no se encuentra
      }
    }
    
    if (typeof result === 'string') {
      return result;
    } else {
      console.warn(`Asset for key ${key} in ${currentLocale}/common.json is not a string:`, result);
      return ''; // Devuelve cadena vacía si el resultado no es un string
    }
  } catch (error) {
    console.error(`Error loading or processing asset for key: ${key} in ${currentLocale}/common.json`, error);
    return ''; // Devuelve cadena vacía en caso de error de carga u otro
  }
}

/**
 * Obtiene un objeto de asset completo (para elementos complejos como slides)
 * @param key Clave del asset en el archivo de traducción
 * @param locale Idioma opcional (si no se especifica, se usa el idioma actual)
 * @returns Objeto con los datos del asset
 */
export async function getAssetObject<T>(key: string, locale?: Locale): Promise<T | null> {
  const currentLocale = locale || getLocale();
  
  try {
    // Importar dinámicamente el archivo de traducción según el idioma
    const module = await import(`../../public/locales/${currentLocale}/common.json`);
    const translations = module.default || module;
    
    // Dividir la clave por puntos para acceder a objetos anidados
    const keys = key.split('.');
    let result = translations.assets;
    
    // Navegar por el objeto de traducciones siguiendo las claves
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Asset object not found: ${key} in ${currentLocale}/common.json`);
        return null; // Devuelve null si la clave no se encuentra
      }
    }
    
    return result as T; // Asume que el resultado es del tipo T esperado
  } catch (error) {
    console.error(`Error loading or processing asset object for key: ${key} in ${currentLocale}/common.json`, error);
    return null; // Devuelve null en caso de error de carga u otro
  }
}

/**
 * Obtiene un array de assets (para elementos como sliders o galerías)
 * @param key Clave del array de assets en el archivo de traducción
 * @param locale Idioma opcional (si no se especifica, se usa el idioma actual)
 * @returns Array de objetos con los datos de los assets
 */
export async function getAssetArray<T>(key: string, locale?: Locale): Promise<T[]> {
  const result = await getAssetObject<T[]>(key, locale);
  return result || [];
}

export default {
  getAsset,
  getAssetObject,
  getAssetArray
};
