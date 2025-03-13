import clsx from "clsx";
import { memo } from "react";
import { Card, CardTheme } from "shared/ui/Card/Card";
import { Text } from "shared/ui/Text";
import { Notification } from "../../model/types/notification";
import classes from "./NotificationItem.module.scss";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo(function NotificationItem({
    className,
    item,
}: NotificationItemProps) {
    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={clsx(classes.NotificationItem, className)}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <a className={classes.link} target="_blank" href={item.href} rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
});
