import { SortOrder } from "@/shared/types";
import { Select, SelectOption } from "@/shared/ui/Select";
import clsx from "clsx";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortFields } from "../../model/types";
import cls from "./ArticleSortSelector.module.scss";
export type { SelectOption } from "@/shared/ui/Select";

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortFields;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortFields) => void;
}

export const ArticleSortSelector = memo(function ArticleSortSelector({
    className,
    onChangeOrder,
    onChangeSort,
    order,
    sort,
}: ArticleSortSelectorProps) {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption[]>(
        () => [
            {
                key: "asc",
                value: t("asc"),
            },
            {
                key: "desc",
                value: t("desc"),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption[]>(
        () => [
            {
                key: ArticleSortFields.CREATED,
                value: t("byCreateAt"),
            },
            {
                key: ArticleSortFields.TITLE,
                value: t("byName"),
            },
            {
                key: ArticleSortFields.VIEWS,
                value: t("byViews"),
            },
        ],
        [t],
    );

    const handleSortChange = useCallback(
        (newSort: string) => {
            onChangeSort(newSort as ArticleSortFields);
        },
        [onChangeSort],
    );

    const handleOrderChange = useCallback(
        (newOrder: string) => {
            onChangeOrder(newOrder as SortOrder);
        },
        [onChangeOrder],
    );

    return (
        <div className={clsx(cls.ArticleSortSelector, className)}>
            <Select
                options={sortFieldOptions}
                label={t("sort")}
                selectedValue={sort}
                onChange={handleSortChange}
            />
            <Select
                options={orderOptions}
                label={t("sort")}
                selectedValue={order}
                onChange={handleOrderChange}
                className={cls.order}
            />
        </div>
    );
});
