import { useStore } from "zustand";

import { DownloadsHistoryStore } from "@/lib/store/downloads-history-store";

const useDownloadsHistoryStore = () => {
  return useStore(DownloadsHistoryStore);
};

export default useDownloadsHistoryStore;
