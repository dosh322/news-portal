import { AboutPage } from "pages/AboutPage";
import { ArticlePage } from "pages/ArticlePage";
import { ArticlesListPage } from "pages/ArticlesListPage";
import { HomePage } from "pages/HomePage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { AppRoutesProps, routePaths } from "shared/config/routesConfig";
import { RequireAuth } from "../ui/RequireAuth";

export const routesConfig: AppRoutesProps[] = [
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
