import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Spinner } from "./Spinner";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "shared/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
