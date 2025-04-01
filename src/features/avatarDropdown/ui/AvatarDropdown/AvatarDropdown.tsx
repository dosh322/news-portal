import {
    getUser,
    selectIsUserAdmin,
    selectIsUserManager,
    userActions,
} from "@/entities/User";
import { routePaths } from "@/shared/constants/router";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(function AvatarDropdown({
    className,
}: AvatarDropdownProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsUserAdmin);
    const isManager = useSelector(selectIsUserManager);
    const user = useSelector(getUser);

    const handleLogout = () => {
        dispatch(userActions.logout());
    };

    if (!user) {
        return null;
    }

    return (
        <Dropdown
            className={clsx(className)}
            items={[
                ...(isAdmin || isManager
                    ? [
                          {
                              key: "admin",
                              value: t("admin page"),
                              href: routePaths.admin_panel,
                          },
                      ]
                    : []),
                {
                    key: "profile",
                    value: t("profile page"),
                    href: routePaths.profile + user.id,
                },
                { key: "logout", value: t("logout"), onClick: handleLogout },
            ]}
            trigger={<Avatar size={30} src={user.avatar} />}
        />
    );
});
