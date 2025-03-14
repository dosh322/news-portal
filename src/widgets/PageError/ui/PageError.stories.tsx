import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { PageError } from "./PageError";

const meta = {
    title: "widgets/PageError",
    component: PageError,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof PageError>;

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
