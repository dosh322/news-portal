import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@/app/providers/ThemeProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Navbar } from "./Navbar";

const meta = {
    title: "widgets/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    args: {},
    decorators: [StoreDecorator({})],
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

export const Authorized: Story = {
    // args: {
    //     children: "Disabled Button",
    //     disabled: true,
    // },
    decorators: [StoreDecorator({ user: { authData: {} } })],
};
