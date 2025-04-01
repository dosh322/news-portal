import { getUser } from "@/entities/User";
import AboutIcon from "@/shared/assets/icons/about-20-20.svg";
import ArticleIcon from "@/shared/assets/icons/article-20-20.svg";
import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import ProfileIcon from "@/shared/assets/icons/profile-20-20.svg";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteHome,
    getRouteProfile,
} from "@/shared/constants/router";
import { createSelector } from "@reduxjs/toolkit";
import { SidebarItemType } from "../types/sidebar";

export const selectSidebarItems = createSelector(getUser, (user) => {
    const items: SidebarItemType[] = [
        {
            path: getRouteHome(),
            Icon: MainIcon,
            text: "home page",
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: "about page",
        },
    ];

    if (user) {
        items.push(
            {
                path: getRouteProfile(user.id),
                Icon: ProfileIcon,
                text: "profile page",
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticleIcon,
                text: "articles page",
                authOnly: true,
            },
        );
    }

    return items;
});
