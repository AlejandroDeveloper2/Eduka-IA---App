import { SizeType } from "@/lib/types";

import { Colors } from "@/lib/constants/Colors";

import { Spinner, Typography } from "@/components/atoms";

import { LoadingBoxContainer } from "./LoadingBox.style";

interface LoadingBoxProps {
  size: SizeType;
  message: string;
}

const LoadingBox = ({ size, message }: LoadingBoxProps): JSX.Element => {
  return (
    <LoadingBoxContainer>
      <Spinner size={size} color={Colors.primary[400]} />
      <Typography
        size={size}
        type="paragraph"
        text={message}
        color={Colors.primary[400]}
        align="left"
        fontWeight="400Regular"
      />
    </LoadingBoxContainer>
  );
};

export default LoadingBox;
