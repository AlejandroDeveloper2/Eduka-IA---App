import { useStore } from "zustand";

import { BackgroundTaskStore } from "@/lib/store/background-task-store";

const useBackgroundTaskStore = () => {
  return useStore(BackgroundTaskStore);
};

export default useBackgroundTaskStore;
