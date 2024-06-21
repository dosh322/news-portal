import { fireEvent, screen } from "@testing-library/react";
import { renderComponent } from "shared/lib/tests/renderComponent";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    it("should render into the document", () => {
        renderComponent(<Sidebar />);

        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    it("should collapse", () => {
        renderComponent(<Sidebar />);

        const toggleBtn = screen.getByTestId("toggle-btn");

        fireEvent.click(toggleBtn);

        expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
    });
});
