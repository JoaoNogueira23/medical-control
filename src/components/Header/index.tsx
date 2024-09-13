import { IconButton, Paper, Typography } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import SideBar from "../SideBar";
import routes from "../../router/routes";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


export default function Header() {

    const {darkMode} = useAppContext()

    const [currentWindow, setCurrentWindow] = useState<number>(window.innerWidth)
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const resizeWindow = () => {
        setCurrentWindow(window.innerWidth)
    }

    window.addEventListener('resize', () => {
        resizeWindow()
    })

    const handleMenu = () => {
        setOpenMenu((prev) => !prev)
    }

    return(
        <Paper
        sx={{
            zIndex: 1,
            background: 'background.paper',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '3.2rem',
            py: '2rem',
            borderRadius: 0,
            boxShadow: 'rgba(0,0,0,0.12) 0px 1px 3px, rgba(0,0,0,0.24) 0px 1px 2px'
        }}
        >
            <a
            href="/"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingLeft: '2.5rem',
                textDecoration: 'none'
            }}
            >
                <Typography
                color={darkMode ? '#fff' : '#252525'}
                fontWeight={700}
                >
                    {`Medical Controll App`}
                </Typography>
            </a>

            {
                currentWindow <= 800 ? 
                (
                    <>
                        <IconButton onClick={handleMenu}
                        sx={{
                            px: '2.5rem'
                        }}
                        >
                            {openMenu ? <CloseIcon/> : <MenuIcon /> }
                        </IconButton>
                        {openMenu ? 
                        (
  
                            <SideBar routes={routes} mobileDevice={true} handleMenu={handleMenu}/>
                            
                        ) :
                        ('')
                        }
                        
                    </>
                    
                )  
                : 
                (
                    <SideBar routes={routes} mobileDevice={false} handleMenu={handleMenu}/>
                )
            }
            

            
        </Paper>
    )
}