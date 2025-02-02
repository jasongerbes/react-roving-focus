import type { Meta, StoryObj } from '@storybook/react';

import { VerticalLayout } from './vertical-layout';

const meta = {
  title: 'Examples/Vertical Layout',
  component: VerticalLayout,
} satisfies Meta<typeof VerticalLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    itemCount: 5,
    scroll: false,
  },
};

export const Scrollable: Story = {
  args: {
    itemCount: 50,
    scroll: true,
  },
};

export const DisabledItems: Story = {
  args: {
    itemCount: 5,
    scroll: false,
    disabledItems: [2, 3],
  },
};

export const StressTest: Story = {
  args: {
    itemCount: 10000,
    scroll: false,
  },
};
