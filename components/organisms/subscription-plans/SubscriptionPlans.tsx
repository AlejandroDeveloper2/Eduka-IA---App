import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";
import {
  SubscriptionPlanType,
  useSubscriptionContext,
} from "@/lib/context/subscription-context/SubscriptionContext";

import { useLoading, useTranslations } from "@/lib/hooks";

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
  planId: SubscriptionPlanType;
  loading: {
    isLoading: boolean;
    message: string | null;
    toggleLoading: (message: string | null, isLoading: boolean) => void;
  };
}

const SubscriptionPlan = ({
  size,
  planTitle,
  description,
  price,
  planId,
  loading,
}: SubscriptionPlanProps): JSX.Element => {
  const { requestSubscription } = useSubscriptionContext();
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
        onPress={() => requestSubscription(planId, loading.toggleLoading)}
        variant="neutral"
        disabled={loading.isLoading}
        loading={loading.isLoading}
        messageLoading={loading.message ? loading.message : undefined}
      />
    </SubscriptionPlanCard>
  );
};

const SubscriptionPlans = ({ size }: SubscriptionPlans): JSX.Element => {
  const { t } = useTranslations();

  const monthlySubLoading = useLoading();
  const yearlySubLoading = useLoading();

  return (
    <SubscriptionPlansContainer>
      <SubscriptionPlan
        planId="eduka_ia_sucription_2025"
        size={size}
        planTitle={t("subscriptions-screen-labels.monthly-plan-title")}
        description={t("subscriptions-screen-labels.monthly-plan-description")}
        price="11.99 USD"
        loading={monthlySubLoading}
      />
      <SubscriptionPlan
        planId="eduka_ia_sucription_2025_annual"
        size={size}
        planTitle={t("subscriptions-screen-labels.annual-plan-title")}
        description={t("subscriptions-screen-labels.annual-plan-description")}
        price="99.99 USD"
        loading={yearlySubLoading}
      />
    </SubscriptionPlansContainer>
  );
};

export default SubscriptionPlans;
