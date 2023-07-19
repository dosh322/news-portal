import React from 'react';
import { Link } from "react-router-dom";

function AboutPage() {
    return (
        <div>
            <h1>About page</h1>
            <Link to={"/"}>Back</Link>
        </div>
    );
}

export default AboutPage;