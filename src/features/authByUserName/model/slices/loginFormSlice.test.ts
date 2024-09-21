import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { loginFormActions, loginFormReducer, loginFormSelectors } from "./loginFormSlice";

describe("loginFormSlice", () => {
    const initialState = {
        username: "",
        password: "",
        isLoading: false,
        error: undefined,
    };

    describe("reducers", () => {
        it("should handle setUsername", () => {
            const nextState = loginFormReducer(
                initialState,
                loginFormActions.setUsername("john_doe"),
            );
            expect(nextState.username).toBe("john_doe");
        });

        it("should handle setPassword", () => {
            const nextState = loginFormReducer(
                initialState,
                loginFormActions.setPassword("password123"),
            );
            expect(nextState.password).toBe("password123");
        });
    });

    describe("extraReducers", () => {
        it("should handle loginByUsername.pending", () => {
            const nextState = loginFormReducer(initialState, {
                type: loginByUsername.pending.type,
            });
            expect(nextState.isLoading).toBe(true);
            expect(nextState.error).toBeUndefined();
        });

        it("should handle loginByUsername.fulfilled", () => {
            const nextState = loginFormReducer(initialState, {
                type: loginByUsername.fulfilled.type,
            });
            expect(nextState.isLoading).toBe(false);
        });

        it("should handle loginByUsername.rejected", () => {
            const error = "Invalid credentials";
            const nextState = loginFormReducer(initialState, {
                type: loginByUsername.rejected.type,
                payload: error,
            });
            expect(nextState.isLoading).toBe(false);
            expect(nextState.error).toBe(error);
        });
    });

    describe("selectors", () => {
        const state = {
            loginForm: {
                username: "john_doe",
                password: "password123",
                isLoading: true,
                error: "Invalid credentials",
            },
        };

        it("selectLoginFormState should return the entire loginForm state", () => {
            expect(loginFormSelectors.selectLoginFormState(state)).toEqual(
                state.loginForm,
            );
        });

        it("selectLoginFormUsername should return the username", () => {
            expect(loginFormSelectors.selectLoginFormUsername(state)).toBe("john_doe");
        });

        it("selectLoginFormPassword should return the password", () => {
            expect(loginFormSelectors.selectLoginFormPassword(state)).toBe("password123");
        });

        it("selectLoginFormIsLoading should return the isLoading status", () => {
            expect(loginFormSelectors.selectLoginFormIsLoading(state)).toBe(true);
        });

        it("selectLoginFormError should return the error", () => {
            expect(loginFormSelectors.selectLoginFormError(state)).toBe(
                "Invalid credentials",
            );
        });
    });
});
