import { createContext, useContext } from 'react';
import type {
  MoveDirection,
  ElementCallbacks,
  FocusableElement,
} from './types.js';

export interface RovingFocusContextValue {
  registerElement: (
    element: FocusableElement,
    callbacks: ElementCallbacks,
  ) => void;
  unregisterElement: (element: FocusableElement) => void;
  setFocusedElement: (element: FocusableElement) => void;
  focusNextElement: (direction: MoveDirection) => void;
  focusFirstElement: () => void;
  focusLastElement: () => void;
}

export const RovingFocusContext = createContext<RovingFocusContextValue | null>(
  null,
);

export function useRovingFocusContext(): RovingFocusContextValue {
  const context = useContext(RovingFocusContext);
  if (!context) {
    throw new Error('useRovingFocus must be used within a RovingFocusGroup');
  }
  return context;
}
