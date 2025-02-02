import { RovingFocusGroup } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';
import { cn } from './utils';

export interface GridLayoutProps {
  itemCount: number;
  columnCount: 'fixed' | 'responsive';
  disabledItems?: number[];
}

export function GridLayout({
  itemCount,
  columnCount,
  disabledItems,
}: GridLayoutProps) {
  return (
    <RovingFocusGroup>
      <LayoutContainer
        className={cn(
          'grid',
          columnCount === 'fixed' && 'grid-cols-3',
          columnCount === 'responsive' &&
            'grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]',
        )}
      >
        {Array.from({ length: itemCount }, (_, i) => (
          <FocusableItem key={i} disabled={disabledItems?.includes(i + 1)}>
            {i + 1}
          </FocusableItem>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
