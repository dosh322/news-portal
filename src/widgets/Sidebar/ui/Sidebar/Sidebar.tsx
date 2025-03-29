import clsx from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { selectSidebarItems } from "../../model/selectors/selectors";
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
        <aside
            className={clsx(classes.Sidebar, isCollapsed && classes.collapsed, className)}
            data-testid="sidebar"
        >
            <VStack gap="8" role="navigation" className={classes.items}>
                {sidebarItems.map((item) => (
                    <SidebarItem item={item} collapsed={isCollapsed} key={item.path} />
                ))}
            </VStack>
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
        </aside>
    );
});

export { Sidebar };
