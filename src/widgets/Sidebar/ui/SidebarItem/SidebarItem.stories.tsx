import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { routePaths } from "shared/config/routesConfig";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { SidebarItem } from "./SidebarItem";

import MainIcon from "shared/assets/icons/main-20-20.svg";

const meta = {
    title: "widgets/SidebarItem",
    component: SidebarItem,
    tags: ["autodocs"],
    args: {
        item: {
            path: routePaths.home,
            Icon: MainIcon,
            text: "home page",
        },
        collapsed: false,
    },
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Collapsed: Story = {
    args: {
        collapsed: true,
    },
};
