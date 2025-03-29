import type { Meta, StoryObj } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import AboutPage from "./AboutPage";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "pages/AboutPage",
    component: AboutPage,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
