import clsx from "clsx";
import { getUser } from "@/entities/User";
import { LoginModal } from "@/features/authByUserName";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { routePaths } from "@/shared/config/routesConfig";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

const Navbar = memo(function Navbar({ className }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { t } = useTranslation();
    const user = useSelector(getUser);

    const handleModalOpen = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

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
                <HStack gap="16" className={classes.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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
