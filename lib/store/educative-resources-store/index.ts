import { create } from "zustand";

import { EducativeResourceStoreType } from "./store-type";

import { initialState } from "./state";

import { generationActions } from "./actions/generationActions";
import { managementActions } from "./actions/managementActions";
import { downloadActions } from "./actions/downloadActions";
import { uiActions } from "./actions/uiActions";

export const EducativeResourceStore = create<EducativeResourceStoreType>()(
  (...args) => ({
    ...initialState,
    ...generationActions(...args),
    ...managementActions(...args),
    ...downloadActions(...args),
    ...uiActions(...args),
  })
);
