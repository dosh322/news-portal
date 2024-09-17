import type { Meta, StoryObj } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator";
import LoginForm from "./LoginForm";

const meta = {
    title: "features/LoginForm",
    component: LoginForm,
    tags: ["autodocs"],
    args: {},
    decorators: [StoreDecorator({ loginForm: { username: "user", password: "pwd" } })],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const ErrorForm: Story = {
    decorators: [
        StoreDecorator({
            loginForm: { username: "user", password: "pwd", error: "ERROR" },
        }),
    ],
};

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            loginForm: { username: "user", password: "pwd", isLoading: true },
        }),
    ],
};
