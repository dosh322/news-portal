import clsx from "clsx";

import { getUser, userActions } from "entities/User";
import { LoginModal } from "features/authByUserName";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAppDispatch from "shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={clsx(classes.links)}
                    onClick={handleLogout}
                >
                    {t("logout")}
                </Button>
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
}

export { Navbar };
