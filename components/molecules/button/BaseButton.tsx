import { ReactNode } from "react";

import { ButtonVariantType, ButtonWidthType, SizeType } from "@/lib/types";

import { useButtonState } from "@/lib/hooks";
import { ButtonStyleManager } from "@/lib/utils";

import Spinner from "../../atoms/spinner/Spinner";
import Typography from "../../atoms/typography/Typography";

import { Button } from "./Button.style";

export interface ButtonBaseProps {
  size: SizeType;
  variant: ButtonVariantType;
  width: ButtonWidthType;
  children: ReactNode | ReactNode[];
  onPress: () => void;
  messageLoading?: string;
  loading?: boolean;
  disabled?: boolean;
}

const BaseButton = ({
  children,
  loading,
  variant,
  messageLoading,
  ...props
}: ButtonBaseProps): JSX.Element => {
  const { toggleButtonState, animatedStyle } = useButtonState(
    variant,
    props.disabled
  );

  const color: string = ButtonStyleManager.getButtonTextColor(
    variant,
    props.disabled
  );

  return (
    <Button
      {...props}
      onPressIn={() => toggleButtonState("pressed")}
      onPressOut={() => toggleButtonState("default")}
      style={[ButtonStyleManager.getButtonShadow(), animatedStyle]}
    >
      {loading === true ? (
        <>
          <Spinner size={props.size} color={color} />
          {messageLoading && (
            <Typography
              size="Small"
              type="paragraph"
              text={messageLoading}
              color={color}
              align="center"
              fontWeight="700Bold"
            />
          )}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default BaseButton;
