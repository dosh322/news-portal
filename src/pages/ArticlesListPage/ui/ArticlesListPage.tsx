import clsx from "clsx";
import { memo } from "react";

interface Props {
    className?: string;
}

function ArticlesListPage({ className }: Props) {
    return <div className={clsx()}></div>;
}

export default memo(ArticlesListPage);
