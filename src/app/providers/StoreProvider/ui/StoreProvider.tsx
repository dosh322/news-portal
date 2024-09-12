import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface Props {
    initialState?: DeepPartial<StateSchema>;
}

function StoreProvider({ children, initialState }: PropsWithChildren<Props>) {
    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
}

export { StoreProvider };
