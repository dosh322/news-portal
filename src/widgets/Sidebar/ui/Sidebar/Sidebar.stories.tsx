import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Sidebar } from "./Sidebar";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "widgets/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    // args: {
    //     children: "Button",
    // },
};

export const Dark: Story = {
    // args: {
    //     children: "Disabled Button",
    //     disabled: true,
    // },
    decorators: [ThemeDecorator(Theme.DARK)],
};
