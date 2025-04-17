import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SizeType } from "@/lib/types";

import { LogoBox, LogoImage } from "./Logo.style";

interface LogoProps {
  size: SizeType;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const logoImage = require("@/assets/images/nav-icon.png");

const Logo = ({ size }: LogoProps): JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <LogoBox style={{ paddingTop: insets.top }}>
      <LogoImage source={logoImage} size={size} />
    </LogoBox>
  );
};

export default Logo;
