import { Box, Typography } from "@mui/material"
import useAppContext from "../../hooks/useAppContext"

export default function HomePage(){
    const {darkMode} = useAppContext()

    return(
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width='100vw'
        color={'info'}
        >

            <Typography
                color={darkMode ? '#fff' : '#252525'}
                fontWeight={700}
                fontSize={32}
                >
                    Seja bem vindo!
            </Typography>


            
        </Box>
    )
}