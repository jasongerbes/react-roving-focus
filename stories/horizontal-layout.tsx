import { RovingFocusGroup, TextDirection } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';
import { cn } from './utils';

export interface HorizontalLayoutProps {
  itemCount: number;
  overflow: 'scroll' | 'wrap' | 'none';
  dir?: TextDirection;
  disabledItems?: number[];
}

export function HorizontalLayout({
  itemCount,
  overflow,
  dir,
  disabledItems,
}: HorizontalLayoutProps) {
  return (
    <RovingFocusGroup dir={dir}>
      <LayoutContainer
        className={cn(
          'flex',
          overflow === 'wrap' && 'flex-wrap',
          overflow === 'scroll' && 'overflow-x-scroll',
        )}
        dir={dir}
      >
        {Array.from({ length: itemCount }, (_, i) => (
          <FocusableItem
            className={cn('grow', overflow !== 'none' && 'px-8')}
            key={i}
            disabled={disabledItems?.includes(i + 1)}
          >
            {i + 1}
          </FocusableItem>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
