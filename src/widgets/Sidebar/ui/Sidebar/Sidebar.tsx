import clsx from "clsx";
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import classes from "./Sidebar.module.scss";
import { Button } from "shared/ui/Button";
import { LangSwitcher } from "widgets/LangSwithcer";

interface SidebarProps {
    className?: string;
}

function Sidebar({ className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div
            className={clsx(classes.Sidebar, isCollapsed && classes.collapsed, className)}
        >
            <Button type="button" onClick={handleToggle} className={classes.toggleButton}>
                toggle
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher className={classes.ThemeSwitcher} />
                <LangSwitcher classname={classes.langSwitcher} />
            </div>
        </div>
    );
}

export { Sidebar };
