import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";
import { Spacing } from "@/lib/constants/Spacing";

interface PopUpBodyStyleProps {
  size: SizeType;
}

const AnimatedPopUpBox = Animated.View;

const PopUpOverlay = styled(Animated.View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const PopUpBox = styled(AnimatedPopUpBox)`
  width: 100%;
  max-height: 80%;
  /* position: absolute;
  bottom: 0; */
  background-color: ${Colors.basic.white};
  border-top-right-radius: ${Radius.radius_md}px;
  border-top-left-radius: ${Radius.radius_md}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${Spacing.spacing_md}px;
  overflow: hidden;
  padding-inline: ${Spacing.spacing_lg}px;
  padding-top: ${Spacing.spacing_md}px;
  padding-bottom: ${Spacing.spacing_md}px;
`;

const PopUpBody = styled.View<PopUpBodyStyleProps>`
  width: ${({ size }: PopUpBodyStyleProps) => (size === "Large" ? 600 : 360)}px;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  max-height: 75%;
`;

const CloseModalDragIndicator = styled.View`
  width: 220px;
  height: 10px;
  background-color: ${Colors.neutral[25]};
  border-radius: ${Radius.radius_pilled}px;
`;

export { PopUpOverlay, PopUpBox, PopUpBody, CloseModalDragIndicator };
