import clsx from "clsx";
import { userActions } from "entities/User";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAppDispatch from "shared/lib/hooks/useAppDispatch";
import { Navbar } from "widgets/Navbar";
import { PageLoader } from "widgets/PageLoader";
import { Sidebar } from "widgets/Sidebar";
import { useTheme } from "./providers/ThemeProvider";

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
