import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import HomePage from "./HomePage";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "pages/HomePage",
    component: HomePage,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
