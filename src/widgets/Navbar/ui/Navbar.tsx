import { AppLink } from "shared/ui/AppLink";
import { routePaths } from "shared/config/routesConfig/routesConfig";
import clsx from "clsx";

import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    return (
        <nav className={clsx(classes.Navbar, className)}>
            <div className={clsx(classes.links)}>
                <AppLink to={routePaths.home}>Home Page</AppLink>
                <AppLink to={routePaths.about}>About Page</AppLink>
            </div>
        </nav>
    );
}

export { Navbar };
