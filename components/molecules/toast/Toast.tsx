import { ToastConfig } from "toastify-react-native/utils/interfaces";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { Typography } from "@/components/atoms";

import { ToastContainer } from "./Toast.style";

const toastConfig = (size: SizeType): ToastConfig => {
  return {
    success: (props) => (
      <ToastContainer size={size}>
        <Ionicons
          name="checkmark-done-outline"
          color={Colors.primary[200]}
          size={size === "Large" ? 24 : 20}
        />
        <Typography
          size={size}
          type="paragraph"
          text={props.text1 ?? ""}
          color={Colors.neutral[1000]}
          align="center"
          fontWeight="500Medium"
        />
      </ToastContainer>
    ),
    warning: (props) => (
      <ToastContainer size={size}>
        <Ionicons
          name="warning-outline"
          color={Colors.neutral[800]}
          size={size === "Large" ? 24 : 20}
        />
        <Typography
          size={size}
          type="paragraph"
          text={props.text1 ?? ""}
          color={Colors.neutral[1000]}
          align="center"
          fontWeight="500Medium"
        />
      </ToastContainer>
    ),
    error: (props) => (
      <ToastContainer size={size}>
        <Ionicons
          name="close-outline"
          color={Colors.danger[400]}
          size={size === "Large" ? 24 : 20}
        />
        <Typography
          size={size}
          type="paragraph"
          text={props.text1 ?? ""}
          color={Colors.danger[400]}
          align="center"
          fontWeight="500Medium"
        />
      </ToastContainer>
    ),
  };
};

export default toastConfig;
