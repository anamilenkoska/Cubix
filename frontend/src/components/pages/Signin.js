import React, { useState } from "react"
import api from '../../services/api'
import { useOutletContext, useNavigate } from 'react-router-dom'
import './style.css'

function Signin() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "beginner" //default-to not be empty
    })

    const { onLogin } = useOutletContext()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        const { username, email, role, password } = formData
        e.preventDefault()
        if (!username || !email || !role || !password) {
            alert('Please fill all fields')
            return
        }
        try {
            const res = await api.post('/users/signin', formData)
            if (res.data.user) {
                onLogin(res.data.user)  //set the user in App
                navigate('/homepage')
            }

        } catch (err) {
            alert('sign in failed')
        }
    }

    return (
        <div className="signin">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <input name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <select name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required>
                    <option value="beginner">Beginner</option>
                    <option value="advanced">Advanced</option>
                </select>
                <input name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required />
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default Signin