import { useState } from "react"


export default function useDarkMode() {
    const darkModeSett = localStorage.getItem('darkMode')

    const [darkMode, setDarkMode] = useState(darkModeSett == 'true')
    
    const handleDarkMode = () => {
        setDarkMode(prev => {
            const newState = !prev
            localStorage.setItem('darkMode', newState.toString())
            return newState
        })
    }

    return {darkMode, handleDarkMode}
}   