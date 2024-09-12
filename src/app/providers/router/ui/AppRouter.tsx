import App from "app/App";
import ErrorBoundary from "app/providers/ErrorBoundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "shared/config/routesConfig";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        ),
        children: routesConfig,
    },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;
