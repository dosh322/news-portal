import clsx from "clsx";

import { LoginModal } from "features/authByUserName";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { t } = useTranslation();

    const handleModalOpen = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    return (
        <nav className={clsx(classes.Navbar, className)}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={clsx(classes.links)}
                onClick={handleModalOpen}
            >
                {t("login")}
            </Button>
            <LoginModal onClose={handleModalClose} isOpen={isAuthModalOpen} />
        </nav>
    );
}

export { Navbar };
