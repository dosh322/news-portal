import clsx from "clsx";
import classes from "./Text.module.scss";

export enum TextTheme {
    PRIMARY = "primary",
    ERROR = "error",
}

interface Props {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
}

function Text({ className, title, text, theme = TextTheme.PRIMARY }: Props) {
    return (
        <div className={clsx(classes[theme], className)}>
            {title && <p className={classes.title}>{title}</p>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
}

export { Text };
