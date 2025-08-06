import React, {useEffect,useState,useRef} from 'react'
import api from '../../services/api'
import './styles.css'

const CubeTimer=({scrambleId,cubeType,setScramble})=>{
    const [timer,setTimer]=useState(0)
    const [status,setStatus]=useState('idle')
    const [userId,setUserId]=useState(null)
    const intervalRef=useRef(null)
    const holdTimeoutRef=useRef(null)

    //fetch user
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res=await api.get('/users/session',{withCredentials:true})
                setUserId(res.data.user.id)
            }catch(err){
                console.log("Session error:",err)
            }
        }
        fetchUser()
    },[])

    useEffect(()=>{
        const handleKeyDown=(e)=>{
            if(e.code==='Space'){
                if(status==="idle"){
                    setStatus('holding')
                    holdTimeoutRef.current=setTimeout(()=>{
                        setStatus('ready')
                    },750)
                }else if(status==='running'){
                    stopTimer()
                }
                e.preventDefault()
            }
        }

        const handleKeyUp=(e)=>{
            if(e.code==='Space'){
                if(status==='ready'){
                    startTimer()
                }else if(status==='holding'){
                    setStatus('idle')
                    clearTimeout(holdTimeoutRef.current)
                }
                e.preventDefault()
            }
        }

        window.addEventListener('keydown',handleKeyDown)
        window.addEventListener('keyup',handleKeyUp)
        return()=>{
            window.removeEventListener('keydown',handleKeyDown)
            window.removeEventListener('keyup',handleKeyUp)
        }
    },[status])

    const startTimer=()=>{
        setStatus('running')
        setTimer(0)
        intervalRef.current=setInterval(()=>{
            setTimer(prev=>+(prev+0.1).toFixed(2))
        },10)
    }
    
    const timerRef=useRef(0)
    useEffect(()=>{
        timerRef.current=timer
    },[timer])

    const stopTimer=()=>{
        clearInterval(intervalRef.current)
        const solving_time=parseFloat(timerRef.current.toFixed(2))
        const solving_date=new Date().toISOString().slice(0,19).replace('T', ' ');
        setStatus('idle')
        saveAttempt(userId,scrambleId,solving_time,solving_date)
        fetchNewScramble()
    }

    const saveAttempt=async(userId,scrambleId,solving_time,solving_date)=>{
        if(!userId || !scrambleId){
            console.log('Missing user or scramble id')
            return
        }
        try{
            const res=await api.post('/attempts',{
                userId,
                scrambleId,
                solving_time,
                solving_date
            })
        }catch(err){
            console.log('Error',err)
        }
    }

    const fetchNewScramble=async()=>{
        if(!cubeType) return
        try{
            const res=await api.get(`/scrambles/${cubeType}`)
            setScramble(res.data)
        }catch(err){
            console.log('Error:',err)
        }
    }

    return(
        <div className='timer-container'>
            <div className={`timer-box ${status}`}>
            {timer.toFixed(2)}<span className='text-label'>s</span>
            </div>
        </div>
    )
}

export default CubeTimer;