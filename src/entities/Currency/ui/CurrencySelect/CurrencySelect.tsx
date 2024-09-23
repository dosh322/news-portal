import { Currency } from "entities/Currency/model/types/types";
import { memo, useCallback } from "react";
import { Select, SelectProps } from "shared/ui/Select";

const options = [
    { key: Currency.RUB, value: Currency.RUB },
    { key: Currency.EUR, value: Currency.EUR },
    { key: Currency.USD, value: Currency.USD },
];

interface Props extends Omit<SelectProps, "options" | "onChange"> {
    className?: string;
    onChange?: (value: Currency) => void;
    value?: Currency;
}

export const CurrencySelect = memo(function CurrencySelect({
    label,
    onChange,
    value,
    ...selectProps
}: Props) {
    const handleChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Currency);
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
