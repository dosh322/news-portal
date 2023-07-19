import { Outlet } from "react-router-dom";

import "./styles/index.scss";
import { Suspense, useContext } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import { Theme, ThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
            <div className={`app ${theme === Theme.DARK ? 'app-dark-theme' : 'app-light-theme'}`}>
                <button type="button" onClick={toggleTheme}>TOGGLE THEME</button>
                <div>HEADER</div>
                <div>NAVBAR</div>
                <Suspense fallback={"Loading ..."}>
                    <Outlet />
                </Suspense>
            </div>
    );
}

export default App;