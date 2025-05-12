import styled from "styled-components/native";

import { Spacing } from "@/lib/constants/Spacing";
import { Colors } from "@/lib/constants/Colors";
import { Radius } from "@/lib/constants/Radius";

const Container = styled.View`
  width: 100%;
  height: "auto";
  gap: ${Spacing.spacing_md}px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${Colors.neutral[50]};
  border-top-style: solid;
  padding-top: ${Spacing.spacing_sm}px;
`;

const LinksContainer = styled.View`
  flex-direction: row;
  gap: ${Spacing.spacing_sm}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.Pressable`
  background-color: transparent;
  border-radius: ${Radius.radius_md}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Spacing.spacing_sm}px;
  border-width: 1px;
  border-color: ${Colors.basic.white};
  border-style: solid;
`;

export { Container, LinksContainer, Link };
