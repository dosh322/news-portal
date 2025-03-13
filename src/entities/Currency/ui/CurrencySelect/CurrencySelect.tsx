import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/Popups";
import { Currency } from "../../model/types/types";

const options = [
    { key: Currency.RUB, value: Currency.RUB, disabled: true },
    { key: Currency.EUR, value: Currency.EUR },
    { key: Currency.USD, value: Currency.USD },
];

interface CurrencySelectProps {
    label?: string;
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readOnly?: boolean;
}

export const CurrencySelect = memo(function CurrencySelect({
    label,
    onChange,
    value,
    readOnly,
    className,
}: CurrencySelectProps) {
    const { t } = useTranslation("profile");
    const handleChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Currency);
            }
        },
        [onChange],
    );

    return (
        <ListBox
            label={label}
            className={className}
            value={value}
            defaultValue={t("yourCurrency")}
            items={options}
            onChange={handleChange}
            readonly={readOnly}
        />
    );
});
