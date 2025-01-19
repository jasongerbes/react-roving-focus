import type {
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
export function arePositionsOverlapping(
  target: ElementPosition,
  current: ElementPosition,
  direction: Direction,
): boolean {
  if (direction === 'left' || direction === 'right') {
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
export function isPositionInDirection(
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
 * Returns the straight-line distance between two element positions.
 */
export function getDistanceBetweenPositions(
  a: ElementPosition,
  b: ElementPosition,
): number {
  const dx = a.centerX - b.centerX;
  const dy = a.centerY - b.centerY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Returns the top-left element.
 */
export function getFirstElement(
  elements: ElementWithPosition[],
): FocusableElement | null {
  const sortedElements = elements.sort((a, b) => {
    // Sort by left position if elements are roughly on the same row.
    if (Math.abs(a.position.top - b.position.top) < 10) {
      return a.position.left - b.position.left;
    }
    // Otherwise sort by top position.
    return a.position.top - b.position.top;
  });

  return sortedElements[0]?.element ?? null;
}

/**
 * Returns the closest element to a given position.
 */
export function getClosestElement(
  elements: ElementWithPosition[],
  currentPosition: ElementPosition,
): FocusableElement | null {
  const sortedElements = elements
    .map(({ element, position }) => ({
      element,
      distance: getDistanceBetweenPositions(currentPosition, position),
    }))
    .sort((a, b) => a.distance - b.distance);

  const firstElement = sortedElements[0];
  return firstElement ? firstElement.element : null;
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

  // Prefer elements that are overlapping with the current element in the direction.
  const overlappingElements = otherElements.filter(({ position }) =>
    arePositionsOverlapping(position, currentPosition, direction),
  );

  if (overlappingElements.length > 0) {
    return getClosestElement(overlappingElements, currentPosition);
  }

  // Otherwise, return the closest element in the given direction.
  return getClosestElement(otherElements, currentPosition);
}

/**
 * Determines whether an element is active (i.e. not disabled).
 */
export function isElementActive(element: FocusableElement): boolean {
  return (
    element.getAttribute('disabled') !== 'true' &&
    element.getAttribute('aria-disabled') !== 'true'
  );
}
