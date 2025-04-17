import { useStore } from "zustand";

import { EducativeResourceStore } from "@/lib/store/educative-resources-store";

const useEducativeResourcesStore = () => {
  return useStore(EducativeResourceStore);
};

export default useEducativeResourcesStore;
