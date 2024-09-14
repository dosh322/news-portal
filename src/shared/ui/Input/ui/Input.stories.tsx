import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { InputProps } from "./Input";
import { Input } from "./Input";

function Template(props: InputProps) {
    const [val, setVal] = useState("123123");

    return (
        <Input
            onChange={(value) => {
                setVal(value);
            }}
            value={val}
            {...props}
        />
    );
}

const meta = {
    title: "shared/Input",
    component: Template,
    tags: ["autodocs"],
    args: { placeholder: "Type text..." },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
