import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NotFound.css';


export default function NotFound() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     navigate('/');
    // }, [navigate]);

    return (
        <div className='container-fluid bdy'>
            <div className='container error-ctn mt-0 text-center w-50'>
                <img src='/images/404.svg' alt='404 Not Found'></img>
            </div>
            <div className='container text-center mt-0'>
                <button className='btn mt-0 errbtn' onClick={() => navigate('/')}>Go to Home</button>
            </div>
        </div>
    )
}