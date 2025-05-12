import { Linking, Platform } from "react-native";

import { Colors } from "@/lib/constants/Colors";

import { useScreenDimensions, useTranslations } from "@/lib/hooks";

import { Typography } from "@/components/atoms";

import { Container, LinksContainer, Link } from "./LegalInfoFooter.style";

const termsOfUsageUrl: string =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const privacyPolicyUrl: string =
  "https://www.privacypolicies.com/live/2f949e94-b0b8-4dda-82b0-66d424d24a35";

const LegalInfoFooter = (): JSX.Element => {
  const size = useScreenDimensions();
  const { t } = useTranslations();

  return (
    <Container>
      <Typography
        size={size}
        type="paragraph"
        text={t("subscriptions-screen-labels.legal-info-section-title")}
        color={Colors.basic.white}
        align="center"
        fontWeight="500Medium"
      />
      <LinksContainer>
        <Link onPress={() => Linking.openURL(privacyPolicyUrl)}>
          <Typography
            size={size}
            type="caption"
            text={t("subscriptions-screen-labels.privacy-polices-label")}
            color={Colors.basic.white}
            align="center"
            fontWeight="400Regular"
          />
        </Link>
        {Platform.OS === "ios" && (
          <Link onPress={() => Linking.openURL(termsOfUsageUrl)}>
            <Typography
              size={size}
              type="caption"
              text={t("subscriptions-screen-labels.usage-terms-label")}
              color={Colors.basic.white}
              align="center"
              fontWeight="400Regular"
            />
          </Link>
        )}
      </LinksContainer>
    </Container>
  );
};

export default LegalInfoFooter;
