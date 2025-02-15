import { getQueryParams } from "./addQueryParams";

describe("shared/url/addQueryParams", () => {
    test("test with one param", () => {
        const params = getQueryParams({
            test: "value",
        });
        expect(params).toBe("?test=value");
    });
    test("test with multiple params", () => {
        const params = getQueryParams({
            test: "value",
            second: "2",
        });
        expect(params).toBe("?test=value&second=2");
    });
    test("test with undefined", () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const params = getQueryParams({
            test: "value",
            second: undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        expect(params).toBe("?test=value");
    });
});
