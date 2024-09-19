import { AboutPage } from "pages/AboutPage";
import { HomePage } from "pages/HomePage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteObject } from "react-router-dom";

export enum APP_ROUTES {
    HOME = "home",
    ABOUT = "about",
    PROFILE = "profile",
    NOT_FOUND = "any",
}

export const routePaths: Record<APP_ROUTES, string> = {
    [APP_ROUTES.HOME]: "/",
    [APP_ROUTES.ABOUT]: "/about",
    [APP_ROUTES.PROFILE]: "/profile",
    [APP_ROUTES.NOT_FOUND]: "*",
};

export const routesConfig: RouteObject[] = [
    { path: routePaths.home, element: <HomePage /> },
    { path: routePaths.about, element: <AboutPage /> },
    {
        path: routePaths.profile,
        element: <ProfilePage />,
    },
    {
        path: routePaths.any,
        element: <NotFoundPage />,
    },
];
