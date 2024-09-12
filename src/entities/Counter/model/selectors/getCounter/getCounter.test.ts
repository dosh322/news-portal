import { StateSchema } from "app/providers/StoreProvider";
import { getCounter } from "./getCounter";

describe("getCounter", () => {
    it("should return correct value", () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});