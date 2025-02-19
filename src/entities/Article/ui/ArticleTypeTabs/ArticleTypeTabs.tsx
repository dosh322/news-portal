import clsx from "clsx";
import { ArticleType } from "../../model/types";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(function ArticleTypeTabs({
    className,
    value,
    onChangeType,
}: ArticleTypeTabsProps) {
    const { t } = useTranslation("articlesList");

    const tabs = useMemo<TabItem[]>(
        () => [
            {
                key: ArticleType.ALL,
                value: t("all"),
            },
            {
                key: ArticleType.IT,
                value: t("IT"),
            },
            {
                key: ArticleType.ECONOMICS,
                value: t("Economics"),
            },
            {
                key: ArticleType.SCIENCE,
                value: t("Science"),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.key as ArticleType);
        },
        [onChangeType],
    );

    return (
        <Tabs
            tabs={tabs}
            selectedValue={value}
            onTabClick={onTabClick}
            className={clsx(className)}
        />
    );
});
