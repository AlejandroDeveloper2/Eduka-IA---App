import styled from "styled-components/native";
import Animated from "react-native-reanimated";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";

interface ListStyleProps {
  size: SizeType;
}

const AnimatedListContainer = Animated.View;

const DropdownListContainer = styled(AnimatedListContainer)<ListStyleProps>`
  width: 100%;
  background-color: ${Colors.basic.white};
  overflow: hidden;
  border-radius: ${Radius.radius_md}px;
`;

const SearchBox = styled.View<ListStyleProps>`
  width: 100%;
  height: auto;
  padding-inline: ${({ size }: ListStyleProps) =>
    size === "Large" ? Spacing.spacing_xl : Spacing.spacing_lg}px;
  padding-top: ${({ size }: ListStyleProps) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
  padding-bottom: ${({ size }: ListStyleProps) =>
    size === "Large" ? Spacing.spacing_lg : Spacing.spacing_md}px;
  background-color: ${Colors.neutral[0]};
  justify-content: center;
  align-items: center;
`;

const OptionList = styled.FlatList<ListStyleProps>`
  width: 100%;
  flex-grow: 1;
`;

export { DropdownListContainer, SearchBox, OptionList };
