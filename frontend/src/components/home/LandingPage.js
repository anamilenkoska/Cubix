import React, {useEffect, useState} from 'react'
import api from '../../services/api'
import {useOutletContext, useNavigate, Link} from 'react-router-dom'
import './styles.css'

function LandingPage(){
    const [formData, setFormData]=useState({
        username:'',
        password:''
    })

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const {onLogin}=useOutletContext()
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {username, password}=formData
        if(!username || !password){
            alert('Please fill all fields')
            return
        }
        try{
            const res=await api.post('/users/login',formData)
            onLogin(formData.username)
            navigate('/homepage')
        }catch(err){
            alert("Log in failed")
        }
    }

    return(
        // <form onSubmit={handleSubmit}>
        //     <input name='username' value={formData.username} onChange={handleChange} placeholder='Username'/>
        //     <input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Password'/>
        //     <button type='submit'>Log in</button>
        // </form>
        <div className='login'>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          required
        />
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <button type='submit'>
          Log in
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
    )
}

export default LandingPage;