import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: () => void;
}

function Button({
    className,
    onClick,
    children,
    ...buttonProps
}: PropsWithChildren<ButtonProps>) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(classes.Button, className)}
            {...buttonProps}
        >
            {children}
        </button>
    );
}

export { Button };
