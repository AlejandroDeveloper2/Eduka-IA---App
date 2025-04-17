import styled from "styled-components/native";

import { InputStyleManager } from "@/lib/utils";

import { InputTextBody, InputTextBox } from "../../molecules/input/Input.style";

const DropdownBox = styled(InputTextBox)`
  padding-top: ${({ size }) =>
    InputStyleManager.getInputVerticalPadding(size)}px;
  padding-bottom: ${({ size }) =>
    InputStyleManager.getInputVerticalPadding(size)}px;
`;

const DropdownBody = styled(InputTextBody)`
  width: auto;
`;

export { DropdownBox, DropdownBody };
