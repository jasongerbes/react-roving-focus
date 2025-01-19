import { useRef } from 'react';

/**
 * Custom useRef hook that returns an existing ref (if provided) or a new one.
 */
export function useNewOrExistingRef<T>(
  existingRef?: React.RefObject<T>,
): React.RefObject<T | null> {
  const newRef = useRef<T>(null);
  return existingRef !== undefined ? existingRef : newRef;
}
