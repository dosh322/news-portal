import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlePage } from "@/pages/ArticlePage";
import { ArticlesListPage } from "@/pages/ArticlesListPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AppRoutesProps, routePaths } from "@/shared/config/routesConfig";
import { RequireAuth } from "../ui/RequireAuth";

export const createRoutesConfig = (
    isAdmin: boolean,
    isManager: boolean,
): AppRoutesProps[] => {
    const routes = [
        { path: routePaths.home, element: <HomePage /> },
        { path: routePaths.about, element: <AboutPage /> },
        {
            path: routePaths.articles,
            element: (
                <RequireAuth>
                    <ArticlesListPage />
                </RequireAuth>
            ),
        },
        {
            path: `${routePaths.article}:id`,
            element: (
                <RequireAuth>
                    <ArticlePage />
                </RequireAuth>
            ),
        },
        {
            path: `${routePaths.article_create}`,
            element: (
                <RequireAuth>
                    <ArticleEditPage />
                </RequireAuth>
            ),
        },
        {
            path: `${routePaths.article_edit}`,
            element: (
                <RequireAuth>
                    <ArticleEditPage />
                </RequireAuth>
            ),
        },
        {
            path: `${routePaths.profile}:id`,
            element: (
                <RequireAuth>
                    <ProfilePage />
                </RequireAuth>
            ),
        },
        {
            path: routePaths.any,
            element: <NotFoundPage />,
        },
    ];

    if (isAdmin || isManager) {
        routes.push({
            path: `${routePaths.admin_panel}`,
            element: (
                <RequireAuth>
                    <AdminPanelPage />
                </RequireAuth>
            ),
        });
    }

    return routes;
};
