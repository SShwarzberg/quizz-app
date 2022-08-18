import React from 'react'
import Start from './components/Start/Start'
import './App.scss'

export default function App() {
    const [gameSettings, setGameSettings] = React.useState({
        numOfQuestions: 4,
        difficulty: 'random',
        category: 'Any Category',
    })

    function handleChange(e) {
        const { name, value } = e.target
        setGameSettings((prevSettings) => {
            return {
                ...prevSettings,
                [name]: value,
            }
        })
    }
    return (
        <div className="App">
            <Start handleChange={handleChange} gameSettings={gameSettings} />
        </div>
    )
}
