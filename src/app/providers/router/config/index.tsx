import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlePage } from "@/pages/ArticlePage";
import { ArticlesListPage } from "@/pages/ArticlesListPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticle,
    getRouteArticleCreate,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteHome,
    getRouteNotFound,
    getRouteProfile,
} from "@/shared/constants/router";
import { AppRoutesProps } from "@/shared/types/router";
import { RequireAuth } from "../ui/RequireAuth";

export const createRoutesConfig = (
    isAdmin: boolean,
    isManager: boolean,
): AppRoutesProps[] => {
    const routes = [
        { path: getRouteHome(), element: <HomePage /> },
        { path: getRouteAbout(), element: <AboutPage /> },
        {
            path: getRouteArticles(),
            element: (
                <RequireAuth>
                    <ArticlesListPage />
                </RequireAuth>
            ),
        },
        {
            path: getRouteArticle(":id"),
            element: (
                <RequireAuth>
                    <ArticlePage />
                </RequireAuth>
            ),
        },
        {
            path: getRouteArticleCreate(),
            element: (
                <RequireAuth>
                    <ArticleEditPage />
                </RequireAuth>
            ),
        },
        {
            path: getRouteArticleEdit(":id"),
            element: (
                <RequireAuth>
                    <ArticleEditPage />
                </RequireAuth>
            ),
        },
        {
            path: getRouteProfile(":id"),
            element: (
                <RequireAuth>
                    <ProfilePage />
                </RequireAuth>
            ),
        },
        {
            path: getRouteNotFound(),
            element: <NotFoundPage />,
        },
    ];

    if (isAdmin || isManager) {
        routes.push({
            path: getRouteAdminPanel(),
            element: (
                <RequireAuth>
                    <AdminPanelPage />
                </RequireAuth>
            ),
        });
    }

    return routes;
};
