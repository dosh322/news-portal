import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
    title: "shared/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    args: {
        src: "https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png",
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
