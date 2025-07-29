import React from 'react';

const CubeCard=({type,description})=>{
    return(
        <div>
            <h3>type:{type}</h3>
            <p>{description}</p>
        </div>
    )
}

export default CubeCard;