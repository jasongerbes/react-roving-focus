import { useEffect, useState } from 'react';
import { FocusableElement } from './types.js';
import { isElementDisabled } from './utils.js';

export function useIsElementDisabled(
  ref: React.RefObject<FocusableElement | null>,
): boolean {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateState = () => {
      setDisabled(isElementDisabled(element));
    };

    // Set the initial disabled state.
    updateState();

    // Update the disabled state when the element's disabled attribute changes.
    const observer = new MutationObserver(updateState);

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['disabled', 'aria-disabled'],
    });

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return disabled;
}
