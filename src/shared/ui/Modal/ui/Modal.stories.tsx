import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Modal } from "./Modal";
import { Theme } from "@/shared/constants/theme";

const meta = {
    title: "shared/Modal",
    component: Modal,
    tags: ["autodocs"],
    args: { isOpen: true },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children:
            "Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal",
    },
};

export const Dark: Story = {
    args: {
        children:
            "Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal Random Text for Modal",
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
