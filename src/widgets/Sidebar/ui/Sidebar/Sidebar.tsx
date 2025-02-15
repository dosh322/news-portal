import clsx from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button";
import { LangSwitcher } from "widgets/LangSwithcer";
import { selectSidebarItems } from "widgets/Sidebar/model/selectors/selectors";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import classes from "./Sidebar.module.scss";

interface SidebarProps {
    className?: string;
}

const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarItems = useSelector(selectSidebarItems);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <menu
            className={clsx(classes.Sidebar, isCollapsed && classes.collapsed, className)}
            data-testid="sidebar"
        >
            <div className={classes.items}>
                {sidebarItems.map((item) => (
                    <SidebarItem item={item} collapsed={isCollapsed} key={item.path} />
                ))}
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher className={classes.ThemeSwitcher} />
                <LangSwitcher classname={classes.langSwitcher} short={isCollapsed} />
            </div>
            <Button
                type="button"
                onClick={handleToggle}
                className={classes.collapsedBtn}
                data-testid="toggle-btn"
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {isCollapsed ? ">" : "<"}
            </Button>
        </menu>
    );
});

export { Sidebar };
