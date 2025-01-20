import { useCallback, useEffect, useState } from 'react';
import { useNewOrExistingRef } from './use-new-or-existing-ref.js';
import type { FocusableElement, TabIndex } from './types.js';
import { useRovingFocusContext } from './context.js';

export interface UseRovingFocusOptions<T extends FocusableElement> {
  ref?: React.RefObject<T | null>;
  disabled?: boolean;
}

export interface UseRovingFocusResult<T extends FocusableElement> {
  ref: React.RefObject<T>;
  tabIndex: TabIndex;
}

export const useRovingFocus = <T extends FocusableElement>({
  ref: existingRef,
  disabled = false,
}: UseRovingFocusOptions<T> = {}): UseRovingFocusResult<T> => {
  const context = useRovingFocusContext();
  const [tabIndex, setTabIndex] = useState<TabIndex>(-1);

  // Type cast for backwards compatibility, as the useRef return type changed in React 19.
  const ref = useNewOrExistingRef(existingRef) as React.RefObject<T>;

  // Register and unregister the element when it mounts and unmounts.
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) {
      return;
    }
    context.registerElement(element, { onTabIndexChange: setTabIndex });
    return () => {
      context.unregisterElement(element);
    };
  }, [ref, context, disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          context.focusNextElement('left');
          break;
        case 'ArrowRight':
          context.focusNextElement('right');
          break;
        case 'ArrowUp':
          context.focusNextElement('up');
          break;
        case 'ArrowDown':
          context.focusNextElement('down');
          break;
        default:
          return;
      }

      e.preventDefault();
      e.stopPropagation();
    },
    [context],
  );

  const handleFocus = useCallback(() => {
    const element = ref.current;
    if (!element || disabled) {
      return;
    }
    context.setFocusedElement(element);
  }, [ref, context, disabled]);

  // Add event listeners.
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) {
      return;
    }
    element.addEventListener('focus', handleFocus);
    element.addEventListener('keydown', handleKeyDown as EventListener);
    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [ref, context, disabled, handleFocus, handleKeyDown]);

  return { ref, tabIndex };
};
