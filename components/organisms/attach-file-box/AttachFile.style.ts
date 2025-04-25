import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";
import { Radius } from "@/lib/constants/Radius";
import { Colors } from "@/lib/constants/Colors";

const AttachFileContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${Spacing.spacing_xs}px;
`;

const AttachLabel = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${Spacing.spacing_2xs}px;
`;

const AttachFileInput = styled.View`
  width: 100%;
  height: auto;
  padding: ${Spacing.spacing_md}px;
  border-radius: ${Radius.radius_md}px;
  border-width: 1px;
  border-color: ${Colors.neutral[50]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AttachedFileBox = styled(AttachLabel)`
  width: 65%;
  gap: ${Spacing.spacing_md}px;
`;

export { AttachLabel, AttachFileContainer, AttachFileInput, AttachedFileBox };
