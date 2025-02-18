import clsx from "clsx";
import { memo, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import classes from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

const AppLink = memo(function AppLink(props: PropsWithChildren<AppLinkProps>) {
    const { children, className, theme = AppLinkTheme.PRIMARY, ...linkProps } = props;

    return (
        <Link {...linkProps} className={clsx(classes.AppLink, classes[theme], className)}>
            {children}
        </Link>
    );
});

export { AppLink };
