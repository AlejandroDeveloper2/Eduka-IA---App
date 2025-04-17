import { create } from "zustand";

import { DownloadsHistoryStoreType } from "./store-type";

import { initialState } from "./state";
import { createActions } from "./actions";

export const DownloadsHistoryStore = create<DownloadsHistoryStoreType>()(
  (...args) => ({
    ...initialState,
    ...createActions(...args),
  })
);
