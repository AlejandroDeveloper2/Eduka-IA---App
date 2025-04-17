import { ActivityIndicator } from "react-native";

import { SizeType } from "@/lib/types";

interface SpinnerProps {
  size: SizeType;
  color: string;
}

const Spinner = ({ size, color }: SpinnerProps): JSX.Element => {
  const formattedSize = size === "Large" ? "large" : "small";
  return <ActivityIndicator size={formattedSize} color={color} />;
};

export default Spinner;
