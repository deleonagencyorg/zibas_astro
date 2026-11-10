type Locale = 'es' | 'en';

type ProductCopy = { title: string; description: string };

const PRODUCT_SEO: Record<string, Record<Locale, ProductCopy>> = {
  'zibas-queso': {
    es: {
      title: "Ziba's Queso | Hojuelas de papa Ziba's",
      description:
        "Ziba's Queso: hojuelas de papa fritas con sabor a queso. Conoce presentaciones, información nutricional y recetas.",
    },
    en: {
      title: "Ziba's Cheese | Ziba's Potato Chips",
      description:
        "Ziba's Cheese: fried potato chips with cheese flavor. See sizes, nutrition facts and recipes.",
    },
  },
  'zibas-clasicas': {
    es: {
      title: "Ziba's Clásicas | Hojuelas de papa Ziba's",
      description:
        "Ziba's Clásicas: hojuelas de papa fritas con el sabor original. Presentaciones, información nutricional y recetas.",
    },
    en: {
      title: "Ziba's Classic | Ziba's Potato Chips",
      description:
        "Ziba's Classic: fried potato chips with the original flavor. See sizes, nutrition facts and recipes.",
    },
  },
  'zibas-chile-toreado': {
    es: {
      title: "Ziba's Chile Toreado | Hojuelas de papa Ziba's",
      description:
        "Ziba's Chile Toreado: hojuelas de papa fritas con sabor a chile toreado. Presentaciones e información nutricional.",
    },
    en: {
      title: "Ziba's Chile Toreado | Ziba's Potato Chips",
      description:
        "Ziba's Chile Toreado: fried potato chips with chile toreado flavor. See sizes and nutrition facts.",
    },
  },
  'zibas-crema-y-especias': {
    es: {
      title: "Ziba's Crema y Especias | Hojuelas de papa Ziba's",
      description:
        "Ziba's Crema y Especias: hojuelas de papa con sabor a crema y especias. Presentaciones e información nutricional.",
    },
    en: {
      title: "Ziba's Cream and Spices | Ziba's Potato Chips",
      description:
        "Ziba's Cream and Spices: potato chips with cream and spices flavor. See sizes and nutrition facts.",
    },
  },
  'zibas-miel-mostaza': {
    es: {
      title: "Ziba's Miel Mostaza | Hojuelas de papa Ziba's",
      description:
        "Ziba's Miel Mostaza: hojuelas de papa con sabor a miel mostaza. Presentaciones e información nutricional.",
    },
    en: {
      title: "Ziba's Honey Mustard | Ziba's Potato Chips",
      description:
        "Ziba's Honey Mustard: potato chips with honey mustard flavor. See sizes and nutrition facts.",
    },
  },
};

export function getProductSeo(
  id: string,
  locale: string,
  name: string,
  description: string,
): ProductCopy {
  const lang: Locale = locale === 'en' ? 'en' : 'es';
  return (
    PRODUCT_SEO[id]?.[lang] ?? {
      title: `${name} | Ziba's`,
      description,
    }
  );
}
