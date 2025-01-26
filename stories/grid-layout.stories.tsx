import type { Meta, StoryObj } from '@storybook/react';

import { GridLayout } from './grid-layout';

const meta = {
  title: 'Examples/Grid Layout',
  component: GridLayout,
} satisfies Meta<typeof GridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FixedColumns: Story = {
  args: {
    itemCount: 12,
    columnCount: 'fixed',
  },
};

export const ResponsiveColumns: Story = {
  args: {
    itemCount: 50,
    columnCount: 'responsive',
  },
};

export const StressTest: Story = {
  args: {
    itemCount: 10000,
    columnCount: 'responsive',
  },
};
