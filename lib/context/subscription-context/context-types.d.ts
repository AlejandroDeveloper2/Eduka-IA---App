/* eslint-disable @typescript-eslint/no-explicit-any */
type SubscriptionPlanType =
  | "eduka_ia_sucription_2025"
  | "eduka_ia_sucription_2025_annual";

type ExtendedSubscription = {
  productId: string;
  title: string;
  description: string;
  price: string;
  subscriptionOfferDetails?: {
    basePlanId?: string;
    offerToken?: string;
    pricingPhases?: any[];
    offerId?: string;
  }[];
  [key: string]: any;
};

interface SubscriptionContextProps {
  hasSubscription: boolean;
  cancelDate: string | null;
  requestSubscription: (
    suscriptionPlan: SubscriptionPlanType,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
}

export type {
  SubscriptionPlanType,
  ExtendedSubscription,
  SubscriptionContextProps,
};
