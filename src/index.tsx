import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import { HomePageLazy } from "./pages/HomePage/HomePage.lazy";
import { AboutPageLazy } from "./pages/AboutPage/AboutPage.lazy";
import ThemeProvider from "./theme/ThemeProvider";

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
    path: "/",
    element: (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    ),
    children: [
        {
            path: "/",
            element: <HomePageLazy />,
        },
        {
            path: "/about",
            element: <AboutPageLazy />,
        },
        {
            path: "*",
            element: <Navigate to={"/"} />
        }
    ]
}])

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);