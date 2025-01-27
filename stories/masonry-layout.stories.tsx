import type { Meta, StoryObj } from '@storybook/react';

import { MasonryLayout } from './masonry-layout';

const meta = {
  title: 'Examples/Masonry Layout',
  component: MasonryLayout,
} satisfies Meta<typeof MasonryLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    rowCount: 6,
  },
};

export const DisabledItems: Story = {
  args: {
    rowCount: 6,
    disabledItems: [
      2, 3, 5, 7, 9, 12, 14, 15, 16, 17, 18, 19, 22, 25, 27, 29, 30, 32, 35, 37,
    ],
  },
};

export const StressTest: Story = {
  args: {
    rowCount: 1500,
  },
};
