import { PropsWithChildren, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../lib/ThemeContext";

interface Props {
    defaultTheme?: Theme;
}

function ThemeProvider({
    children,
    defaultTheme = Theme.LIGHT,
}: PropsWithChildren<Props>) {
    const initialTheme =
        (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || defaultTheme;
    const [theme, setTheme] = useState<Theme>(initialTheme);

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
