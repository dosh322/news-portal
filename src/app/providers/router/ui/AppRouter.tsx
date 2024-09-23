import App from "app/App";
import ErrorBoundary from "app/providers/ErrorBoundary";
import { StoreProvider } from "app/providers/StoreProvider";
import { getUser } from "entities/User";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "shared/config/routesConfig";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ErrorBoundary>
        ),
        children: routesConfig,
    },
]);

function AppRouter() {
    const isAuth = useSelector(getUser);

    const router = useMemo(() => {
        const routes = routesConfig.filter(({ authOnly }) => {
            if (authOnly && !isAuth) {
                return false;
            }

            return true;
        });

        return createBrowserRouter([
            {
                path: "/",
                element: (
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                ),
                children: routes,
            },
        ]);
    }, [isAuth]);

    return <RouterProvider router={router} />;
}

export default AppRouter;
