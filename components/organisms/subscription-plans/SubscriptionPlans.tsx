import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";
import {
  SubscriptionPlan,
  useSubscriptionContext,
} from "@/lib/context/SubscriptionContext";

import { useTranslations } from "@/lib/hooks";

import { Colors } from "@/lib/constants/Colors";

import { Typography } from "@/components/atoms";
import { ButtonWithLabel } from "@/components/molecules";

import {
  SubscriptionPlanCard,
  SubscriptionPlanHeader,
  SubscriptionPlansContainer,
} from "./SubscriptionPlans.style";

interface SubscriptionPlans {
  size: SizeType;
}

interface SubscriptionPlanProps {
  size: SizeType;
  planTitle: string;
  description: string;
  price: string;
  planId: SubscriptionPlan;
}

const SubscriptionPlan = ({
  size,
  planTitle,
  description,
  price,
  planId,
}: SubscriptionPlanProps): JSX.Element => {
  const { isProcessing, requestSubscription } = useSubscriptionContext();
  const { t } = useTranslations();

  return (
    <SubscriptionPlanCard>
      <SubscriptionPlanHeader>
        <Ionicons name="star" color={Colors.basic.white} size={32} />
        <Typography
          size={size}
          type="button"
          text={planTitle}
          color={Colors.basic.white}
          align="center"
          fontWeight="500Medium"
        />
      </SubscriptionPlanHeader>
      <Typography
        size={size}
        type="paragraph"
        text={description}
        color={Colors.basic.white}
        align="center"
        fontWeight="400Regular"
      />
      <Typography
        size={size}
        type="display"
        text={price}
        color={Colors.basic.white}
        align="center"
        fontWeight="700Bold"
      />
      <ButtonWithLabel
        label={t("subscriptions-screen-labels.button-subscribe-label")}
        iconName="cart-outline"
        width="fill"
        size={size}
        onPress={() => requestSubscription(planId)}
        variant="neutral"
        disabled={isProcessing}
        loading={isProcessing}
        messageLoading={
          isProcessing
            ? t("subscriptions-screen-labels.subscribe-loading-message")
            : undefined
        }
      />
    </SubscriptionPlanCard>
  );
};

const SubscriptionPlans = ({ size }: SubscriptionPlans): JSX.Element => {
  const { t } = useTranslations();

  return (
    <SubscriptionPlansContainer>
      <SubscriptionPlan
        planId="eduka_ia_sucription_2025"
        size={size}
        planTitle={t("subscriptions-screen-labels.monthly-plan-title")}
        description={t("subscriptions-screen-labels.monthly-plan-description")}
        price="11.99 USD"
      />
      <SubscriptionPlan
        planId="eduka_ia_sucription_2025_annual"
        size={size}
        planTitle={t("subscriptions-screen-labels.annual-plan-title")}
        description={t("subscriptions-screen-labels.annual-plan-description")}
        price="99.99 USD"
      />
    </SubscriptionPlansContainer>
  );
};

export default SubscriptionPlans;
