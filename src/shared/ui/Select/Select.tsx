import clsx from "clsx";
import { ChangeEvent } from "react";
import classes from "./Select.module.scss";

export interface SelectOption<T extends string> {
    key: T;
    value: string;
}

export interface Props<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    selectedValue?: T;
    onChange?: (key: T) => void;
    readOnly?: boolean;
}

function Select<T extends string>({
    className,
    label,
    options,
    onChange,
    selectedValue,
    readOnly,
}: Props<T>) {
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
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
                    <option key={key} value={key} className={classes.option}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}

export { Select };
