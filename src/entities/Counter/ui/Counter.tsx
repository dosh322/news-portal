import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTheme } from "shared/ui/Button";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { counterActions } from "../model/slice/CounterSlice";

function Counter() {
    const dispatch = useDispatch();
    const value = useSelector(getCounterValue);
    const inc = () => {
        dispatch(counterActions.increment());
    };

    const dec = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h2>{value}</h2>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={inc}
                data-testid="increment-btn"
            ></Button>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={dec}
                data-testid="decrement-btn"
            ></Button>
        </div>
    );
}

export { Counter };
