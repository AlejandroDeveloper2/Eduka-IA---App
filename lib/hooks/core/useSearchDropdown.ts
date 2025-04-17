import { useMemo, useState } from "react";

const useSearchDropdown = <T>(options: T[], searchKey: keyof T) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredOptions: T[] = useMemo(() => {
    if (searchValue.length > 0) {
      return options.filter((item) => {
        const itemObject = Object(item);
        const itemField: string = itemObject[searchKey];

        return (
          itemField.substring(0, searchValue.length).toLowerCase() ===
          searchValue.substring(0, itemField.length).toLowerCase()
        );
      });
    }
    return options;
  }, [searchValue, options]);

  const handleSearchValue = (text: string): void => {
    setSearchValue(text);
  };

  const handleClearSearch = (): void => {
    setSearchValue("");
  };

  return {
    optionsList: filteredOptions,
    searchValue,
    handleSearchValue,
    handleClearSearch,
  };
};

export default useSearchDropdown;
