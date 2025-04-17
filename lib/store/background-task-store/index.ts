import { create } from "zustand";

import { BackgroundTaskStoreType } from "./store-type";

import { initialState } from "./state";
import { createActions } from "./actions";

export const BackgroundTaskStore = create<BackgroundTaskStoreType>()(
  (...args) => ({
    ...initialState,
    ...createActions(...args),
  })
);
