import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { useAnimatedToolBar, useEducativeResourcesStore } from "@/lib/hooks";

import { Typography } from "@/components/atoms";

import { ToolBarBox } from "./ToolBar.style";

interface ToolBarProps {
  size: SizeType;
  text: string;
}

const ToolBar = ({ size, text }: ToolBarProps): JSX.Element => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const { selectAllEducativeResource, exitSelectionMode } =
    useEducativeResourcesStore();

  const { animatedToolbarStyle } = useAnimatedToolBar();

  useEffect(() => {
    selectAllEducativeResource(selectAll);
  }, [selectAll]);

  return (
    <ToolBarBox size={size} style={animatedToolbarStyle}>
      <Ionicons
        name="close-outline"
        color={Colors.neutral[1000]}
        size={size === "Large" ? 36 : 32}
        onPress={exitSelectionMode}
      />
      <Typography
        size={size}
        type="paragraph"
        text={text}
        color={Colors.neutral[1000]}
        align="center"
        fontWeight="400Regular"
      />
      <Ionicons
        name="list-outline"
        color={selectAll ? Colors.primary[400] : Colors.neutral[1000]}
        size={size === "Large" ? 36 : 32}
        onPress={() => setSelectAll(!selectAll)}
      />
    </ToolBarBox>
  );
};

export default ToolBar;
