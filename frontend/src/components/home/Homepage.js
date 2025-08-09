import React, { useEffect, useState } from "react";
import axios from 'axios';
import api from '../../services/api'
import { useOutletContext,useNavigate } from 'react-router-dom'
import CubeTimer from '../cubeTimer/CubeTimer'

function Homepage() {
    const { user,onLogin,onLogout } = useOutletContext()
    const [cubeTypes, setCubeType] = useState([]);
    const [selectedCube, setSelectedCube] = useState('')
    const [scramble, setScramble] = useState(null)
    const [stats,setStats]=useState({pb:'--',worst:'--',average:'--'})

    const [userId,setUserId]=useState(null)

    const navigate=useNavigate()

    const handleCubeType = (e) => {
        const selected = e.target.value
        setSelectedCube(selected)

        if (selected) {
            api.get(`/scrambles/${selected}`)
                .then(res => setScramble(res.data))
                .catch(err => console.log(err))
        } else {
            setScramble(null)
        }
    }

    const handleNext = () => {
        if (selectedCube) {
            api.get(`/scrambles/${selectedCube}`)
                .then(res => setScramble(res.data))
                .catch(err => console.log(err))
        }
    }

    useEffect(()=>{
        api.get('/users/session')
        .then(res=>{
            if(res.data.user){
                onLogin(res.data.user)

                setUserId(res.data.user.id)

                fetchStats(res.data.user.id)
            }
        })
        .catch(()=>{
            onLogout()
        })
    },[])

    useEffect(() => {
        api.get('/')
            .then((res) => {
                const types = res.data.map(cube => cube.CubeType);
                setCubeType(types);
            })
            .catch((err) => console.log(err));
    }, [user])

    const fetchStats=(UserId)=>{
        api.get(`/attempts/stats/${UserId}`)
        .then(res=>{
            console.log('Stats:',res.data)
            if(res.data){
                setStats({
                    pb: res.data.pb !== null ? parseFloat(res.data.pb).toFixed(2) : '--',
                    worst: res.data.worst !== null ? parseFloat(res.data.worst).toFixed(2) : '--',
                    average: res.data.average !== null ? parseFloat(res.data.average).toFixed(2) : '--'
                })
            }
        })
        .catch(err=>{
            console.log("Error: ",err)
        })
    }

    return (
        <div className="page-container">
            <div className="header">
                <div className="top-bar">
                    {user ? (
                        <>
                            <div className="top-left">
                                <span className="greeting">Hello, {user.username}</span>
                            </div>
                            <div className="top-right">
                                <a className="tab-link" href="/logout">Log out</a>
                            </div>
                        </>
                    ):null}
                </div>
                <h1>CUBIX</h1>
                <div className="dropdown-container">
                    <select className="dropdown" value={selectedCube} onChange={handleCubeType}>
                        <option value="">--</option>
                        {
                            cubeTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    Scramble
                    <span className="scramble">
                        &nbsp;
                        {scramble ? scramble.Steps : '--'}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={!selectedCube}
                        className="next-button">
                        Reset
                    </button>
                </div>
                <div>
                    {scramble && 
                    <CubeTimer scrambleId={scramble.ScrambleId} 
                    cubeType={selectedCube} setScramble={setScramble} userId={user?.id} refreshStats={()=>fetchStats(user.id)}/>}
                </div>

            </div>
            <div className="main-wrapper">
                <div className="sidebar">
                    <div className="leftbar">
                        <p className="leftbarText">Learn how to solve Rubik's cube</p>
                            <select className="dropdown" value={selectedCube} onChange={handleCubeType}>
                                <option value="--"></option>
                                {
                                    cubeTypes.map((type,index)=>(
                                        <option key={index} value={type}>{type}</option>
                                    ))
                                }
                            </select>
                            <button onClick={()=>navigate(`/algorithms/${selectedCube}`)} disabled={!selectedCube} className="learn-button">Get Algorithm</button>
                    
                    </div>
                    <div className="leftbar2"><h3 className="leftbar2Text">PB:{stats.pb}</h3></div>
                    <div className="leftbar2"><h3 className="leftbar2Text">Worst time:{stats.worst}</h3></div>
                    <div className="leftbar2"><h3 className="leftbar2Text">Average time:{stats.average}</h3></div>
                </div>
                <div className="leftbar2">
                    <button onClick={()=>navigate('/report')}>View report</button>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>

    )
}
export default Homepage;