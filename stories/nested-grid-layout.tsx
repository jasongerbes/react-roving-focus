import { RovingFocusGroup } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';
import { cn } from './utils';

export interface NestedGridLayoutProps {
  disabledItems?: number[];
}

export function NestedGridLayout({
  disabledItems = [],
}: NestedGridLayoutProps) {
  const startItemIds: number[] = [1, 2, 3, 4];
  const nestedItemIds: number[] = [5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9];
  const endItemIds: number[] = [6, 7, 8, 9, 10, 11];

  return (
    <RovingFocusGroup>
      <LayoutContainer className={cn('grid grid-cols-3')}>
        {startItemIds.map((id) => (
          <FocusableItem key={id} disabled={disabledItems.includes(id)}>
            {id.toString()}
          </FocusableItem>
        ))}

        <div className="row-span-2 grid grid-cols-3 gap-2">
          {nestedItemIds.map((id) => (
            <FocusableItem
              key={id}
              className="py-0"
              disabled={disabledItems.includes(id)}
            >
              {id.toString()}
            </FocusableItem>
          ))}
        </div>

        {endItemIds.map((id) => (
          <FocusableItem key={id} disabled={disabledItems.includes(id)}>
            {id.toString()}
          </FocusableItem>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
