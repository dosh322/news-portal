import clsx from "clsx";
import { FunctionComponent, memo, SVGAttributes, SVGProps } from "react";
import classes from "./Icon.module.scss";

interface Props extends SVGProps<SVGElement> {
    className?: string;
    Svg: FunctionComponent<SVGAttributes<SVGElement>>;
    inverted?: boolean;
}

const Icon = memo(function Icon({ className, Svg, inverted = false, ...rest }: Props) {
    return (
        <Svg
            className={clsx(classes.icon, className, inverted && classes.inverted)}
            {...rest}
        />
    );
});

export { Icon };
