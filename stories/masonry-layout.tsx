import React from 'react';
import { RovingFocusGroup } from '../src';
import { FocusableItem } from './focusable-item';
import { LayoutContainer } from './layout-container';

const evenRowCols = [
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-2',
];

const oddRowCols = [
  'col-span-1',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-1',
];

export interface MasonryLayoutProps {
  rowCount: number;
  disabledItems?: number[];
}

export function MasonryLayout({ rowCount, disabledItems }: MasonryLayoutProps) {
  const rows = Array(rowCount)
    .fill(null)
    .map((_, rowIndex) => (rowIndex % 2 === 1 ? oddRowCols : evenRowCols));

  let itemCounter = 1;

  return (
    <RovingFocusGroup>
      <LayoutContainer className="grid grid-cols-12">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((colSpan) => (
              <FocusableItem
                key={itemCounter}
                className={colSpan}
                disabled={disabledItems?.includes(itemCounter)}
              >
                {itemCounter++}
              </FocusableItem>
            ))}
          </React.Fragment>
        ))}
      </LayoutContainer>
    </RovingFocusGroup>
  );
}
