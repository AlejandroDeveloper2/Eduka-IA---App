import { create } from "zustand";

import { SizeType } from "@/lib/types";

interface ScreenSizeStoreType {
  size: SizeType;
  getScreenSize: (screenDimensions: number) => void;
}

export const ScreenSizeStore = create<ScreenSizeStoreType>((set) => ({
  size: "Small",
  getScreenSize: (screenDimensions: number): void => {
    if (screenDimensions <= 500) {
      set({ size: "Small" });
      return;
    }

    if (screenDimensions > 500) {
      set({ size: "Large" });
      return;
    }
  },
}));
