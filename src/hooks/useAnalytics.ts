import { useEffect } from 'react';
import { analytics } from '../config/firebase';
import { logEvent } from 'firebase/analytics';

export function useAnalytics(eventName: string, eventParams?: Record<string, any>) {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  }, [eventName, eventParams]);
}