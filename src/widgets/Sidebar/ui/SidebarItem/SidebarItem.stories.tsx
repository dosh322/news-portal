import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { getRouteHome } from "@/shared/constants/router";
import { Theme } from "@/shared/constants/theme";
import type { Meta, StoryObj } from "@storybook/react";
import { SidebarItem } from "./SidebarItem";

const meta = {
    title: "widgets/SidebarItem",
    component: SidebarItem,
    tags: ["autodocs"],
    args: {
        item: {
            path: getRouteHome(),
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
