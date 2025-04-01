import { articleSelectors } from "@/entities/Article";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/constants/router";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
import clsx from "clsx";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
    className?: string;
}

function ArticlePageHeader({ className }: Props) {
    const { t } = useTranslation("article");
    const { id } = useParams();
    const navigate = useNavigate();
    const showEditBtn = useSelector(articleSelectors.selectCanEditArticle);

    const handleBackBtnClick = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const handleEditBtnClick = useCallback(() => {
        if (id) {
            navigate(getRouteArticleEdit(id));
        }
    }, [navigate, id]);

    return (
        <HStack max justify="between" className={clsx(className)}>
            <Button theme={ButtonTheme.OUTLINE} onClick={handleBackBtnClick}>
                {t("back to list")}
            </Button>
            {showEditBtn && (
                <Button theme={ButtonTheme.OUTLINE} onClick={handleEditBtnClick}>
                    {t("edit article")}
                </Button>
            )}
        </HStack>
    );
}

export { ArticlePageHeader };
