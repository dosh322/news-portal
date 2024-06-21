import clsx from "clsx";

import { useTranslation } from "react-i18next";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();

    return (
        <nav className={clsx(classes.Navbar, className)}>
            <div className={clsx(classes.links)}>/</div>
        </nav>
    );
}

export { Navbar };
