// src/contexts/all_translations.js

import { navbarTranslations } from "@/datalang/navbar";
import { aboutTranslations } from "@/datalang/about";
import { bookTranslations } from "@/datalang/booktranslations";
import { heropartoneTranslations } from "@/datalang/heropartone";
import { academicBooksTranslations } from "@/datalang/academic_books_translations";
import { comicTranslations } from "@/datalang/comictranslations";
import { categoryTranslations } from "@/datalang/categorytranslations";
import { explorepageTranslations } from "@/datalang/explorepagetranslations";
import { footerTranslations } from "@/datalang/footer";
import authorsTranslations from "@/datalang/authors_translations";
import { publicationsTranslations } from "@/datalang/publications_translations";

// Merge all translations for all 20 languages
export const allTranslations = {
  en: { 
    ...navbarTranslations.en, 
    ...aboutTranslations.en,
    ...bookTranslations.en,
    ...heropartoneTranslations.en,
    ...academicBooksTranslations.en,
    ...comicTranslations.en,
    ...categoryTranslations.en,
    ...explorepageTranslations.en,
    ...footerTranslations.en,
    ...authorsTranslations.en,
    ...publicationsTranslations.en
  },
  hi: { 
    ...navbarTranslations.hi, 
    ...aboutTranslations.hi,
    ...bookTranslations.hi,
    ...heropartoneTranslations.hi,
    ...academicBooksTranslations.hi,
    ...comicTranslations.hi,
    ...categoryTranslations.hi,
    ...explorepageTranslations.hi,
    ...footerTranslations.hi,
    ...authorsTranslations.hi,
    ...publicationsTranslations.hi
  },
  ur: { 
    ...navbarTranslations.ur, 
    ...aboutTranslations.ur,
    ...bookTranslations.ur,
    ...heropartoneTranslations.ur,
    ...academicBooksTranslations.ur,
    ...comicTranslations.ur,
    ...categoryTranslations.ur,
    ...explorepageTranslations.ur,
    ...footerTranslations.ur,
    ...authorsTranslations.ur,
    ...publicationsTranslations.ur
  },
  ar: { 
    ...navbarTranslations.ar, 
    ...aboutTranslations.ar,
    ...bookTranslations.ar,
    ...heropartoneTranslations.ar,
    ...academicBooksTranslations.ar,
    ...comicTranslations.ar,
    ...categoryTranslations.ar,
    ...explorepageTranslations.ar,
    ...footerTranslations.ar,
    ...authorsTranslations.ar,
    ...publicationsTranslations.ar
  },
  bn: { 
    ...navbarTranslations.bn, 
    ...aboutTranslations.bn,
    ...bookTranslations.bn,
    ...heropartoneTranslations.bn,
    ...academicBooksTranslations.bn,
    ...comicTranslations.bn,
    ...categoryTranslations.bn,
    ...explorepageTranslations.bn,
    ...footerTranslations.bn,
    ...authorsTranslations.bn,
    ...publicationsTranslations.bn
  },
  mr: { 
    ...navbarTranslations.mr, 
    ...aboutTranslations.mr,
    ...bookTranslations.mr,
    ...heropartoneTranslations.mr,
    ...academicBooksTranslations.mr,
    ...comicTranslations.mr,
    ...categoryTranslations.mr,
    ...explorepageTranslations.mr,
    ...footerTranslations.mr,
    ...authorsTranslations.mr,
    ...publicationsTranslations.mr
  },
  ta: { 
    ...navbarTranslations.ta, 
    ...aboutTranslations.ta,
    ...bookTranslations.ta,
    ...heropartoneTranslations.ta,
    ...academicBooksTranslations.ta,
    ...comicTranslations.ta,
    ...categoryTranslations.ta,
    ...explorepageTranslations.ta,
    ...footerTranslations.ta,
    ...authorsTranslations.ta,
    ...publicationsTranslations.ta
  },
  kn: { 
    ...navbarTranslations.kn, 
    ...aboutTranslations.kn,
    ...bookTranslations.kn,
    ...heropartoneTranslations.kn,
    ...academicBooksTranslations.kn,
    ...comicTranslations.kn,
    ...categoryTranslations.kn,
    ...explorepageTranslations.kn,
    ...footerTranslations.kn,
    ...authorsTranslations.kn,
    ...publicationsTranslations.kn
  },
  te: { 
    ...navbarTranslations.te, 
    ...aboutTranslations.te,
    ...bookTranslations.te,
    ...heropartoneTranslations.te,
    ...academicBooksTranslations.te,
    ...comicTranslations.te,
    ...categoryTranslations.te,
    ...explorepageTranslations.te,
    ...footerTranslations.te,
    ...authorsTranslations.te,
    ...publicationsTranslations.te
  },
  ml: { 
    ...navbarTranslations.ml, 
    ...aboutTranslations.ml,
    ...bookTranslations.ml,
    ...heropartoneTranslations.ml,
    ...academicBooksTranslations.ml,
    ...comicTranslations.ml,
    ...categoryTranslations.ml,
    ...explorepageTranslations.ml,
    ...footerTranslations.ml,
    ...authorsTranslations.ml,
    ...publicationsTranslations.ml
  },
  es: { 
    ...navbarTranslations.es, 
    ...aboutTranslations.es,
    ...bookTranslations.es,
    ...heropartoneTranslations.es,
    ...academicBooksTranslations.es,
    ...comicTranslations.es,
    ...categoryTranslations.es,
    ...explorepageTranslations.es,
    ...footerTranslations.es,
    ...authorsTranslations.es,
    ...publicationsTranslations.es
  },
  ps: { 
    ...navbarTranslations.ps, 
    ...aboutTranslations.ps,
    ...bookTranslations.ps,
    ...heropartoneTranslations.ps,
    ...academicBooksTranslations.ps,
    ...comicTranslations.ps,
    ...categoryTranslations.ps,
    ...explorepageTranslations.ps,
    ...footerTranslations.ps,
    ...authorsTranslations.ps,
    ...publicationsTranslations.ps
  },
  zh: { 
    ...navbarTranslations.zh, 
    ...aboutTranslations.zh,
    ...bookTranslations.zh,
    ...heropartoneTranslations.zh,
    ...academicBooksTranslations.zh,
    ...comicTranslations.zh,
    ...categoryTranslations.zh,
    ...explorepageTranslations.zh,
    ...footerTranslations.zh,
    ...authorsTranslations.zh,
    ...publicationsTranslations.zh
  },
  fr: { 
    ...navbarTranslations.fr, 
    ...aboutTranslations.fr,
    ...bookTranslations.fr,
    ...heropartoneTranslations.fr,
    ...academicBooksTranslations.fr,
    ...comicTranslations.fr,
    ...categoryTranslations.fr,
    ...explorepageTranslations.fr,
    ...footerTranslations.fr,
    ...authorsTranslations.fr,
    ...publicationsTranslations.fr
  },
  de: { 
    ...navbarTranslations.de, 
    ...aboutTranslations.de,
    ...bookTranslations.de,
    ...heropartoneTranslations.de,
    ...academicBooksTranslations.de,
    ...comicTranslations.de,
    ...categoryTranslations.de,
    ...explorepageTranslations.de,
    ...footerTranslations.de,
    ...authorsTranslations.de,
    ...publicationsTranslations.de
  },
  it: { 
    ...navbarTranslations.it, 
    ...aboutTranslations.it,
    ...bookTranslations.it,
    ...heropartoneTranslations.it,
    ...academicBooksTranslations.it,
    ...comicTranslations.it,
    ...categoryTranslations.it,
    ...explorepageTranslations.it,
    ...footerTranslations.it,
    ...authorsTranslations.it,
    ...publicationsTranslations.it
  },
  ja: { 
    ...navbarTranslations.ja, 
    ...aboutTranslations.ja,
    ...bookTranslations.ja,
    ...heropartoneTranslations.ja,
    ...academicBooksTranslations.ja,
    ...comicTranslations.ja,
    ...categoryTranslations.ja,
    ...explorepageTranslations.ja,
    ...footerTranslations.ja,
    ...authorsTranslations.ja,
    ...publicationsTranslations.ja
  },
  ko: { 
    ...navbarTranslations.ko, 
    ...aboutTranslations.ko,
    ...bookTranslations.ko,
    ...heropartoneTranslations.ko,
    ...academicBooksTranslations.ko,
    ...comicTranslations.ko,
    ...categoryTranslations.ko,
    ...explorepageTranslations.ko,
    ...footerTranslations.ko,
    ...authorsTranslations.ko,
    ...publicationsTranslations.ko
  },
  fa: { 
    ...navbarTranslations.fa, 
    ...aboutTranslations.fa,
    ...bookTranslations.fa,
    ...heropartoneTranslations.fa,
    ...academicBooksTranslations.fa,
    ...comicTranslations.fa,
    ...categoryTranslations.fa,
    ...explorepageTranslations.fa,
    ...footerTranslations.fa,
    ...authorsTranslations.fa,
    ...publicationsTranslations.fa
  },
  ru: { 
    ...navbarTranslations.ru, 
    ...aboutTranslations.ru,
    ...bookTranslations.ru,
    ...heropartoneTranslations.ru,
    ...academicBooksTranslations.ru,
    ...comicTranslations.ru,
    ...categoryTranslations.ru,
    ...explorepageTranslations.ru,
    ...footerTranslations.ru,
    ...authorsTranslations.ru,
    ...publicationsTranslations.ru
  }
};

// Helper function to get translations by language code
export const getTranslationsByLanguage = (languageCode = 'en') => {
  return allTranslations[languageCode] || allTranslations.en;
};

// List of available languages
export const availableLanguages = Object.keys(allTranslations);

// RTL languages list
export const rtlLanguages = ["ur", "ar", "fa", "ps"];

// Default export
export default allTranslations;