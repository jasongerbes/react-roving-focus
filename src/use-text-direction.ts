import { useState, useEffect } from 'react';
import { TextDirection } from './types';

/**
 * Returns the text direction of the document.
 * @param dir - The text direction to use. If not provided, it will be detected from the document.
 * @returns The text direction of the document.
 */
export function useTextDirection(dir?: TextDirection): TextDirection {
  const [direction, setDirection] = useState<TextDirection>(getTextDirection());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newDirection = getTextDirection();
      setDirection(newDirection);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    return () => observer.disconnect();
  }, []);

  return dir ?? direction;
}

function getTextDirection(): TextDirection {
  const dir = document.dir.toLowerCase();

  if (dir === 'rtl') {
    return 'rtl';
  }

  return 'ltr';
}
