import { Box, CircularProgress, Typography } from "@mui/material"
import useDarkMode from "../../../hooks/useDarkMode"

type PropsCard ={
    title: string
    number: number
    loading: boolean
}


export default function Card({title, number, loading}: PropsCard) {
    const {darkMode} = useDarkMode()

    return(
        <Box
        sx={{
            bgcolor: 'background.paper',
            boxShadow: 'rgba(0,0,0,0.12) 0px 1px 3px, rgba(0,0,0,0.24) 0px 1px 2px',
            borderRadius: '5px',
            py: '1rem',
            px: '1rem',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            gap: '1rem',
            color: darkMode ? '#fff' : '#141414',
            textAlign: 'center',
            width: '15rem',
            height: '6rem',
            transition: '0.3s ease-in-out all',
            ':hover':{
                transform: 'translateY(-5px)',
            }
        }}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <Box key={`item-${Math.random()}`}>
                    <Typography variant="h5" >{title}</Typography>
                    <Typography variant="h6" >{number}</Typography>
                </Box>
            )
            }
            
        </Box>
    )
}