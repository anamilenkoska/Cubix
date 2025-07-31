import React, { useEffect, useState } from "react";
import axios from 'axios';
import api from '../../services/api'
import { useOutletContext } from 'react-router-dom'

function Homepage() {
    const { user } = useOutletContext()
    const [cubeTypes, setCubeType] = useState([]);

    useEffect(() => {
        console.log('page mounted')
        api.get('/')
            .then((res) => {
                const types = res.data.map(cube => cube.CubeType);
                setCubeType(types);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className="page-container">
            <div className="header">
                {/* <div className="tab-buttons">
                    <a className="tab-link" href="/signin">Sign in</a>
                    <a className="tab-link" href="/login">Log in</a>
                </div> */}

                <div className="tab-buttons">
                    {user ? (
                        <>Hi, { user.name }</>
                    ) : (
                        <>
                            <a className="tab-link" href="/signin">Sign in</a>
                            <a className="tab-link" href="/login">Log in</a>
                        </>
                    )}
                </div>

                <h1>CUBIX</h1>

            </div>

            <div className="main-wrapper">
                <div className="sidebar">
                    <div className="leftbar">
                        <p className="leftbarText">Learn how to solve Rubik's cube</p>
                        {/* You can add images and buttons here */}
                    </div>
                    <div className="leftbar2"><h3 className="leftbar2Text">PB:</h3></div>
                    <div className="leftbar2"><h3 className="leftbar2Text">Worst time:</h3></div>
                    <div className="leftbar2"><h3 className="leftbar2Text">Average time:</h3></div>
                </div>

                <div className="main-content">
                    <div className="dropdown-container">
                        <select className="dropdown">
                            <option value="">--</option>
                            {
                                cubeTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>

    )
}
export default Homepage;