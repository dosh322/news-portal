import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { PropsWithChildren, useEffect } from "react";
import { useStore } from "react-redux";
import useAppDispatch from "../hooks/useAppDispatch";

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface Props {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

function DynamicModuleLoader({
    children,
    reducers,
    removeAfterUnmount,
}: PropsWithChildren<Props>) {
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            Object.keys(reducers).forEach((name: StateSchemaKey) => {
                if (removeAfterUnmount) {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                }
            });
        };
        // eslint-disable-next-line
    }, []);

    return children;
}

export { DynamicModuleLoader };
