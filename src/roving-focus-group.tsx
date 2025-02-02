import { useCallback, useMemo, useRef } from 'react';
import type {
  MoveDirection,
  ElementCallbacks,
  ElementWithPosition,
  FocusableElement,
  TextDirection,
} from './types.js';
import debounce from 'lodash.debounce';
import { useUnmount } from './use-unmount.js';
import { RovingFocusContext } from './context.js';
import {
  getElementPosition,
  getFirstElement,
  getLastElement,
  getNextElement,
  isElementActive,
} from './utils.js';
import { useTextDirection } from './use-text-direction.js';

export interface RovingFocusGroupProps {
  children: React.ReactNode;
  dir?: TextDirection;
}

export function RovingFocusGroup({ children, dir }: RovingFocusGroupProps) {
  const focusedElementRef = useRef<FocusableElement | null>(null);
  const firstElementRef = useRef<FocusableElement | null>(null);
  const lastElementRef = useRef<FocusableElement | null>(null);
  const elementMapRef = useRef(new Map<FocusableElement, ElementCallbacks>());
  const textDirection = useTextDirection(dir);

  const getActiveElements = (): ElementWithPosition[] => {
    return Array.from(elementMapRef.current.keys())
      .filter(isElementActive)
      .map((element) => ({ element, position: getElementPosition(element) }));
  };

  // Debounce state updates to avoid unnecessary re-renders and first element calculations.
  const debouncedUpdateState = useMemo(
    () =>
      debounce(() => {
        // Update the first and last elements.
        const elements = getActiveElements();
        firstElementRef.current = getFirstElement(elements, textDirection);
        lastElementRef.current = getLastElement(elements, textDirection);

        // Clear the focused element if it's no longer registered.
        if (
          focusedElementRef.current &&
          !elementMapRef.current.has(focusedElementRef.current)
        ) {
          focusedElementRef.current = null;
        }

        // Notify all elements of their new tab index.
        for (const [element, callbacks] of elementMapRef.current.entries()) {
          if (focusedElementRef.current === element) {
            callbacks.onTabIndexChange(0);
          } else if (
            firstElementRef.current === element &&
            !focusedElementRef.current
          ) {
            callbacks.onTabIndexChange(0);
          } else {
            callbacks.onTabIndexChange(-1);
          }
        }
      }),
    [textDirection],
  );

  const updateState = useCallback(debouncedUpdateState, [debouncedUpdateState]);
  const mutationObserver = useMemo(
    () => new MutationObserver(updateState),
    [updateState],
  );

  // Cancel debounced state updates and disconnect the mutation observer when unmounting.
  useUnmount(() => {
    debouncedUpdateState.cancel();
    mutationObserver.disconnect();
  });

  const registerElement = useCallback(
    (element: FocusableElement, callbacks: ElementCallbacks) => {
      elementMapRef.current.set(element, callbacks);
      updateState();

      // Observe changes to the disabled state of the element.
      mutationObserver.observe(element, {
        attributes: true,
        attributeFilter: ['disabled', 'aria-disabled'],
      });
    },
    [updateState, mutationObserver],
  );

  const unregisterElement = useCallback(
    (element: FocusableElement) => {
      elementMapRef.current.delete(element);
      updateState();
    },
    [updateState],
  );

  const setFocusedElement = useCallback(
    (element: FocusableElement) => {
      focusedElementRef.current = element;
      updateState();
    },
    [updateState],
  );

  const focusElement = useCallback(
    (element: FocusableElement) => {
      setFocusedElement(element);
      element.focus();
    },
    [setFocusedElement],
  );

  const focusNextElement = useCallback(
    (direction: MoveDirection) => {
      if (!focusedElementRef.current) {
        return;
      }
      const elements = getActiveElements();
      const nextElement = getNextElement(
        focusedElementRef.current,
        direction,
        elements,
      );
      if (nextElement) {
        focusElement(nextElement);
      }
    },
    [focusElement],
  );

  const focusFirstElement = useCallback(() => {
    if (firstElementRef.current) {
      focusElement(firstElementRef.current);
    }
  }, [focusElement]);

  const focusLastElement = useCallback(() => {
    if (lastElementRef.current) {
      focusElement(lastElementRef.current);
    }
  }, [focusElement]);

  const contextValue = useMemo(
    () => ({
      registerElement,
      unregisterElement,
      setFocusedElement,
      focusNextElement,
      focusFirstElement,
      focusLastElement,
    }),
    [
      registerElement,
      unregisterElement,
      setFocusedElement,
      focusNextElement,
      focusFirstElement,
      focusLastElement,
    ],
  );

  return (
    <RovingFocusContext.Provider value={contextValue}>
      {children}
    </RovingFocusContext.Provider>
  );
}
