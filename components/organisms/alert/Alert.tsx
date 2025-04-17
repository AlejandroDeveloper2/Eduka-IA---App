import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/lib/constants/Colors";
import { SizeType } from "@/lib/types";

import { useTranslations } from "@/lib/hooks";

import { Typography } from "@/components/atoms";
import { ButtonWithLabel } from "@/components/molecules";

import {
  AlertBody,
  AlertContainer,
  AlertControl,
  AlertControls,
} from "./Alert.style";

interface AlertProps {
  message: string;
  acceptBtnText: string;
  size: SizeType;
  iconName: keyof typeof Ionicons.glyphMap;
  isLoading: boolean;
  closePopUp: () => void;
  onAcceptAction: () => void;
}

const Alert = ({
  message,
  acceptBtnText,
  size,
  iconName,
  isLoading,
  closePopUp,
  onAcceptAction,
}: AlertProps): JSX.Element => {
  const { t } = useTranslations();

  return (
    <AlertContainer>
      <AlertBody>
        <Ionicons
          name="warning-outline"
          size={size === "Large" ? 36 : 32}
          color={Colors.neutral[500]}
        />
        <Typography
          size={size}
          type="paragraph"
          text={message}
          color={Colors.neutral[900]}
          align="center"
          fontWeight="400Regular"
        />
      </AlertBody>
      <AlertControls>
        <AlertControl>
          <ButtonWithLabel
            label={acceptBtnText}
            iconName={iconName}
            size={size}
            onPress={() => {
              onAcceptAction();
              closePopUp();
            }}
            variant="primary"
            width="fill"
          />
        </AlertControl>
        <AlertControl>
          <ButtonWithLabel
            label={t(
              "my-resources-screen-translations.delete-resources-pop-up-cancel-label"
            )}
            iconName="close-outline"
            size={size}
            onPress={closePopUp}
            variant="neutral"
            width="fill"
            loading={isLoading}
            disabled={isLoading}
          />
        </AlertControl>
      </AlertControls>
    </AlertContainer>
  );
};

export default Alert;
