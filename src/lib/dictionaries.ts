import 'server-only';

const dictionaries: { [locale: string]: () => Promise<any> } = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  nl: () => import('@/dictionaries/nl.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    if (dictionaries[locale]) {
        return dictionaries[locale]();
    }
    // Fallback to English if the locale is not found
    return dictionaries.en();
};