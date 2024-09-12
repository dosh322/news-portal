import { PropsWithChildren, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../lib/ThemeContext";

interface Props {
    initialTheme?: Theme;
}

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

function ThemeProvider({ children, initialTheme }: PropsWithChildren<Props>) {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme],
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
