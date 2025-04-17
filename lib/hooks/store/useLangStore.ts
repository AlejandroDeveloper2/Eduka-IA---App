import { useStore } from "zustand";

import { LangStore } from "@/lib/store/lang-store/Lang.store";

const useLangStore = () => {
  return useStore(LangStore);
};

export default useLangStore;
