import clsx from "clsx";
import { selectCanEditArticle } from "entities/Article/model/selectors/article";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { routePaths } from "shared/config/routesConfig";
import { Button, ButtonTheme } from "shared/ui/Button";
import classes from "./ArticlePageHeader.module.scss";

interface Props {
    className?: string;
}

function ArticlePageHeader({ className }: Props) {
    const { t } = useTranslation("article");
    const { id } = useParams();
    const navigate = useNavigate();
    const showEditBtn = useSelector(selectCanEditArticle);

    const handleBackBtnClick = useCallback(() => {
        navigate(routePaths.articles);
    }, [navigate]);

    const handleEditBtnClick = useCallback(() => {
        navigate(`${routePaths.article}${id}/edit`);
    }, [navigate, id]);

    return (
        <div className={clsx(classes.articlePageHeader, className)}>
            <Button theme={ButtonTheme.OUTLINE} onClick={handleBackBtnClick}>
                {t("back to list")}
            </Button>
            {showEditBtn && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={handleEditBtnClick}
                    className={classes.editBtn}
                >
                    {t("edit article")}
                </Button>
            )}
        </div>
    );
}

export { ArticlePageHeader };
