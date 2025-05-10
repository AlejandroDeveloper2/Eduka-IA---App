import { useEffect, useState } from "react";

import { useSubscriptionContext } from "../../context/subscription-context/SubscriptionContext";
import useTranslations from "./useTranslations";

const useCanAccessResources = () => {
  const gracePeriodInDays = 30;
  const [isExpiredAccess, setExpiredAccess] = useState<boolean>(false);
  const [remaningExpirationDays, setRemaningExpirationDays] =
    useState<number>(0);

  const { cancelDate, loadingSubscription } = useSubscriptionContext();
  const { t } = useTranslations();

  const calculateExpirationAccessDate = (): void => {
    if (!cancelDate) {
      setExpiredAccess(false);
      setRemaningExpirationDays(0);
    } else {
      const parsedCancelDate = new Date(cancelDate);
      const now = new Date();

      const diffInDays = Math.floor(
        (now.getTime() - parsedCancelDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffInDays <= 30) setExpiredAccess(false);
      else setExpiredAccess(true);

      setRemaningExpirationDays(gracePeriodInDays - diffInDays);
    }
  };

  useEffect(() => {
    calculateExpirationAccessDate();
  }, [cancelDate]);

  return {
    isExpiredAccess,
    remaningExpirationDays,
    loadingSubscription,
    t,
  };
};

export default useCanAccessResources;
