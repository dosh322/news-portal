import clsx from "clsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "widgets/Navbar";
import { PageLoader } from "widgets/PageLoader";
import { Sidebar } from "widgets/Sidebar";
import { useTheme } from "./providers/ThemeProvider";

function App() {
    const { theme } = useTheme();

    return (
        <div className={clsx("app", theme)}>
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
