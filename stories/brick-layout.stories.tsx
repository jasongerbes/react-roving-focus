import type { Meta, StoryObj } from '@storybook/react';

import BrickLayout from './brick-layout';

const meta = {
  title: 'Examples/Brick Layout',
  component: BrickLayout,
} satisfies Meta<typeof BrickLayout>;

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
