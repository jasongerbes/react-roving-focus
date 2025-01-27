import type {
  Axis,
  Direction,
  ElementPosition,
  ElementWithPosition,
  FocusableElement,
} from './types.js';

/**
 * Gets the current position of an element.
 */
export function getElementPosition(element: FocusableElement): ElementPosition {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

/**
 * Determines whether two elements are overlapping in the specified direction.
 * If the overlap amount is greater than 1px, the elements are overlapping (a 1px overlap is considered a rounding error)
 */
function arePositionsOverlapping(
  target: ElementPosition,
  current: ElementPosition,
  axis: Axis,
): boolean {
  if (axis === 'row') {
    // Calculate vertical overlap amount
    return (
      Math.min(target.bottom, current.bottom) -
        Math.max(target.top, current.top) >
      1
    );
  } else {
    // Calculate horizontal overlap amount
    return (
      Math.min(target.right, current.right) -
        Math.max(target.left, current.left) >
      1
    );
  }
}

/**
 * Determines whether a target position is in a particular direction relative to the current position.
 */
function isPositionInDirection(
  target: ElementPosition,
  current: ElementPosition,
  direction: Direction,
): boolean {
  switch (direction) {
    case 'left':
      return target.centerX < current.left;
    case 'right':
      return target.centerX > current.right;
    case 'up':
      return target.centerY < current.top;
    case 'down':
      return target.centerY > current.bottom;
  }
}

/**
 * Returns the top-left element.
 */
export function getFirstElement(
  elements: ElementWithPosition[],
): FocusableElement | null {
  const sortedElements = elements.sort((a, b) => {
    // Sort by left position if elements are on the same row.
    if (arePositionsOverlapping(a.position, b.position, 'row')) {
      return a.position.left - b.position.left;
    }
    // Otherwise sort by top position.
    return a.position.top - b.position.top;
  });

  return sortedElements[0]?.element ?? null;
}

/**
 * Returns the bottom-right element.
 */
export function getLastElement(
  elements: ElementWithPosition[],
): FocusableElement | null {
  const sortedElements = elements.sort((a, b) => {
    // Sort by right position if elements are on the same row.
    if (arePositionsOverlapping(a.position, b.position, 'row')) {
      return b.position.right - a.position.right;
    }
    // Otherwise sort by bottom position.
    return b.position.bottom - a.position.bottom;
  });

  return sortedElements[0]?.element ?? null;
}

/**
 * Returns the distance between the closest edges of two element positions.
 */
function getDistanceBetweenEdges(
  a: ElementPosition,
  b: ElementPosition,
): number {
  if (a.right <= b.left) {
    // a is to the left of b
    return b.left - a.right;
  } else if (b.right <= a.left) {
    // b is to the left of a
    return a.left - b.right;
  } else if (a.bottom <= b.top) {
    // a is above b
    return b.top - a.bottom;
  } else if (b.bottom <= a.top) {
    // b is above a
    return a.top - b.bottom;
  } else {
    // a and b overlap
    return 0;
  }
}

/**
 * Returns the distance between the center of two element positions.
 */
function getDistanceBetweenElements(
  a: ElementPosition,
  b: ElementPosition,
): number {
  const dx = a.centerX - b.centerX;
  const dy = a.centerY - b.centerY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Returns the nearest element to a given position.
 */
function getNearestElement(
  elements: ElementWithPosition[],
  currentPos: ElementPosition,
): FocusableElement | null {
  const sortedElements = elements
    .map(({ element, position }) => ({
      element,
      edgeDistance: getDistanceBetweenEdges(position, currentPos),
      centerDistance: getDistanceBetweenElements(position, currentPos),
    }))
    .sort((a, b) => {
      if (a.edgeDistance !== b.edgeDistance) {
        return a.edgeDistance - b.edgeDistance;
      }
      return a.centerDistance - b.centerDistance;
    });

  if (sortedElements.length === 0) {
    return null;
  }

  return sortedElements[0].element;
}

/**
 * Returns the axis for a given direction.
 */
function getAxisForDirection(direction: Direction): Axis {
  return direction === 'left' || direction === 'right' ? 'row' : 'column';
}

/**
 * Returns the next element in a given direction relative to the current element's position.
 */
export function getNextElement(
  currentElement: FocusableElement,
  direction: Direction,
  elements: ElementWithPosition[],
): FocusableElement | null {
  const currentPosition = getElementPosition(currentElement);

  const otherElements = elements.filter(({ element, position }) => {
    return (
      element !== currentElement &&
      isPositionInDirection(position, currentPosition, direction)
    );
  });

  if (otherElements.length === 0) {
    return null;
  }

  const axis = getAxisForDirection(direction);

  // Prefer elements that are overlapping with the current element on the given axis.
  const overlappingElements = otherElements.filter(({ position }) =>
    arePositionsOverlapping(position, currentPosition, axis),
  );

  if (overlappingElements.length > 0) {
    return getNearestElement(overlappingElements, currentPosition);
  }

  // Otherwise, return the nearest element in the given direction.
  return getNearestElement(otherElements, currentPosition);
}

/**
 * Determines whether an element is active (i.e. not disabled).
 */
export function isElementActive(element: FocusableElement): boolean {
  return !isElementDisabled(element);
}

/**
 * Determines whether an element is disabled.
 */
export function isElementDisabled(element: FocusableElement): boolean {
  return (
    ('disabled' in element && element.disabled === true) ||
    element.ariaDisabled === 'true'
  );
}
