import { Theme, useTheme } from "app/providers/ThemeProvider";
import clsx from "clsx";
import DarkThemeIcon from "shared/assets/icons/dark-theme-icon.svg";
import LightThemeIcon from "shared/assets/icons/light-theme-icon.svg";
import { Button } from "shared/ui/Button";
import classes from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
    className?: string;
}

function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            className={clsx(
                theme === Theme.LIGHT && classes["light-theme-logo"],
                theme === Theme.DARK && classes["dark-theme-logo"],
                className,
            )}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? (
                <LightThemeIcon width={32} height={32} />
            ) : (
                <DarkThemeIcon width={32} height={32} />
            )}
        </Button>
    );
}

export { ThemeSwitcher };
