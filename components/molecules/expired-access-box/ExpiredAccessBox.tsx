import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import ScreenSection from "../screen-section/ScreenSection";
import ButtonWithLabel from "../button/ButtonWithLabel";

import { BoxContainer } from "./ExpiredAccessBox.style";

interface ExpiredAccessBoxProps {
  size: SizeType;
}

const ExpiredAccessBox = ({ size }: ExpiredAccessBoxProps): JSX.Element => {
  const router = useRouter();

  return (
    <BoxContainer>
      <ScreenSection
        title={"Suscribete de nuevo para recuperar el acceso"}
        description={
          "Se ha terminado tu plazo de 30 días despues de tu cancelación a la suscripción de Eduka IA, puedes volver a renovarla tocando el botón de abajo"
        }
        Icon={() => (
          <Ionicons
            name="information-circle-outline"
            color={Colors.primary[400]}
            size={size === "Large" ? 36 : 32}
          />
        )}
        size={size}
      />
      <ButtonWithLabel
        label="Ver planes de suscripción"
        iconName="star-outline"
        size={size}
        variant="primary"
        width="fill"
        onPress={() => router.navigate("/")}
      />
    </BoxContainer>
  );
};

export default ExpiredAccessBox;
