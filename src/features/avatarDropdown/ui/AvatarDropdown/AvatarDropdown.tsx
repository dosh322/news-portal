import {
    getUser,
    selectIsUserAdmin,
    selectIsUserManager,
    userActions,
} from "@/entities/User";
import { getRouteAdminPanel, getRouteProfile } from "@/shared/constants/router";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(function AvatarDropdown({
    className,
}: AvatarDropdownProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
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
                              href: getRouteAdminPanel(),
                          },
                      ]
                    : []),
                {
                    key: "profile",
                    value: t("profile page"),
                    href: getRouteProfile(user.id),
                },
                { key: "logout", value: t("logout"), onClick: handleLogout },
            ]}
            trigger={<Avatar fallbackInverted size={30} src={user.avatar} />}
        />
    );
});
