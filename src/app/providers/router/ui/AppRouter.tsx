import App from "app/App";
import ErrorBoundary from "app/providers/ErrorBoundary";
import { StoreProvider } from "app/providers/StoreProvider";
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
    return <RouterProvider router={router} />;
}

export default AppRouter;
