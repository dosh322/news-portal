import { StateSchema } from "app/providers/StoreProvider";
import {
    getLoginFormError,
    getLoginFormIsLoading,
    getLoginFormPassword,
    getLoginFormState,
    getLoginFormUsername,
} from ".";

describe("authByUserName feature selectors", () => {
    const state: DeepPartial<StateSchema> = {
        loginForm: {
            error: "err",
            username: "name",
            password: "pwd",
            isLoading: true,
        },
    };

    describe("getLoginFormState", () => {
        it("should return form state", () => {
            expect(getLoginFormState(state as StateSchema)).toEqual(state.loginForm);
        });

        it("should work with empty state", () => {
            expect(getLoginFormState({} as StateSchema)).toEqual(undefined);
        });
    });

    describe("getLoginFormUsername", () => {
        it("should return form state", () => {
            expect(getLoginFormUsername(state as StateSchema)).toEqual(
                state.loginForm.username,
            );
        });

        it("should work with empty state", () => {
            expect(getLoginFormUsername({} as StateSchema)).toEqual("");
        });
    });

    describe("getLoginFormPassword", () => {
        it("should return form state", () => {
            expect(getLoginFormPassword(state as StateSchema)).toEqual(
                state.loginForm.password,
            );
        });

        it("should work with empty state", () => {
            expect(getLoginFormPassword({} as StateSchema)).toEqual("");
        });
    });

    describe("getLoginFormError", () => {
        it("should return form state", () => {
            expect(getLoginFormError(state as StateSchema)).toEqual(
                state.loginForm.error,
            );
        });

        it("should work with empty state", () => {
            expect(getLoginFormError({} as StateSchema)).toEqual(undefined);
        });
    });

    describe("getLoginFormIsLoading", () => {
        it("should return form state", () => {
            expect(getLoginFormIsLoading(state as StateSchema)).toEqual(
                state.loginForm.isLoading,
            );
        });

        it("should work with empty state", () => {
            expect(getLoginFormIsLoading({} as StateSchema)).toEqual(false);
        });
    });
});
