import clsx from "clsx";
import { memo, ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";
import cls from "./Tabs.module.scss";

export interface TabItem {
    key: string;
    value: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    selectedValue: string;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo(function Tabs({
    className,
    tabs,
    onTabClick,
    selectedValue,
}: TabsProps) {
    const handleClick = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <div className={clsx(cls.Tabs, className)}>
            {tabs.map((tab) => (
                <Card
                    theme={
                        tab.key === selectedValue ? CardTheme.NORMAL : CardTheme.OUTLINED
                    }
                    className={cls.tab}
                    key={tab.key}
                    onClick={handleClick(tab)}
                >
                    {tab.value}
                </Card>
            ))}
        </div>
    );
});
