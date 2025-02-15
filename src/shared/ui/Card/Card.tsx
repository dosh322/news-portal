import clsx from "clsx";
import { HTMLAttributes, memo, PropsWithChildren } from "react";
import classes from "./Card.module.scss";

export enum CardTheme {
    NORMAL = "normal",
    OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
}

export const Card = memo(function Card({
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
}: PropsWithChildren<CardProps>) {
    return (
        <div className={clsx(classes.Card, className, classes[theme])} {...otherProps}>
            {children}
        </div>
    );
});
