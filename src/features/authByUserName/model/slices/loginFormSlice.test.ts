import { LoginFormSchema } from "../types/loginFormSchema";
import { loginFormActions, loginFormReducer } from "./loginFormSlice";

describe("loginFormSlice", () => {
    it("should correctly set username", () => {
        const state: DeepPartial<LoginFormSchema> = { username: "123" };

        expect(
            loginFormReducer(
                state as LoginFormSchema,
                loginFormActions.setUsername("123123"),
            ),
        ).toEqual({ username: "123123" });
    });

    it("should correctly set password", () => {
        const state: DeepPartial<LoginFormSchema> = { password: "qwe" };

        expect(
            loginFormReducer(
                state as LoginFormSchema,
                loginFormActions.setPassword("qweqwe"),
            ),
        ).toEqual({ password: "qweqwe" });
    });
});
