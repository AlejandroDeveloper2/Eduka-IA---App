/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
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
  requestSubscription: (
    suscriptionPlan: SubscriptionPlanType,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | null>(
  null
);

export const useSubscriptionContext = () =>
  useContext(SubscriptionContext) as SubscriptionContextProps;

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  const { t } = useTranslations();

  const initIap = async (): Promise<void> => {
    try {
      await RNIap.initConnection();

      if (Platform.OS === "android")
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    } catch (err) {
      console.warn("IAP init error", err);
    }
  };

  const getSubscriptions = async (productId: string) => {
    try {
      const subs = await RNIap.getSubscriptions({ skus: [productId] });
      // console.log("SUBS:", JSON.stringify(subs, null, 2));
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
    suscriptionPlan: SubscriptionPlanType,
    toggleLoading: (message: string | null, isLoading: boolean) => void
  ): Promise<void> => {
    try {
      toggleLoading(
        t("subscriptions-screen-labels.subscribe-loading-message"),
        true
      );
      const subscriptionPlans = await getSubscriptions(suscriptionPlan);

      const sub = subscriptionPlans[0] as ExtendedSubscription;

      if (!sub?.subscriptionOfferDetails?.length) {
        throw new Error(t("subscriptions-screen-labels.error-purchase-msg"));
      }

      if (Platform.OS === "android") {
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
        return;
      }

      await RNIap.requestSubscription({ sku: suscriptionPlan });

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
      toggleLoading(null, false);
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
        hasSubscription,
        requestSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
