import { t, type Locale } from '../i18n/i18n';
import { type SocialLink } from '../config/assets';

// Interfaz extendida para incluir el icono SVG
export interface SocialLinkWithIcon extends SocialLink {
  icon?: string;
  iconColor?: string;
}

/**
 * Obtiene los enlaces de redes sociales desde los archivos de traducción según el idioma actual
 * @param locale Idioma actual
 * @param iconColor Color opcional para los iconos SVG (ej: 'white', '#ffffff')
 * @returns Array de enlaces de redes sociales con iconos SVG
 */
export function getSocialMediaLinks(locale: Locale, iconColor: string = 'currentColor'): SocialLinkWithIcon[] {
  const socialMedia = t('social_media', { namespace: 'common', locale });
  
  if (!socialMedia) {
    return [];
  }
  
  // Convertir el objeto de traducciones en un array de SocialLinkWithIcon
  const links = Object.values(socialMedia) as SocialLinkWithIcon[];
  
  // Asignar el color a los iconos SVG si se proporciona
  if (iconColor !== 'currentColor') {
    links.forEach(link => {
      if (link.icon) {
        // Reemplazar el valor de fill en el SVG
        link.icon = link.icon.replace('fill=\'currentColor\'', `fill='${iconColor}'`);
        link.iconColor = iconColor;
      }
    });
  }
  
  return links;
}
