import { NotificationList } from "entities/Notification";
import { memo } from "react";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { Popover } from "shared/ui/Popups";
import classes from "./NotificationButton.module.scss";
import clsx from "clsx";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(function NotificationButton({
    className,
}: NotificationButtonProps) {
    return (
        <Popover
            className={clsx(classes.NotificationButton, className)}
            trigger={
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted />
                </Button>
            }
        >
            <NotificationList className={classes.notifications} />
        </Popover>
    );
});
