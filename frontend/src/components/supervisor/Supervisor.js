import React from 'react'
import './styles.css'

const Supervisor=()=>{
    const handleClick=()=>{
        alert('Redirecting to premium sign-up...')
    }

    return(
        <div className='supervisor-container'>
            <div className="top-right">
                <a className="tab-link" href="/homepage">Back</a>
                <a className="tab-link" href="/logout">Log out</a>
            </div>
            <h1>Become supervisor</h1>
            <p className='text'>Unlock supervisor features by upgrading to premium</p>
            <button onClick={handleClick} className='premium'>Get now</button>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Supervisor;