import clsx from "clsx";
import { CSSProperties, memo } from "react";
import classes from "./Skeleton.module.scss";

interface Props {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

const Skeleton = memo(function Skeleton({ className, height, width, border }: Props) {
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return <div style={styles} className={clsx(classes.skeleton, className)} />;
});

export { Skeleton };
