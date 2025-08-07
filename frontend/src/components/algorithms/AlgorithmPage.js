import React, { useEffect, useState } from "react";
import api from '../../services/api'
import './styles.css'
import { useParams } from 'react-router-dom'

function AlgorithmPage() {
    const { cubeType } = useParams()
    const [algorithms, setAlgorithms] = useState([])

    useEffect(() => {
        if (cubeType) {
            api.get(`/algorithms/${cubeType}`)
                .then(res => {
                    setAlgorithms(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [cubeType])

    const formatStepForImage = (description) => {
        return description.toLowerCase().replace(/\s+/g, '_')
    }

    const stepImage = (description, cubeType) => {
        const baseName = formatStepForImage(description)
        const basePath = `/imgCubes/${cubeType}/`
        const imagePaths = []

        imagePaths.push(`${basePath}${baseName}.jpg`)

        for (let i = 1; i <= 5; i++) {
            imagePaths.push(`${basePath}${baseName}_${i}.jpg`)
        }
        return imagePaths
    }

    return (
        <div className="algorithm-container">
            <div className="top-right">
                <a className="tab-link" href="/homepage">Back</a>
                <a className="tab-link" href="/logout">Log out</a>
            </div>
            <h2>Algorithm for {cubeType} Cube</h2>
            {algorithms.map((algo, index) => (
                <div key={index} className="algorithm-block">
                    <h3>Difficulty: {algo.Difficulty_level}</h3>
                    <p><strong>Step: {algo.Description}</strong></p>
                    <p className="steps-text">{algo.Steps}</p>
                    <div className="step-item">
                        {stepImage(algo.Description, cubeType).map((path, imgIndex) => (
                            <img key={`${algo.Description}-${imgIndex}`}
                                src={path}
                                alt={`${algo.Description} ${imgIndex}`}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }} />
                        ))}
                    </div>
                </div>
            ))}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    )
}

export default AlgorithmPage;