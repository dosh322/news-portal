import { ReducersMapObject } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface Props {
    initialState?: StateSchema;
}

function StoreProvider({ children, initialState }: PropsWithChildren<Props>) {
    const navigate = useNavigate();
    const store = createReduxStore({
        initialState,
        navigate,
    });

    return <Provider store={store}>{children}</Provider>;
}

export { StoreProvider };
