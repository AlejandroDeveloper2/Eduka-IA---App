import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";

const SubscriptionPlansContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: ${Spacing.spacing_md}px;
  justify-content: flex-start;
  align-items: center;
`;

const SubscriptionPlanHeader = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.spacing_sm}px;
  align-items: center;
  justify-content: center;
`;

const SubscriptionPlanCard = styled.View`
  background-color: ${Colors.primary[400]};
  border-radius: ${Radius.radius_md}px;
  display: flex;
  gap: ${Spacing.spacing_xl}px;
  align-items: center;
  justify-content: center;
  padding: ${Spacing.spacing_lg}px;
`;

export {
  SubscriptionPlansContainer,
  SubscriptionPlanCard,
  SubscriptionPlanHeader,
};
