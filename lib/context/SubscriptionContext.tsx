/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import * as RNIap from "react-native-iap";
import { Toast } from "toastify-react-native";
import { useTranslations } from "../hooks";

export type SubscriptionPlanType =
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
  isProcessing: boolean;
  requestSubscription: (suscriptionPlan: SubscriptionPlanType) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | null>(
  null
);

export const useSubscriptionContext = () =>
  useContext(SubscriptionContext) as SubscriptionContextProps;

// const subscriptionSkus: string[] = [
//   "eduka_ia_sucription_2025",
//   "eduka_ia_sucription_2025_annual",
// ];

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  const { t } = useTranslations();

  const initIap = async (): Promise<void> => {
    try {
      await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    } catch (err) {
      console.warn("IAP init error", err);
    }
  };

  const getSubscriptions = async (productId: string) => {
    try {
      const subs = await RNIap.getSubscriptions({ skus: [productId] });
      console.log("SUBS:", JSON.stringify(subs, null, 2));
      return subs;
    } catch (err) {
      console.warn(err);
      return [];
    }
  };

  const checkPurchase = async (): Promise<boolean> => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      return purchases.some(
        (p) =>
          p.productId === "eduka_ia_sucription_2025" ||
          p.productId === "eduka_ia_sucription_2025_annual"
      );
    } catch (err) {
      console.warn("Error checking purchases", err);
      return false;
    }
  };

  const requestSubscription = async (
    suscriptionPlan: SubscriptionPlanType
  ): Promise<void> => {
    try {
      setIsProcessing(true);
      const subscriptionPlans = await getSubscriptions(suscriptionPlan);

      const sub = subscriptionPlans[0] as ExtendedSubscription;

      if (!sub?.subscriptionOfferDetails?.length) {
        throw new Error(t("subscriptions-screen-labels.error-purchase-msg"));
      }

      const offer = sub.subscriptionOfferDetails[0];
      const offerToken = offer.offerToken;

      if (!offerToken) {
        throw new Error(t("subscriptions-screen-labels.error-purchase-msg"));
      }

      await RNIap.requestSubscription({
        sku: suscriptionPlan as string,
        subscriptionOffers: [
          {
            sku: suscriptionPlan,
            offerToken,
          },
        ],
      });
      Toast.success(
        t("subscriptions-screen-labels.success-purchase-msg"),
        "bottom"
      );
    } catch (err) {
      console.warn("Error starting subscription", err);
      Toast.error(
        t("subscriptions-screen-labels.error-purchase-msg"),
        "bottom"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    (async () => {
      await initIap();
      const isSubscribed = await checkPurchase();
      setHasSubscription(isSubscribed);
    })();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        isProcessing,
        hasSubscription,
        requestSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
