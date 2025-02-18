import { RouteObject } from "react-router-dom";

export type AppRoutesProps = RouteObject & {
    authOnly?: boolean;
};

export enum APP_ROUTES {
    HOME = "home",
    ABOUT = "about",
    PROFILE = "profile",
    ARTICLES = "articles",
    ARTICLE = "article",
    ARTICLE_CREATE = "article_create",
    ARTICLE_EDIT = "article_edit",
    NOT_FOUND = "any",
}

export const routePaths: Record<APP_ROUTES, string> = {
    [APP_ROUTES.HOME]: "/",
    [APP_ROUTES.ABOUT]: "/about",
    [APP_ROUTES.PROFILE]: "/profile/", // + :id
    [APP_ROUTES.ARTICLES]: "/articles",
    [APP_ROUTES.ARTICLE]: "/articles/", // + :id
    [APP_ROUTES.ARTICLE_CREATE]: "/articles/new",
    [APP_ROUTES.ARTICLE_EDIT]: "/articles/:id/edit",
    [APP_ROUTES.NOT_FOUND]: "*",
};
