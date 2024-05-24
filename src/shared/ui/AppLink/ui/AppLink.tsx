import { Theme, useTheme } from "app/providers/ThemeProvider";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import classes from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
    className?: string;
}

function AppLink(props: PropsWithChildren<AppLinkProps>) {
    const { children, className, ...linkProps } = props;
    const { theme } = useTheme();
    return (
        <Link
            {...linkProps}
            className={clsx(
                classes.AppLink,
                theme === Theme.DARK && classes.AppLink_dark,
                className,
            )}
        >
            {children}
        </Link>
    );
}

export { AppLink };
