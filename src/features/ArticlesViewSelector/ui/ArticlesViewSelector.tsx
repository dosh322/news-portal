import clsx from "clsx";
import { ArticleView } from "@/entities/Article";
import { memo } from "react";
import ListIcon from "@/shared/assets/icons/list-24-24.svg";
import TiledIcon from "@/shared/assets/icons/tiled-24-24.svg";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import classes from "./ArticlesViewSelector.module.scss";

interface ArticlesViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const VIEW_TYPES = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

export const ArticlesViewSelector = memo(function ArticlesViewSelector({
    className,
    view,
    onViewClick,
}: ArticlesViewSelectorProps) {
    const handleClick = (newView: ArticleView) => () => {
        if (onViewClick) {
            onViewClick(newView);
        }
    };

    return (
        <div className={clsx(classes.ArticlesViewSelector, className)}>
            {VIEW_TYPES.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={handleClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={clsx(viewType.view !== view && classes.notSelected)}
                    />
                </Button>
            ))}
        </div>
    );
});
