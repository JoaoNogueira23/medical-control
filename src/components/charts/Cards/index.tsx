import { Box, Typography } from "@mui/material"
import useAppContext from "../../../hooks/useAppContext"


type PropsCard = {
    title: string
    number: number
}

export default function Card({title, number}: PropsCard) {

    const {darkMode} = useAppContext()
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
            color: darkMode ? '#fff' : '#252525',
            textAlign: 'center',
            width: '15rem',
            height: '6rem',
            transition: '0.3s ease-in-out all',
            ':hover':{
                transform: 'translateY(-5px)',
            }
        }}
        >
            <Typography variant='h5'>
                {title}
            </Typography>

            <Typography variant="h6">
                {number}
            </Typography>
        </Box>
    )
}