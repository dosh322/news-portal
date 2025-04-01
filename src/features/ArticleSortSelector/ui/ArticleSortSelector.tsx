import { SortOrder } from "@/shared/types";
import { Select, SelectOption } from "@/shared/ui/Select";
import clsx from "clsx";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortFields } from "@/entities/Article";
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

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
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

    const sortFieldOptions = useMemo<SelectOption<ArticleSortFields>[]>(
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

    return (
        <div className={clsx(cls.ArticleSortSelector, className)}>
            <Select
                options={sortFieldOptions}
                label={t("sort")}
                selectedValue={sort}
                onChange={onChangeSort}
            />
            <Select
                options={orderOptions}
                label={t("sort")}
                selectedValue={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
