import clsx from "clsx";
import { FunctionComponent, memo, SVGAttributes } from "react";
import classes from "./Icon.module.scss";
interface Props {
    className?: string;
    Svg: FunctionComponent<SVGAttributes<SVGElement>>;
}

const Icon = memo(function Icon({ className, Svg }: Props) {
    return <Svg className={clsx(classes.icon, className)} />;
});

export { Icon };
