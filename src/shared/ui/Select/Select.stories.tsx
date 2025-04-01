import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Props, Select } from "./Select";

function Wrapper(props: Props<string>) {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    return <Select selectedValue={selectedValue} onChange={handleChange} {...props} />;
}

const meta = {
    title: "shared/Select",
    component: Wrapper,
    tags: ["autodocs"],
    args: {
        label: "Label",
        options: [
            { key: "RUS", value: "Russia" },
            { key: "KZ", value: "Kazakhstan" },
        ],
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
