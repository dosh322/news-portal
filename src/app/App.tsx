import { Theme, useTheme } from "app/providers/ThemeProvider";
import clsx from "clsx";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "widgets/Navbar";
import { PageLoader } from "widgets/PageLoader";
import { Sidebar } from "widgets/Sidebar";
import "./styles/index.scss";

function App() {
    const { theme } = useTheme();

    // useEffect(() => {
    //     throw new Error();
    // }, []);

    return (
        <div
            className={clsx("app", {
                "app-light-theme": theme === Theme.LIGHT,
                "app-dark-theme": theme === Theme.DARK,
            })}
        >
            <Suspense fallback={"Loading translations..."}>
                <Navbar />
                <div className="content-wrapper">
                    <Sidebar />
                    <main className="main-wrapper">
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </main>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
