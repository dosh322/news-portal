import clsx from "clsx";
import {
    getUser,
    selectIsUserAdmin,
    selectIsUserManager,
    userActions,
} from "entities/User";
import { LoginModal } from "features/authByUserName";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { routePaths } from "shared/config/routesConfig";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink";
import { Avatar } from "shared/ui/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Text, TextTheme } from "shared/ui/Text";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

const Navbar = memo(function Navbar({ className }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const isAdmin = useSelector(selectIsUserAdmin);
    const isManager = useSelector(selectIsUserManager);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useSelector(getUser);

    const handleModalOpen = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const handleLogout = () => {
        dispatch(userActions.logout());
    };

    if (user) {
        return (
            <nav className={clsx(classes.Navbar, className)}>
                <Text
                    className={classes.appName}
                    theme={TextTheme.INVERTED}
                    title={t("ITFeed")}
                />
                <AppLink to={routePaths.article_create} theme={AppLinkTheme.SECONDARY}>
                    {t("create article")}
                </AppLink>
                <Dropdown
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
                    className={classes.dropdown}
                />
            </nav>
        );
    }

    return (
        <nav className={clsx(classes.Navbar, className)}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={clsx(classes.links)}
                onClick={handleModalOpen}
            >
                {t("login")}
            </Button>
            {isAuthModalOpen && (
                <LoginModal onClose={handleModalClose} isOpen={isAuthModalOpen} />
            )}
        </nav>
    );
});

export { Navbar };
