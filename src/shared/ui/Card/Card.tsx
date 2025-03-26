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
    max?: boolean;
}

export const Card = memo(function Card({
    className,
    children,
    theme = CardTheme.NORMAL,
    max = false,
    ...otherProps
}: PropsWithChildren<CardProps>) {
    return (
        <div
            className={clsx(classes.Card, className, classes[theme], max && classes.max)}
            {...otherProps}
        >
            {children}
        </div>
    );
});
