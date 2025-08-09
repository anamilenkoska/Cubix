import React,{useEffect,useState} from "react";
import api from '../../services/api'
import {useOutletContext} from 'react-router-dom'

function Report(){
    const {user}=useOutletContext()
    const [report,setReport]=useState(null)

    useEffect(()=>{
        if(!user) return
        api.get(`/attempts/last/${user.id}`)
        .then(res=>{
            // const data=res.data
            // setReport({
            //     username:data.username,
            //     cubeType:data.cubeType,

            // })
            setReport(res.data)
        })
        .catch(err=>{
            console.log('Error fetching data: ',err)
        })
    },[user])

    if(!user){
        return <p>Please log in to view your reports</p>
    }
    if(!report){
        return <p>Loading...</p>
    }

    return(
        <div style={{padding:'20px'}}>
            <h2>Last Solve Report</h2>
            <p><strong>User: </strong>{report.username}</p>
            <p><strong>Cube type: </strong>{report.cubeType}</p>
            <p><strong>Scramble: </strong>{report.scramble}</p>
            <p><strong>Solving time: </strong>{Number(report.Solving_time).toFixed(2)} s</p>
            <p><strong>Solving date: </strong>{new Date(report.Solving_date).toLocaleString()}</p>
        </div>
    )
}

export default Report;