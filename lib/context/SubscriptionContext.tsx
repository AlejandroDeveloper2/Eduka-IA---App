import { createContext, useContext, useEffect, useState } from "react";
import * as RNIap from "react-native-iap";
import { Toast } from "toastify-react-native";
import { useTranslations } from "../hooks";

export type SubscriptionPlan =
  | "eduka_ia_sucription_2025"
  | "eduka_ia_sucription_2025_annual";

interface SubscriptionContextProps {
  hasSubscription: boolean;
  isProcessing: boolean;
  getSubscriptions: () => Promise<RNIap.Subscription[]>;
  requestSubscription: (suscriptionPlan: SubscriptionPlan) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | null>(
  null
);

export const useSubscriptionContext = () =>
  useContext(SubscriptionContext) as SubscriptionContextProps;

const subscriptionSkus: string[] = [
  "eduka_ia_sucription_2025",
  "eduka_ia_sucription_2025_annual",
];

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

  const getSubscriptions = async () => {
    try {
      const subs = await RNIap.getSubscriptions({ skus: subscriptionSkus });
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
    suscriptionPlan: SubscriptionPlan
  ): Promise<void> => {
    try {
      setIsProcessing(true);
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
        getSubscriptions,
        requestSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
