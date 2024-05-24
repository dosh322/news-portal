import { fireEvent, screen } from "@testing-library/react";
import { renderWithTranslations } from "shared/lib/tests/renderWithTranslations";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    it("should render into the document", () => {
        renderWithTranslations(<Sidebar />);

        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    it("should collapse", () => {
        renderWithTranslations(<Sidebar />);

        const toggleBtn = screen.getByTestId("toggle-btn");

        fireEvent.click(toggleBtn);

        expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
    });
});
