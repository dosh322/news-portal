import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface Props {
    initialState?: StateSchema;
}

function StoreProvider({ children, initialState }: PropsWithChildren<Props>) {
    const store = createReduxStore({
        initialState,
    });

    return <Provider store={store}>{children}</Provider>;
}

export { StoreProvider };
