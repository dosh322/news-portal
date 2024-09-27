import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "entities/User";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import ArticleIcon from "shared/assets/icons/article-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { routePaths } from "shared/config/routesConfig";
import { SidebarItemType } from "../types/sidebar";

export const selectSidebarItems = createSelector(getUser, (user) => {
    const items: SidebarItemType[] = [
        {
            path: routePaths.home,
            Icon: MainIcon,
            text: "home page",
        },
        {
            path: routePaths.about,
            Icon: AboutIcon,
            text: "about page",
        },
    ];

    if (user) {
        items.push(
            {
                path: `${routePaths.profile}${user?.id}`,
                Icon: ProfileIcon,
                text: "profile page",
                authOnly: true,
            },
            {
                path: routePaths.articles,
                Icon: ArticleIcon,
                text: "articles page",
                authOnly: true,
            },
        );
    }

    return items;
});
