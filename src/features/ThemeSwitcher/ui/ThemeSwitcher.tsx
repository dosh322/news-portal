import DarkThemeIcon from "@/shared/assets/icons/dark-theme-icon.svg";
import LightThemeIcon from "@/shared/assets/icons/light-theme-icon.svg";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import clsx from "clsx";
import { memo } from "react";
import classes from "./ThemeSwitcher.module.scss";
import { Theme } from "@/shared/constants/theme";

interface ThemeSwitcherProps {
    className?: string;
}

const ThemeSwitcher = memo(function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            className={clsx(
                theme === Theme.LIGHT && classes["light-theme-logo"],
                theme === Theme.DARK && classes["dark-theme-logo"],
                className,
            )}
            onClick={toggleTheme}
            theme={ButtonTheme.CLEAR}
        >
            {theme === Theme.LIGHT ? (
                <LightThemeIcon width={32} height={32} />
            ) : (
                <DarkThemeIcon width={32} height={32} />
            )}
        </Button>
    );
});

export { ThemeSwitcher };
