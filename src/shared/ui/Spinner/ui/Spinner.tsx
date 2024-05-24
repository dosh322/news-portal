import clsx from "clsx";
import classes from "./Spinner.module.scss";

interface Props {
    className?: string;
}

function Spinner({ className }: Props) {
    return <div className={clsx(classes.spinner, className)} />;
}

export { Spinner };
