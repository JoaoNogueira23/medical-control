import ToolTip from '@mui/material/Tooltip'
import { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { RouteType } from '../../router/IRoute';
import { Box, BoxProps, Button, Divider, Typography } from '@mui/material';
import useAppContext from '../../hooks/useAppContext';
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';



interface SidedBarItem {
    title: string;
    icon: JSX.Element;
    action: () => void;
}

interface SideBarProps extends BoxProps{
    items?: SidedBarItem[]
    routes?: RouteType[]
}

const SideBar = ({items, routes, children, ...rest}: SideBarProps & PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(true)
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

    const navigate = useNavigate()
    const delayOpen = useDebounce<boolean>(open, 400)

    const {darkMode} = useAppContext()

    const handleToggleOpen = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleSetRoute = (newRoute: string) => {
        setCurrentRoute(newRoute)
        navigate(newRoute)
    }

    return(
        <Box
        sx={{
            height: "calc(100% -  2rem)",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            padding: 2,
            gap:1,
            backgroundColor: darkMode ? 'rgb(25,25,25)' : "rgb(240,240,240)"
        }}
        {...rest}
        >
            {
                <ToolTip title={delayOpen ? "Close Side Bar" : "Open Side Bar"} placement='right'>
                    <Button
                    onClick={handleToggleOpen}
                    sx={{
                        width: "3.2rem",
                        height: '3.2rem',
                        alignSelf: 'end',
                        transition: '.5s ease-in-out',
                        color: darkMode ? "#fff" : 'primary.main'
                    }}
                    >
                        {delayOpen ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
                    </Button>
                </ToolTip>
            }

            <Divider sx={{width: '100%'}}/>

            {
                routes && routes.map(({title, icon, path}, key) => (
                    <ToolTip key={key} disableHoverListener={open} title={title} placement='right'>
                        <Button
                        onClick={() => currentRoute != path && handleSetRoute(path ?? '/')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            px: 2.4,
                            gap: 2,
                            width: open ? '16rem' : '3.2rem',
                            height: '3.2rem',
                            transition: '.4s ease-in-out',
                            bgcolor: currentRoute === path ? 'primary.main' : 'transparent',
                            color: darkMode ? '#fff' : (currentRoute === path ? '#fff' : 'primary.main'),
                            ':hover':{
                                bgColor: currentRoute === path ? 'primary.light' : ''
                            },
                            textTransform: 'none'
                        }}
                        >   
                        {icon}
                        <Typography
                        sx={{
                            display: open ? (
                                delayOpen ? 'block' : 'none'
                            ) : 'none',
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '12rem'
                        }}
                        >
                            {title}
                        </Typography>
                        </Button>
                    </ToolTip>
                ))
            }
            {
                items && items.map(({title, icon, action}, key) => (
                    <ToolTip key={key} disableHoverListener={open} title={title} placement='right'>
                        <Button
                        onClick={action}
                        sx={{
                            display: 'flex',
                            justifyContent: open ? 'left' : 'center',
                            gap: 2,
                            width: open ? '16rem' : '3.2rem',
                            transition: '.5s ease-in-out'
                        }}
                        >   
                        {icon}
                        <Typography
                        sx={{
                            display: open ? 'block' : 'none',
                            transition: '.5s ease-in-out'
                        }}
                        >
                            {title}
                        </Typography>
                        </Button>
                    </ToolTip>
                ))
            }
            {children}
        </Box>
    )
}

export default SideBar;