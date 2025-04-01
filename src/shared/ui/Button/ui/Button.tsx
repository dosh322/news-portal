import clsx from "clsx";
import { ButtonHTMLAttributes, memo, PropsWithChildren } from "react";
import classes from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
    OUTLINE_RED = "outlineRed",
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
    /**
     * Тема кнопки
     */
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    fullWidth?: boolean;
}

const Button = memo(function Button({
    className,
    onClick,
    children,
    theme = ButtonTheme.OUTLINE,
    square = false,
    size = ButtonSize.M,
    disabled,
    fullWidth = false,
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
                disabled && classes.disabled,
                fullWidth && classes.fullWidth,
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
});

export { Button };
