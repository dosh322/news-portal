import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classes from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: () => void;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

function Button({
    className,
    onClick,
    children,
    theme = ButtonTheme.CLEAR,
    square = false,
    size = ButtonSize.M,
    ...buttonProps
}: PropsWithChildren<ButtonProps>) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                classes.Button,
                className,
                classes[theme],
                square && classes.square,
                classes[size],
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
}

export { Button };
