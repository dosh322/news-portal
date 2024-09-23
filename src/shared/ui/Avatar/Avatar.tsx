import clsx from "clsx";
import { CSSProperties } from "react";
import classes from "./Avatar.module.scss";

interface Props {
    src?: string;
    className?: string;
    size?: number;
    alt?: string;
}

function Avatar({ className, src, size, alt = "Avatar" }: Props) {
    const styles: CSSProperties = {
        width: size || 100,
        height: size || 100,
    };

    return (
        <img
            alt={alt}
            src={src}
            style={styles}
            className={clsx(classes.avatar, className)}
        />
    );
}

export { Avatar };
