import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnchorProps } from "@headlessui/react/dist/internal/floating";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { AppLink } from "../AppLink";
import classes from "./Dropdown.module.scss";

export interface DropdownItem {
    key: string;
    disabled?: boolean;
    value?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: AnchorProps;
    trigger: ReactNode;
}

export function Dropdown({
    className,
    trigger,
    items,
    direction = "bottom end",
}: DropdownProps) {
    return (
        <Menu as="div" className={clsx(classes.Dropdown, className)}>
            <MenuButton className={classes.btn}>{trigger}</MenuButton>
            <MenuItems anchor={direction} className={classes.menu}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={clsx(classes.item, active && classes.active)}
                        >
                            {item.value}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <MenuItem
                                key={item.key}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem key={item.key} as={Fragment} disabled={item.disabled}>
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
