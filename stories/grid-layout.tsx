import { RovingFocusGroup } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';
import { cn } from './utils';

export interface GridLayoutProps {
  itemCount: number;
  columnCount: 'fixed' | 'responsive';
}

export function GridLayout({ itemCount, columnCount }: GridLayoutProps) {
  return (
    <RovingFocusGroup>
      <LayoutContainer
        className={cn(
          'grid',
          columnCount === 'fixed' && 'grid-cols-3',
          columnCount === 'responsive' &&
            'grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]',
        )}
      >
        {Array.from({ length: itemCount }, (_, i) => (
          <FocusableItem key={i}>{i + 1}</FocusableItem>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
