// import { memo } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useAnimatedPopUp, useTranslations } from "@/lib/hooks";

import { ErrorMessage, Typography } from "@/components/atoms";
import DropdownHeader from "../dropdown-header/DropdownHeader";
import PopUp from "../pop-up/PopUp";
import DropdownOptionList from "../dropdown-option-list/DropdownOptionList";

import { DropDownContainer } from "./Dropdown.style";

interface DropdownProps<D> {
  dropdownRef: React.RefObject<View>;
  label: string;
  name: keyof D;
  size: SizeType;
  iconName: keyof typeof Ionicons.glyphMap;
  searchInputPlaceholder: string;
  defaultText: string;
  options: D[];
  optionIdKey: keyof D;
  optionValueKey: keyof D;
  selectedOption: D | null;
  disabled?: boolean;
  errorMessage?: string;
  onSelectOption: (selectedOption: D) => void;
  onClearOption: () => void;
}

function Dropdown<D>({
  dropdownRef,
  label,
  iconName,
  size,
  defaultText,
  onClearOption,
  errorMessage,
  disabled,
  selectedOption,
  optionValueKey,
  ...optionListProps
}: DropdownProps<D>): JSX.Element {
  const { t } = useTranslations();

  const {
    isPopUpVisible,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
    openPopUp,
  } = useAnimatedPopUp();

  return (
    <DropDownContainer>
      <Typography
        size={size}
        type="paragraph"
        text={label}
        color={Colors.neutral[1000]}
        align="left"
        fontWeight={"400Regular"}
      />
      <DropdownHeader<D>
        dropdownRef={dropdownRef}
        size={size}
        iconName={iconName}
        disabled={disabled}
        errorMessage={errorMessage}
        defaultText={defaultText}
        isPopUpVisible={isPopUpVisible}
        selectedOption={selectedOption}
        optionValueKey={optionValueKey}
        openPopUp={openPopUp}
        onClearOption={onClearOption}
      />
      <PopUp
        title={t("dropdown-pop-up-title")}
        size={size}
        isMounted={isMounted}
        // gesture={gesture}
        animatedPopUpStyle={animatedPopUpStyle}
        closePopUp={closePopUp}
      >
        <DropdownOptionList<D>
          {...optionListProps}
          size={size}
          optionValueKey={optionValueKey}
          selectedOption={selectedOption}
          closePopUp={closePopUp}
        />
      </PopUp>
      {errorMessage && <ErrorMessage message={errorMessage} size={size} />}
    </DropDownContainer>
  );
}

// function areEqual<D>(prevProps: DropdownProps<D>, nextProps: DropdownProps<D>) {
//   return (
//     prevProps.options === nextProps.options &&
//     prevProps.size === nextProps.size &&
//     prevProps.selectedOption === nextProps.selectedOption
//   );
// }

// export default memo(Dropdown, areEqual) as typeof Dropdown;

export default Dropdown;
