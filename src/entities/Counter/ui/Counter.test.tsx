import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "shared/lib/tests/renderComponent";
import { Counter } from "./Counter";

describe("Counter", () => {
    it("should render into the document", () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });

        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("should increment value", async () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });
        expect(screen.getByText("10")).toBeInTheDocument();
        await userEvent.click(screen.getByTestId("increment-btn"));

        expect(screen.queryByText("10")).not.toBeInTheDocument();
        expect(screen.getByText("11")).toBeInTheDocument();
    });

    it("should decrement value", async () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });
        expect(screen.getByText("10")).toBeInTheDocument();
        await userEvent.click(screen.getByTestId("decrement-btn"));

        expect(screen.queryByText("10")).not.toBeInTheDocument();
        expect(screen.getByText("9")).toBeInTheDocument();
    });
});
