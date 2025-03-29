import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { PageLoader } from "./PageLoader";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "widgets/PageLoader",
    component: PageLoader,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
