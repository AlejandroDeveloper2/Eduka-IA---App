import { useStore } from "zustand";

import { ScreenSizeStore } from "@/lib/store/screen-size-store/ScreenSize.store";

const useScreenSizeStore = () => {
  return useStore(ScreenSizeStore);
};

export default useScreenSizeStore;
