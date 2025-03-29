import { LOCAL_STORAGE_THEME_KEY } from "@/shared/constants/localStorage";
import { Theme } from "@/shared/constants/theme";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/shared/lib/context/ThemeContext/ThemeContext";

interface Props {
    initialTheme?: Theme;
}

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

function ThemeProvider({ children, initialTheme }: PropsWithChildren<Props>) {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    useEffect(() => {
        document.body.className = theme;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
