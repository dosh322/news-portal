import { StoryFn } from "@storybook/react/*";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

export const StoreDecorator = (initialState: DeepPartial<StateSchema>) =>
    function StoreDecoratorComponent(Story: StoryFn) {
        return (
            <StoreProvider
                initialState={initialState as StateSchema} // To support injection of only needed reducers for tests and stories
            >
                <Story />
            </StoreProvider>
        );
    };
