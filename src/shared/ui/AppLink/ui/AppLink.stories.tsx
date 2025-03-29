import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { AppLink } from "./AppLink";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "shared/AppLink",
    component: AppLink,
    tags: ["autodocs"],
    args: {
        children: "Link",
        to: "/",
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
