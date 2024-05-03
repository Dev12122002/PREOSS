import React, { useState, useEffect } from 'react'
import './Home.css';

// useEffect(() => {
//     navigate('/');
// }, [navigate]);

export default function Home() {

    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className='container w-75 hctn mt-5'><p>{token}</p></div>
    )
}
