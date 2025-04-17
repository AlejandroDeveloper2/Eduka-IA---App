import styled from "styled-components/native";

import { SizeType } from "@/lib/types";

interface LogoStyleProps {
  size: SizeType;
}

const LogoImage = styled.Image<LogoStyleProps>`
  width: ${({ size }: LogoStyleProps) => (size === "Large" ? 58 : 50)}px;
  height: ${({ size }: LogoStyleProps) => (size === "Large" ? 37 : 32)}px;
`;

const LogoBox = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export { LogoImage, LogoBox };
