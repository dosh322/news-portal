import clsx from "clsx";
import { FunctionComponent, memo, SVGAttributes } from "react";
import classes from "./Icon.module.scss";

interface Props {
    className?: string;
    Svg: FunctionComponent<SVGAttributes<SVGElement>>;
    inverted?: boolean;
}

const Icon = memo(function Icon({ className, Svg, inverted = false }: Props) {
    return (
        <Svg className={clsx(classes.icon, className, inverted && classes.inverted)} />
    );
});

export { Icon };
