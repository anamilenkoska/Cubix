import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useOutletContext, useNavigate } from 'react-router-dom'
import './styles.css'
import icon from '../../assets/user_icon.jpg'

function Profile() {
    const { user } = useOutletContext()
    const [profile, setProfile] = useState(null)

    const navigate=useNavigate()

    useEffect(() => {
        if (!user) return

        api.get(`profile/${user.id}`)
            .then(res => {
                setProfile(res.data)
            })
            .catch(err => {
                console.log('Error fetching data: ', err)
            })
    }, [user])

    if (!user) {
        return <p>Log in to view your profile</p>
    }

    if (!profile) {
        return <p>Loading profile...</p>
    }

    return (
        <div className='profile-container'>
            <div className="top-right">
                <a className="tab-link" href="/homepage">Back</a>
                <a className="tab-link" href="/logout">Log out</a>
            </div>
            <h1>Profile</h1>
            <div className='profile-info'>
                <div className='username-row'>
                    <img src={icon} alt="User icon" className="user-icon" />
                    <p className='username'>{profile.username}</p>
                </div>
                <div className='username'>
                    <p><strong>User role: </strong>{profile.role}</p>
                    <p><strong>Number of solves: </strong>{profile.total_solves}</p>
                    
                    <p><strong>Joined: </strong>{new Date(profile.logindate).toLocaleString()}</p>
                </div>
            </div>
            <div className='rightbar'>
                <br/>
                <span className='rightbar-link' onClick={()=>navigate('/report')} role='link'>View report</span><br/>
                <span className='rightbar-link' onClick={()=>navigate('/settings')} role='link'>Settings</span>
            </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Profile