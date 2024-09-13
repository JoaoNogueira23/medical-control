import { Box } from "@mui/material"
import Card from "../../components/charts/Cards"
import { useState } from "react"

export default function HomePage(){

    const [currentWindow, setCurrentWindow] = useState<number>(window.innerWidth)

    const resizeWindow = () => {
        setCurrentWindow(window.innerWidth)
    }

    window.addEventListener('resize', () => {
        resizeWindow()
    })

    
    return(
        <Box
        display="flex"
        flexDirection='column'
        justifyContent="center"
        alignItems="center"
        width='100vw'
        height='100%'
        color='info'
        >

            <Box
            sx={{
                display: 'flex',
                flexDirection: currentWindow < 800 ? 'column' : 'row',
                gap: 2
            }}
            >
                <Card 
                title={'Pacientes'}
                number={3}
                />

                <Card 
                title={'Pacientes de Licença'}
                number={3}
                />

                <Card 
                title={'Pacientes Críticos'}
                number={1}
                />
  
            </Box>  
            


            
        </Box>
    )
}