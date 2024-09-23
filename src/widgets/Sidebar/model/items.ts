import { FunctionComponent, SVGAttributes } from "react";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { routePaths } from "shared/config/routesConfig";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    {
        path: routePaths.profile,
        Icon: ProfileIcon,
        text: "profile page",
        authOnly: true,
    },
];
