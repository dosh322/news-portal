import { AppRouter } from "app/providers/router";
import { ThemeProvider } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { createRoot } from "react-dom/client";
import "shared/config/i18n";

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        // <StrictMode>
        <ThemeProvider>
            <AppRouter />
        </ThemeProvider>,
        // </StrictMode>,
    );
}
