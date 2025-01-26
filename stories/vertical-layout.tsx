import { RovingFocusGroup } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';
import { cn } from './utils';

export interface VerticalLayoutProps {
  itemCount: number;
  scroll: boolean;
}

export function VerticalLayout({ itemCount, scroll }: VerticalLayoutProps) {
  return (
    <RovingFocusGroup>
      <LayoutContainer
        className={cn('flex flex-col', scroll && 'max-h-72 overflow-y-scroll')}
      >
        {Array.from({ length: itemCount }, (_, i) => (
          <FocusableItem key={i}>{i + 1}</FocusableItem>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
