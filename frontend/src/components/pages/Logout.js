import React,{useEffect,useState} from 'react'
import api from '../../services/api'
import {useOutletContext, useNavigate} from 'react-router-dom'

function Logout(){
    const {onLogout}=useOutletContext()
    const navigate=useNavigate()

    useEffect(()=>{
        const logoutUser=async()=>{
            try{
                await api.get('/users/logout')
                onLogout()
                navigate('/')
            }catch(error){
                console.log('Log out failed:', error)
            }
        };

        logoutUser()
    },[onLogout,navigate])
    return null;
}

export default Logout;