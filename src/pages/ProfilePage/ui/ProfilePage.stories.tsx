import type { Meta, StoryObj } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import ProfilePage from "./ProfilePage";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "pages/ProfilePage",
    component: ProfilePage,
    tags: ["autodocs"],
    args: {},
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
