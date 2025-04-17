import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { DropdownToolsBox } from "./DropdownTools.style";

interface DropdownToolsProps<D> {
  size: SizeType;
  selectedOption: D | null;
  onClearOption: () => void;
}

function DropdownTools<D>({
  size,
  selectedOption,
  onClearOption,
}: DropdownToolsProps<D>): JSX.Element {
  return (
    <DropdownToolsBox>
      <Ionicons
        name="chevron-forward-outline"
        size={size === "Large" ? 24 : 20}
        color={Colors.neutral[700]}
      />
      {selectedOption && (
        <Ionicons
          name="close-outline"
          size={size === "Large" ? 24 : 20}
          color={Colors.neutral[700]}
          onPress={onClearOption}
        />
      )}
    </DropdownToolsBox>
  );
}

export default DropdownTools;
