import React from 'react';
import Counter from "../../components/Counter";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to={"/about"}>About Page</Link>
            <Counter />
        </div>
    );
}

export default HomePage;