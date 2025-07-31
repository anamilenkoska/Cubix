import React, { useEffect, useState } from "react"
import api from '../../services/api'
import {useOutletContext, useNavigate} from 'react-router-dom'

function Signin(){
    const [formData,setFormData]=useState({
        username: "",
        email: "",
        password: "",
        role: "beginner" //default-to not be empty
    })

    const {onLogin}=useOutletContext()
    const navigate=useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit=async(e)=>{
        const {username,email,role,password}=formData
        e.preventDefault()
        if(!username || !email || !role || !password){
            alert('Please fill all fields')
            return
        }
        try{
            const res=await api.post('/users/signin',formData)
            alert('signed in')
            onLogin(username)  //set the user in App
            navigate('/')
        }catch(err){
            alert('sign in failed')
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username"/>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="choose">role</option>
                <option value="beginner">Beginner</option>
                <option value="advanced">Advanced</option>
            </select>
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
            <button type="submit">Sign in</button>
        </form>
    )
}

export default Signin