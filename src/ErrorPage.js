// App.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div>
            <h3>Error</h3>
            <p>Page Not Found</p>
            <Link to='/'>Click here to return Home</Link>
        </div>
    );
}

export default ErrorPage;
