import { AppRouter } from "app/providers/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "shared/config/i18n";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <AppRouter />
    </StrictMode>,
);
