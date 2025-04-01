import { NotificationList } from "@/entities/Notification";
import NotificationIcon from "@/shared/assets/icons/notification-20-20.svg";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Drawer } from "@/shared/ui/Drawer";
import { Icon } from "@/shared/ui/Icon";
import { Popover } from "@/shared/ui/Popups";
import clsx from "clsx";
import { memo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(function NotificationButton({
    className,
}: NotificationButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

    const trigger = (
        <Button theme={ButtonTheme.CLEAR} onClick={handleDrawerOpen}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );

    return (
        <div>
            <BrowserView>
                <Popover
                    className={clsx(classes.NotificationButton, className)}
                    trigger={trigger}
                >
                    <NotificationList className={classes.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer onClose={handleDrawerClose} isOpen={isOpen}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
