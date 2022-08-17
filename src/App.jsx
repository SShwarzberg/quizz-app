import React from 'react'
import Start from './components/Start/Start'
import './App.scss'
import { random } from 'nanoid'

export default function App() {
    const [gameSettings, setGameSettings] = React.useState({
        numOfQuestions: 4,
        difficulty: 'random',
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
            <Start />
            <form>
                <select
                    name="numOfQuestions"
                    id="numOfQuestions"
                    value={gameSettings.value}
                    onChange={handleChange}
                >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </form>
        </div>
    )
}
