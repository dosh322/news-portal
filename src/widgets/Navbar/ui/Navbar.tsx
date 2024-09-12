import clsx from "clsx";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Modal } from "shared/ui/Modal";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { t } = useTranslation();

    const toggleModalOpen = useCallback(() => {
        setIsAuthModalOpen((prev) => !prev);
    }, []);

    return (
        <nav className={clsx(classes.Navbar, className)}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={clsx(classes.links)}
                onClick={toggleModalOpen}
            >
                {t("login")}
            </Button>
            <Modal onClose={toggleModalOpen} isOpen={isAuthModalOpen}>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum
            </Modal>
        </nav>
    );
}

export { Navbar };
