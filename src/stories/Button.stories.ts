import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'dark', 'light', 'alert'],
    },
    buttonType: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---- Primary (filled) ---- */

export const AccentPrimary: Story = {
  args: { variant: 'accent', buttonType: 'primary' },
};

export const DarkPrimary: Story = {
  args: { variant: 'dark', buttonType: 'primary' },
};

export const LightPrimary: Story = {
  args: { variant: 'light', buttonType: 'primary' },
  parameters: { backgrounds: { default: 'dark' } },
};

export const AlertPrimary: Story = {
  args: { variant: 'alert', buttonType: 'primary' },
};

/* ---- Secondary (outlined) ---- */

export const AccentSecondary: Story = {
  args: { variant: 'accent', buttonType: 'secondary' },
};

export const DarkSecondary: Story = {
  args: { variant: 'dark', buttonType: 'secondary' },
};

export const AlertSecondary: Story = {
  args: { variant: 'alert', buttonType: 'secondary' },
};

/* ---- Tertiary (ghost) ---- */

export const AccentTertiary: Story = {
  args: { variant: 'accent', buttonType: 'tertiary' },
};

export const DarkTertiary: Story = {
  args: { variant: 'dark', buttonType: 'tertiary' },
};

export const AlertTertiary: Story = {
  args: { variant: 'alert', buttonType: 'tertiary' },
};

/* ---- States ---- */

export const Disabled: Story = {
  args: { variant: 'accent', buttonType: 'primary', disabled: true },
};

export const DisabledSecondary: Story = {
  args: { variant: 'accent', buttonType: 'secondary', disabled: true },
};

export const DisabledTertiary: Story = {
  args: { variant: 'accent', buttonType: 'tertiary', disabled: true },
};

/* ---- Full Width ---- */

export const FullWidth: Story = {
  args: { variant: 'accent', buttonType: 'primary', fullWidth: true },
  parameters: { layout: 'padded' },
};
