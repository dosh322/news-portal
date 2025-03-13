import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/Popups";
import { Country } from "../model/types/country";

const options = [
    { key: Country.Russia, value: Country.Russia },
    { key: Country.Armenia, value: Country.Armenia },
    { key: Country.Belarus, value: Country.Belarus },
    { key: Country.Kazakhstan, value: Country.Kazakhstan },
];

interface CountrySelectProps {
    label?: string;
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean;
}

export const CountrySelect = memo(function CountrySelect({
    label,
    onChange,
    value,
    className,
    readOnly,
}: CountrySelectProps) {
    const { t } = useTranslation("profile");

    const handleChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Country);
            }
        },
        [onChange],
    );

    return (
        <ListBox
            onChange={handleChange}
            label={label}
            value={value}
            items={options}
            defaultValue={t("yourCountry")}
            className={className}
            readonly={readOnly}
        />
    );
});
