import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { AppLink } from "shared/ui/AppLink";
import { SidebarItemType } from "widgets/Sidebar/model/items";
import classes from "./SidebarItem.module.scss";

interface Props {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = memo(function SidebarItem({ item, collapsed }: Props) {
    const { path, text, Icon } = item;
    const { t } = useTranslation();
    return (
        <AppLink to={path} className={clsx(classes.item, collapsed && classes.collapsed)}>
            <Icon className={classes.icon} />
            <span className={classes.link}>{t(text)}</span>
        </AppLink>
    );
});

export { SidebarItem };
