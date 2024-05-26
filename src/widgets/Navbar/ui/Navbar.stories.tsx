import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Navbar } from "./Navbar";

const meta = {
    title: "widgets/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof Navbar>;

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
