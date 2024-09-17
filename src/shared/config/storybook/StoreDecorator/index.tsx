import { ReducersMapObject } from "@reduxjs/toolkit";
import { StoryFn } from "@storybook/react/*";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { loginFormReducer } from "features/authByUserName/model/slices/loginFormSlice";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginFormReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) =>
    function StoreDecoratorComponent(Story: StoryFn) {
        return (
            <StoreProvider
                initialState={initialState}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <Story />
            </StoreProvider>
        );
    };
