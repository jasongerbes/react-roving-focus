import type { Meta, StoryObj } from '@storybook/react';

import { HorizontalLayout } from './horizontal-layout';

const meta = {
  title: 'Examples/Horizontal Layout',
  component: HorizontalLayout,
} satisfies Meta<typeof HorizontalLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    itemCount: 5,
    overflow: 'none',
  },
};

export const RTL: Story = {
  name: 'Right-to-Left',
  args: {
    itemCount: 5,
    overflow: 'none',
    dir: 'rtl',
  },
};

export const Scrollable: Story = {
  args: {
    itemCount: 50,
    overflow: 'scroll',
  },
};

export const Wrapped: Story = {
  args: {
    itemCount: 100,
    overflow: 'wrap',
  },
};

export const DisabledItems: Story = {
  args: {
    itemCount: 5,
    overflow: 'none',
    disabledItems: [1, 3],
  },
};

export const StressTest: Story = {
  args: {
    itemCount: 10000,
    overflow: 'wrap',
  },
};
