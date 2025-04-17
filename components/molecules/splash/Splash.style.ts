import styled from "styled-components/native";
import Animated from "react-native-reanimated";

import { Colors } from "@/lib/constants/Colors";

const SplashContainer = styled(Animated.View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${Colors.primary[400]};
`;

const Logo = styled(Animated.Image)`
  width: 30%;
  height: 30%;
`;
export { SplashContainer, Logo };
