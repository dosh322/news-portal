import clsx from "clsx";
import { memo } from "react";
import classes from "./Overlay.module.scss";

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo(function Overlay({ className, onClick }: OverlayProps) {
    return <div onClick={onClick} className={clsx(classes.Overlay, className)} />;
});
