import { useEffect, useState } from "react";

import { useSubscriptionContext } from "../../context/subscription-context/SubscriptionContext";

const useCanAccessResources = () => {
  const [isExpiredAccess, setExpiredAccess] = useState<boolean>(false);
  const [remaningExpirationDays, setRemaningExpirationDays] =
    useState<number>(0);

  const { cancelDate } = useSubscriptionContext();

  const calculateExpirationAccessDate = (): void => {
    if (!cancelDate) {
      setExpiredAccess(false);
      setRemaningExpirationDays(0);
    } else {
      const parsedCancelDate = new Date(cancelDate);
      const now = new Date();

      const remaningDays = Math.floor(
        (now.getTime() - parsedCancelDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (remaningDays <= 30) setExpiredAccess(false);
      else setExpiredAccess(true);

      setRemaningExpirationDays(remaningDays);
    }
  };

  useEffect(() => {
    calculateExpirationAccessDate();
  }, [cancelDate]);

  return {
    isExpiredAccess,
    remaningExpirationDays,
  };
};

export default useCanAccessResources;
