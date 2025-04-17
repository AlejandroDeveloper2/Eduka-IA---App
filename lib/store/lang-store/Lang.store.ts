import { create } from "zustand";
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

import english from "@/lib/lang/english.json";
import spanish from "@/lib/lang/spanish.json";
import portuguese from "@/lib/lang/portuguese.json";

export type LangTag = "es" | "en" | "pt";

interface LangStoreType {
  language: LangTag;
  setLanguage: (lang: LangTag) => void;
}

const translations = {
  en: english,
  es: spanish,
  pt: portuguese,
};

const supportedLanguages: LangTag[] = ["es", "en", "pt"];

const getDefaultLanguage = (): LangTag => {
  const locale = getLocales()[0]?.languageCode ?? "es";
  return supportedLanguages.includes(locale as LangTag)
    ? (locale as LangTag)
    : "es";
};

export const i18n = new I18n(translations);
i18n.enableFallback = true;

export const LangStore = create<LangStoreType>((set) => {
  const initialLang = getDefaultLanguage();
  i18n.locale = initialLang;

  return {
    language: initialLang,
    setLanguage: (lang) => {
      i18n.locale = lang;
      set({ language: lang });
    },
  };
});
