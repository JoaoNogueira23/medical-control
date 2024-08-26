import { Paper, Typography } from "@mui/material";


export default function Header() {
    return(
        <Paper
        sx={{
            zIndex: 1,
            background: 'backgroud.paper',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '3.2rem',
            px: '2.5rem',
            py: '.5rem',
            borderRadius: 0,
            boxShadow: 'rgba(0,0,0,0.12) 0px 1px 3px, rgba(0,0,0,0.24) 0px 1px 2px'
        }}
        >
            <a
            href="/"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}
            >
                <Typography
                color={'secondary.main'}
                >
                    {`<João Martins />`}
                </Typography>
            </a>

            
        </Paper>
    )
}