import React, { useEffect, useState } from "react";
import api from '../../services/api'
import { useOutletContext,useNavigate } from 'react-router-dom'
import './styles.css'
import icon from '../../assets/user_icon.jpg'

function Report() {
    const { user } = useOutletContext()
    const [report, setReport] = useState(null)

    const navigate=useNavigate()

    useEffect(() => {
        if (!user) return
        api.get(`/attempts/last/${user.id}`)
            .then(res => {
                // const data=res.data
                // setReport({
                //     username:data.username,
                //     cubeType:data.cubeType,

                // })
                setReport(res.data)
            })
            .catch(err => {
                console.log('Error fetching data: ', err)
            })
    }, [user])

    if (!user) {
        return <p>Please log in to view your reports</p>
    }
    if (!report) {
        return <p>Loading...</p>
    }

    return (
        <div className="report">
            <div className="top-right">
                <a className="tab-link" href="/homepage">Back</a>
                <a className="tab-link" href="/logout">Log out</a>
            </div>
            <h1 className="report-header">Last Solve Report</h1>
            <div className="report-info">
                <div className="username-row">
                    <img src={icon} alt="User icon" className="user-icon" />
                    <p className="username"><strong>{report.username}</strong></p>

                </div>
                <div className="username">
                    <p><strong>Cube type: </strong>{report.cubeType}</p>
                    <p><strong>Scramble: </strong>{report.scramble}</p>
                    <p><strong>Difficulty: </strong>{report.difficulty}</p>
                    <p><strong>Solving time: </strong>{Number(report.Solving_time).toFixed(2)}s</p>
                    <p><strong>Solving date: </strong>{new Date(report.Solving_date).toLocaleString()}</p>
                </div>
            </div>
            <div className="rightbar">
                    <br/>
                    <span className="rightbar-link" onClick={() => navigate('/profile')} role="link">Profile</span><br/>
                    <span className="rightbar-link" onClick={()=>navigate('/settings')} role="link">Settings</span>
                    </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Report;