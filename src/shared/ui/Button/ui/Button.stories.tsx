import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Button, ButtonSize, ButtonTheme } from "./Button";

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
        children: "Outlined Button",
        theme: ButtonTheme.OUTLINE,
    },
};

export const OutlinedLarge: Story = {
    args: {
        children: "Outlined Large Button",
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L,
    },
};

export const OutlinedXLarge: Story = {
    args: {
        children: "Outlined XLarge Button",
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL,
    },
};

export const OutlinedDark: Story = {
    args: {
        children: "Outlined Button",
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const BackgroundTheme: Story = {
    args: {
        children: "Background Button",
        theme: ButtonTheme.BACKGROUND,
    },
};

export const SquareButton: Story = {
    args: {
        children: ">",
        square: true,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareLargeButton: Story = {
    args: {
        children: ">",
        square: true,
        size: ButtonSize.L,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareXLargeButton: Story = {
    args: {
        children: ">",
        square: true,
        size: ButtonSize.XL,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
