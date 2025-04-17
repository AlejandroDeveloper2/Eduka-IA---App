import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import Typography from "../typography/Typography";

import { EmptyContainer, EmptyImage } from "./Empty.style";

interface EmptyProps {
  text: string;
  size: SizeType;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const emptyImage = require("@/assets/images/empty-image.png");

const Empty = ({ text, size }: EmptyProps): JSX.Element => {
  return (
    <EmptyContainer>
      <EmptyImage source={emptyImage} />
      <Typography
        size={size}
        type="paragraph"
        text={text}
        color={Colors.neutral[900]}
        align="center"
        fontWeight="400Regular"
      />
    </EmptyContainer>
  );
};

export default Empty;
