import { useCallback, useMemo, useRef } from 'react';
import type {
  Direction,
  ElementCallbacks,
  ElementWithPosition,
  FocusableElement,
} from './types.js';
import debounce from 'lodash.debounce';
import { useUnmount } from './use-unmount';
import { RovingFocusContext } from './context';
import {
  getElementPosition,
  getFirstElement,
  getLastElement,
  getNextElement,
  isElementActive,
} from './utils';

export interface RovingFocusGroupProps {
  children: React.ReactNode;
}

export function RovingFocusGroup({ children }: RovingFocusGroupProps) {
  const focusedElementRef = useRef<FocusableElement | null>(null);
  const firstElementRef = useRef<FocusableElement | null>(null);
  const lastElementRef = useRef<FocusableElement | null>(null);
  const elementMapRef = useRef(new Map<FocusableElement, ElementCallbacks>());

  const getElementsWithPosition = (): ElementWithPosition[] => {
    return Array.from(elementMapRef.current.keys())
      .filter(isElementActive)
      .map((element) => ({ element, position: getElementPosition(element) }));
  };

  // Debounce state updates to avoid unnecessary re-renders and first element calculations.
  const debouncedUpdateState = useMemo(
    () =>
      debounce(() => {
        // Update the first and last elements.
        const elements = getElementsWithPosition();
        firstElementRef.current = getFirstElement(elements);
        lastElementRef.current = getLastElement(elements);

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
    [],
  );

  // Cancel debounced state updates when unmounting.
  useUnmount(() => {
    debouncedUpdateState.cancel();
  });

  const updateState = useCallback(debouncedUpdateState, [debouncedUpdateState]);

  const registerElement = useCallback(
    (element: FocusableElement, callbacks: ElementCallbacks) => {
      elementMapRef.current.set(element, callbacks);
      updateState();
    },
    [updateState],
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
    (direction: Direction) => {
      if (!focusedElementRef.current) {
        return;
      }
      const elements = getElementsWithPosition();
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
