import { memo, ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Portal } from "react-native-portalize";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { Typography } from "@/components/atoms";

import {
  CloseModalDragIndicator,
  PopUpBody,
  PopUpBox,
  PopUpOverlay,
} from "./PopUp.style";

export interface PopUpProps {
  title: string;
  size: SizeType;
  children: ReactNode | ReactNode[];
  isMounted: boolean;
  // gesture: PanGesture;
  animatedPopUpStyle: {
    transform: {
      translateY: number;
    }[];
  };
  closePopUp: () => void;
}

const PopUp = ({
  title,
  size,
  children,
  isMounted,
  animatedPopUpStyle,
  closePopUp,
}: PopUpProps): JSX.Element | null => {
  if (!isMounted) return null;

  return (
    <Portal>
      <PopUpOverlay>
        <TouchableOpacity
          style={{ ...StyleSheet.absoluteFillObject }}
          activeOpacity={1}
          onPress={closePopUp}
        />

        {/* <GestureDetector gesture={gesture}> */}
        <PopUpBox style={animatedPopUpStyle}>
          <CloseModalDragIndicator></CloseModalDragIndicator>
          <Typography
            size={size}
            type="h1"
            text={title}
            color={Colors.neutral[1000]}
            align="center"
            fontWeight="500Medium"
          />
          <PopUpBody size={size}>{children}</PopUpBody>
        </PopUpBox>
        {/* </GestureDetector> */}
      </PopUpOverlay>
    </Portal>
  );
};

function areEqual(prevProps: PopUpProps, nextProps: PopUpProps) {
  return prevProps.isMounted === nextProps.isMounted;
}

export default memo(PopUp, areEqual) as typeof PopUp;
// export default PopUp;
