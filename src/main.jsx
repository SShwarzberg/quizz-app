import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GameplayPage from './components/GameplayPage/GameplayPage'
import Start from './components/Start/Start'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/" element={<Start />} />
            <Route path="/gameplay" element={<GameplayPage />} />
        </Routes>
    </BrowserRouter>
)
