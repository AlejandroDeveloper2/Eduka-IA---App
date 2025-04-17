import { useEffect } from "react";
import { getLocales } from "expo-localization";

import useLangStore from "../store/useLangStore";
import { LangTag } from "@/lib/store/lang-store/Lang.store";

const useLanguageListener = () => {
  const { language, setLanguage } = useLangStore();

  useEffect(() => {
    let previousLang = language;

    const interval = setInterval(() => {
      const systemLang = getLocales()[0]?.languageCode ?? "es";

      if (
        systemLang !== previousLang &&
        ["es", "en", "pt"].includes(systemLang)
      ) {
        previousLang = systemLang as LangTag;
        setLanguage(systemLang as LangTag);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [language, setLanguage]);
};

export default useLanguageListener;
