export type FocusableElement = HTMLElement | SVGElement;

export interface ElementPosition {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

export interface ElementWithPosition {
  element: FocusableElement;
  position: ElementPosition;
}

export interface ElementCallbacks {
  onTabIndexChange: (tabIndex: TabIndex) => void;
}

export type Direction = 'left' | 'right' | 'up' | 'down';
export type Axis = 'row' | 'column';
export type TabIndex = -1 | 0;
