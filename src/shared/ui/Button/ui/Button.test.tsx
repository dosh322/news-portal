import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
    it("should render into the document", () => {
        render(<Button>TEST</Button>);

        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
});
