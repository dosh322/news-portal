import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Button, ButtonTheme } from "shared/ui/Button";

const meta = {
    title: "shared/Button",
    component: Button,
    tags: ["autodocs"],
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Button",
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
    },
};

export const Outlined: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
        theme: ButtonTheme.OUTLINE,
    },
};

export const OutlinedDark: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
