import clsx from "clsx";
import { ChangeEvent, memo } from "react";
import classes from "./Select.module.scss";

interface SelectOption {
    key: string;
    value: string;
}

export interface Props {
    className?: string;
    label?: string;
    options?: SelectOption[];
    selectedValue?: string;
    onChange?: (key: string) => void;
    readOnly?: boolean;
}

const Select = memo(function Select({
    className,
    label,
    options,
    onChange,
    selectedValue,
    readOnly,
}: Props) {
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={clsx(className, classes.wrapper)}>
            {label && <span className={classes.label}>{`${label} >`}</span>}
            <select
                disabled={readOnly}
                className={classes.select}
                value={selectedValue}
                onChange={handleSelect}
            >
                {options?.map(({ key, value }) => (
                    <option key={key} className={classes.option}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
});

export { Select };
