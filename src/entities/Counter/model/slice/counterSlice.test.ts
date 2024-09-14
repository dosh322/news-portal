import { CounterSchema } from "../types/counterSchema";
import { counterActions, counterReducer } from "./CounterSlice";

describe("counterReducer", () => {
    it("should correctly handle decrement action", () => {
        const state: CounterSchema = { value: 10 };

        expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
    });

    it("should correctly handle increment action", () => {
        const state: CounterSchema = { value: 10 };

        expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
    });

    it("should work with empty state", () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1,
        });
    });
});
