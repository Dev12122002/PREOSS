import React, { useState } from 'react'
import './Home.css';

export default function Home() {

    // eslint-disable-next-line
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className='container w-75 hctn mt-5'><p>{token}</p></div>
    )
}
