import clsx from "clsx";
import { getUser } from "@/entities/User";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppLink } from "@/shared/ui/AppLink";
import { SidebarItemType } from "../../model/types/sidebar";
import classes from "./SidebarItem.module.scss";

interface Props {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = memo(function SidebarItem({ item, collapsed }: Props) {
    const isAuth = useSelector(getUser);
    const { path, text, Icon } = item;
    const { t } = useTranslation();

    if (item.authOnly && !isAuth) {
        return null;
    }
    return (
        <AppLink to={path} className={clsx(classes.item, collapsed && classes.collapsed)}>
            <Icon className={classes.icon} />
            <span className={classes.link}>{t(text)}</span>
        </AppLink>
    );
});

export { SidebarItem };
