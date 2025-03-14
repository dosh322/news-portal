import clsx from "clsx";
import { memo } from "react";
import Page from "@/widgets/Page/Page";
import { ArticlesInfiniteList } from "../ArticlesInfiniteList/ArticlesInfiniteList";
import ArticlesListPageFilters from "../ArticlesListPageFilters/ArticlesListPageFilters";
import classes from "./ArticlesListPage.module.scss";

interface Props {
    className?: string;
}

function ArticlesListPage({ className }: Props) {
    return (
        <Page className={clsx(className)}>
            <ArticlesListPageFilters />
            <ArticlesInfiniteList className={classes.list} />
        </Page>
    );
}

export default memo(ArticlesListPage);
