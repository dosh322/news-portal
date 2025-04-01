export enum APP_ROUTES {
    HOME = "home",
    ABOUT = "about",
    PROFILE = "profile",
    ARTICLES = "articles",
    ARTICLE = "article",
    ARTICLE_CREATE = "article_create",
    ARTICLE_EDIT = "article_edit",
    ADMIN_PANEL = "admin_panel",
    NOT_FOUND = "any",
}

export const getRouteHome = () => "/";
export const getRouteAbout = () => "/about";
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => "/articles";
export const getRouteArticle = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => "/articles/new";
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => "/admin";
export const getRouteNotFound = () => "*";
