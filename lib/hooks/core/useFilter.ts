import { useState } from "react";

import { FilterOptionKey } from "@/lib/types/dataTypes";

const useFilter = (defaultFilter: FilterOptionKey) => {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOptionKey>(defaultFilter);

  const onSelectFilter = (filter: FilterOptionKey): void => {
    setSelectedFilter(filter);
  };

  return {
    selectedFilter,
    onSelectFilter,
  };
};

export default useFilter;
