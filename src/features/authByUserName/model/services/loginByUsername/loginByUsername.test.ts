import axios from "axios";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByUsername } from "./loginByUsername";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, { shallow: false });

describe("loginByUsername", () => {
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;

    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    it("should correctly work witn 200 status code", async () => {
        const userData = { username: "123", id: "1" };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: "123", password: "123" });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.payload).toEqual(userData);
    });

    it("should correctly work witn 400 status code", async () => {
        mockedAxios.post.mockReturnValue(Promise.reject({ status: 403 }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: "123", password: "123" });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual("wrongLogin");
    });
});
