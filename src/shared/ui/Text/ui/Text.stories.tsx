import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Text, TextTheme } from "./Text";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "shared/Text",
    component: Text,
    tags: ["autodocs"],
    args: { title: "Заголовок:", text: "Текст" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Error: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
};

export const DarkError: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
    decorators: ThemeDecorator(Theme.DARK),
};

export const PrimaryDark: Story = {
    decorators: ThemeDecorator(Theme.DARK),
};

export const OnlyTitle: Story = {
    args: {
        text: undefined,
    },
};

export const DarkonlyTitle: Story = {
    args: {
        text: undefined,
    },
    decorators: ThemeDecorator(Theme.DARK),
};

export const OnlyText: Story = {
    args: {
        title: undefined,
    },
};

export const DarkOnlyText: Story = {
    args: {
        title: undefined,
    },
    decorators: ThemeDecorator(Theme.DARK),
};
