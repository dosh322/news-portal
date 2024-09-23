import { memo, useCallback } from "react";
import { Select, SelectProps } from "shared/ui/Select";
import { Country } from "../model/types/country";

const options = [
    { key: Country.Russia, value: Country.Russia },
    { key: Country.Armenia, value: Country.Armenia },
    { key: Country.Belarus, value: Country.Belarus },
    { key: Country.Kazakhstan, value: Country.Kazakhstan },
];

interface Props extends Omit<SelectProps, "options" | "onChange"> {
    className?: string;
    onChange?: (value: Country) => void;
    value?: Country;
}

export const CountrySelect = memo(function CountrySelect({
    label,
    onChange,
    value,
    ...selectProps
}: Props) {
    const handleChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Country);
            }
        },
        [onChange],
    );

    return (
        <Select
            label={label}
            options={options}
            selectedValue={value}
            onChange={handleChange}
            {...selectProps}
        />
    );
});
