import { ReducersMapObject } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface Props {
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

function StoreProvider({
    children,
    initialState,
    asyncReducers,
}: PropsWithChildren<Props>) {
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    );

    return <Provider store={store}>{children}</Provider>;
}

export { StoreProvider };
