import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";
import { Colors } from "@/lib/constants/Colors";

import Typography from "../typography/Typography";

import { ErrorMessageContainer } from "./ErrorMessage.style";

interface ErrorMessageProps {
  message: string;
  size: SizeType;
}

const ErrorMessage = ({ message, size }: ErrorMessageProps): JSX.Element => {
  return (
    <ErrorMessageContainer>
      <Ionicons
        name="warning-outline"
        size={size === "Large" ? 24 : 20}
        color={Colors.danger[400]}
      />
      <Typography
        size={size}
        type="caption"
        text={message}
        color={Colors.danger[400]}
        align="left"
        fontWeight="300Light"
      />
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
