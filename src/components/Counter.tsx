import React, { useState } from 'react';
import classes from './Counter.module.scss';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prev) => prev +1);
    };

    const decrement = () => {
        setCount((prev) => prev - 1);
    }

    return (
        <div>
            <button type="button" onClick={increment}>Increment</button>
            <button type="button" onClick={decrement}>Decrement</button>
            <h1 className={classes.counter}>{count}</h1>
        </div>
    );
}

export default Counter;