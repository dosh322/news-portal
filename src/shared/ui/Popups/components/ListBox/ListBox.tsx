import {
    Listbox as HListBox,
    ListboxButton as HListboxButton,
    ListboxOption as HListboxOption,
    ListboxOptions as HListboxOptions,
} from "@headlessui/react";
import { AnchorPropsWithSelection } from "@headlessui/react/dist/internal/floating";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { Button } from "../../../Button";
import { HStack } from "../../../Stack";
import popupClasses from "../../styles/popup.module.scss";
import classes from "./ListBox.module.scss";

export interface ListBoxItem {
    key: string;
    value: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: AnchorPropsWithSelection;
    label?: string;
}

export function ListBox({
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom start",
    label,
}: ListBoxProps) {
    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={clsx(popupClasses.popup, className)}
                value={value}
                onChange={onChange}
            >
                <HListboxButton disabled={readonly} className={popupClasses.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListboxButton>
                <HListboxOptions anchor={direction} className={clsx(classes.options)}>
                    {items?.map((item) => (
                        <HListboxOption
                            key={item.key}
                            value={item.key}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ focus, selected }) => (
                                <li
                                    className={clsx(
                                        classes.item,
                                        (focus || selected) && popupClasses.active,
                                        item.disabled && popupClasses.disabled,
                                    )}
                                >
                                    {selected && "!!!"}
                                    {item.value}
                                </li>
                            )}
                        </HListboxOption>
                    ))}
                </HListboxOptions>
            </HListBox>
        </HStack>
    );
}
