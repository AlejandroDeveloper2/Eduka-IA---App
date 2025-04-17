import { useRef } from "react";
import { TextInput } from "react-native";

import { SizeType } from "@/lib/types";

import { ButtonStyleManager } from "@/lib/utils";
import { useSearchDropdown } from "@/lib/hooks";

import { DropdownOption, InputText } from "@/components/molecules";

import {
  DropdownListContainer,
  OptionList,
  SearchBox,
} from "./DropdownOptionList.style";

interface DropdownOptionListProps<D> {
  name: keyof D;
  size: SizeType;
  options: D[];
  optionValueKey: keyof D;
  selectedOption: D | null;
  optionIdKey: keyof D;
  searchInputPlaceholder: string;
  onSelectOption: (option: D) => void;
  closePopUp: () => void;
}

function DropdownOptionList<D>({
  name,
  size,
  options,
  optionValueKey,
  optionIdKey,
  searchInputPlaceholder,
  selectedOption,
  onSelectOption,
  closePopUp,
}: DropdownOptionListProps<D>): JSX.Element {
  const inputRef = useRef<TextInput>(null);

  const { optionsList, searchValue, handleSearchValue, handleClearSearch } =
    useSearchDropdown(options, optionValueKey);

  return (
    <DropdownListContainer
      size={size}
      style={ButtonStyleManager.getButtonShadow()}
    >
      <SearchBox size={size}>
        <InputText<D>
          inputRef={inputRef}
          placeholder={searchInputPlaceholder}
          name={name}
          value={searchValue}
          size={size}
          iconName="search-outline"
          keyboardType="default"
          onChange={(name, text) => handleSearchValue(text as string)}
          onClearInput={handleClearSearch}
        />
      </SearchBox>
      <OptionList
        size={size}
        keyboardShouldPersistTaps="handled"
        data={optionsList}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderItem={(item) => (
          <DropdownOption<D>
            size={size}
            optionData={item.item as D}
            optionValueKey={optionValueKey}
            active={
              Object(selectedOption)[optionIdKey] ===
              Object(item.item)[optionIdKey]
            }
            onSelectOption={onSelectOption}
            toggleDeployOptions={closePopUp}
          />
        )}
        keyExtractor={(item) => Object(item)[optionIdKey] as string}
      />
    </DropdownListContainer>
  );
}

export default DropdownOptionList;
