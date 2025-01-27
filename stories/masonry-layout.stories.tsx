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
    rowCount: 10,
  },
};

export const StressTest: Story = {
  args: {
    rowCount: 1500,
  },
};
