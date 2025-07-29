import React from "react";
import axios from 'axios';
import CubeCard from '../CubeCard'

class CubesList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cubes:[],
            count:2
        }
    }

    componentDidMount(){
        this.getCubes();
    }

    render(){
        return(
            <div>
                <h2>Here are cubes</h2>
                    {
                        this.state.cubes.map((cube,index)=>(
                            <CubeCard key={index} type={cube.CubeType} description={cube.Description}/>
                        ))
                    }
            </div>
        )
    }

    getCubes(){
        axios.get('http://88.200.63.148:8886/').then(response=>{
            console.log('cubes fetched:',response.data);
            this.setState({cubes:response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export default CubesList;