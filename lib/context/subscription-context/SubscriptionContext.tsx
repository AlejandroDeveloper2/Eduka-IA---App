import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as RNIap from "react-native-iap";
import { Toast } from "toastify-react-native";

import {
  ExtendedSubscription,
  SubscriptionContextProps,
  SubscriptionPlanType,
} from "./context-types";

import useTranslations from "../../hooks/core/useTranslations";
import { AsyncStorageService } from "@/services/AsyncStorage.service";

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
  const [cancelDate, setCancelDate] = useState<string | null>(null);

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
      return subs;
    } catch (err) {
      console.warn(err);
      return [];
    }
  };

  const checkPurchase = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      const subscription = purchases.find(
        (purchase) =>
          purchase.productId === "eduka_ia_sucription_2025" ||
          purchase.productId === "eduka_ia_sucription_2025_annual"
      );

      if (!subscription) return null;

      return subscription;
    } catch (err) {
      console.warn("Error checking purchases", err);
      return null;
    }
  };

  const getSubscriptionStatus = async () => {
    try {
      const subscription = await checkPurchase();

      if (!subscription) return { isSubscribed: false };

      const platformData = subscription as RNIap.SubscriptionPurchase;

      const isAutoRenewing = platformData.autoRenewingAndroid as boolean;

      return {
        isSubscribed: true,
        isAutoRenewing,
        transactionDate: platformData.transactionDate,
      };
    } catch (error) {
      console.warn(error);
      return {
        isSubscribed: false,
      };
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

      const [sub] = (await getSubscriptions(
        suscriptionPlan
      )) as ExtendedSubscription[];

      if (!sub?.subscriptionOfferDetails?.length)
        throw new Error(t("subscriptions-screen-labels.error-purchase-msg"));

      if (Platform.OS === "android") {
        const offer = sub.subscriptionOfferDetails[0];
        const offerToken = offer.offerToken;

        if (!offerToken)
          throw new Error(t("subscriptions-screen-labels.error-purchase-msg"));

        await RNIap.requestSubscription({
          sku: suscriptionPlan as string,
          subscriptionOffers: [
            {
              sku: suscriptionPlan,
              offerToken,
            },
          ],
        });
        setHasSubscription(true);
      } else {
        await RNIap.requestSubscription({ sku: suscriptionPlan });
        setHasSubscription(true);
      }
      Toast.success(
        t("subscriptions-screen-labels.success-purchase-msg"),
        "bottom"
      );
    } catch (err) {
      console.warn("Error starting subscription", err);
      setHasSubscription(false);
      Toast.error(
        t("subscriptions-screen-labels.error-purchase-msg"),
        "bottom"
      );
    } finally {
      toggleLoading(null, false);
    }
  };

  const checkAndStoreCancelDate = async (): Promise<void> => {
    const { isSubscribed, isAutoRenewing } = await getSubscriptionStatus();

    if (!isAutoRenewing && isSubscribed) {
      const storagedCancelDate = await AsyncStorageService.getItem<string>(
        "cancelDate"
      );

      if (!storagedCancelDate) {
        const cancelDate: string = new Date().toISOString();
        setCancelDate(cancelDate);
        await AsyncStorageService.setItem("cancelDate", cancelDate);
      } else setCancelDate(storagedCancelDate);
    }

    if (isSubscribed && isAutoRenewing) {
      setCancelDate(null);
      await AsyncStorageService.deleteItem("cancelDate");
    }
  };

  useEffect(() => {
    (async () => {
      await initIap();
      const { isSubscribed } = await getSubscriptionStatus();
      setHasSubscription(isSubscribed);
      await checkAndStoreCancelDate();
    })();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        hasSubscription,
        cancelDate,
        requestSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
