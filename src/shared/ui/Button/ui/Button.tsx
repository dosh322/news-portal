import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classes from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: () => void;
    theme?: ButtonTheme;
}

function Button({
    className,
    onClick,
    children,
    theme = ButtonTheme.CLEAR,
    ...buttonProps
}: PropsWithChildren<ButtonProps>) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(classes.Button, className, classes[theme])}
            {...buttonProps}
        >
            {children}
        </button>
    );
}

export { Button };
