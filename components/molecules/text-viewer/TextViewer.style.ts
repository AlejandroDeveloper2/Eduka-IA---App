import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const FlexibleContentBox = styled(Animated.View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export { FlexibleContentBox };
