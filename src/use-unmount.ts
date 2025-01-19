import { useEffect } from 'react';

/**
 * Cleanup-only effect that runs a callback on unmount.
 */
export const useUnmount = (callback: VoidFunction): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback, []);
};
