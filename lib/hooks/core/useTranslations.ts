import { TranslateOptions } from "i18n-js";

import { i18n } from "@/lib/store/lang-store/Lang.store";
import useLangStore from "../store/useLangStore";

const useTranslations = () => {
  const t = (key: string, options?: TranslateOptions) => i18n.t(key, options);
  const { language } = useLangStore();

  return { t, language };
};
export default useTranslations;
