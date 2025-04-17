import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";
import { SizeType } from "@/lib/types";

interface ColStyle {
  size: SizeType;
  fill: boolean;
}

const FormContainer = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  gap: ${Spacing.spacing_lg}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${Spacing.spacing_lg}px;
`;

const FormButtons = styled(FormContainer)`
  flex-direction: row;
  gap: ${Spacing.spacing_null}px;
`;

const FieldTable = styled.View`
  width: 100%;
  height: auto;
  gap: ${Spacing.spacing_lg}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const FieldRow = styled.View`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  gap: ${Spacing.spacing_lg}px;
`;

const FieldColumn = styled.View<ColStyle>`
  width: ${({ size, fill }: ColStyle) =>
    size === "Large" ? (fill ? "100%" : "290px") : "100%"};
`;

export { FormContainer, FormButtons, FieldTable, FieldRow, FieldColumn };
