import UserFilled from "@/shared/assets/icons/user-filled.svg";
import clsx from "clsx";
import { CSSProperties } from "react";
import { AppImage } from "../AppImage";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";
import classes from "./Avatar.module.scss";

interface Props {
    src?: string;
    className?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

function Avatar({ className, src, size = 100, alt = "Avatar", fallbackInverted }: Props) {
    const styles: CSSProperties = {
        width: size,
        height: size,
    };

    return (
        <AppImage
            alt={alt}
            src={src}
            style={styles}
            className={clsx(classes.avatar, className)}
            fallback={<Skeleton width={size} height={size} border="50%" />}
            errorFallback={
                <Icon
                    inverted={fallbackInverted}
                    Svg={UserFilled}
                    width={size}
                    height={size}
                />
            }
        />
    );
}

export { Avatar };
