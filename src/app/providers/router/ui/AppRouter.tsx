import App from "@/app/App";
import ErrorBoundary from "@/app/providers/ErrorBoundary";
import { selectIsUserAdmin, selectIsUserManager } from "@/entities/User";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoutesConfig } from "../config";

const createRouter = (isAdmin: boolean, isManager: boolean) =>
    createBrowserRouter([
        {
            path: "/",
            element: (
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            ),
            children: createRoutesConfig(isAdmin, isManager),
        },
    ]);

function AppRouter() {
    const isUserAdmin = useSelector(selectIsUserAdmin);
    const isUserManager = useSelector(selectIsUserManager);

    const router = useMemo(
        () => createRouter(isUserAdmin, isUserManager),
        [isUserAdmin, isUserManager],
    );

    return <RouterProvider router={router} />;
}

export default AppRouter;
