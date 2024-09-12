import { AppRouter } from "app/providers/router";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "shared/config/i18n";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <StoreProvider>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </StoreProvider>
    </StrictMode>,
);
