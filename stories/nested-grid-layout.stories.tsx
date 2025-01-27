import type { Meta, StoryObj } from '@storybook/react';

import { NestedGridLayout } from './nested-grid-layout';

const meta = {
  title: 'Examples/Nested Grid Layout',
  component: NestedGridLayout,
} satisfies Meta<typeof NestedGridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const DisabledItems: Story = {
  args: {
    disabledItems: [1, 5, 6, 5.5, 5.6, 5.7, 7, 11],
  },
};
