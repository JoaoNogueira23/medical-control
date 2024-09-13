import ToolTip from '@mui/material/Tooltip'
import { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteType } from '../../router/IRoute';
import { Box, BoxProps, Button, Divider, Typography } from '@mui/material';
import useAppContext from '../../hooks/useAppContext';
import ShortcutsField from '../Header/ShortcutsField';



interface SidedBarItem {
    title: string;
    icon: JSX.Element;
    action: () => void;
}

interface SideBarProps extends BoxProps{
    items?: SidedBarItem[]
    routes?: RouteType[]
    mobileDevice: boolean,
    handleMenu: () => void
}

const SideBar = ({items, routes, mobileDevice, handleMenu, children, ...rest}: SideBarProps & PropsWithChildren) => {
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

    const navigate = useNavigate()

    const {darkMode} = useAppContext()

    const handleSetRoute = (newRoute: string) => {
        setCurrentRoute(newRoute)
        navigate(newRoute)
        handleMenu()
    }

    const styleMobile = {
        height: "3vh",
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '6.2rem',
        backgroundColor: darkMode ? '#0D1524' : '#F0F0F0',
        gap:2,
        textAlign: 'center'
    }

    const stylePattern = {
        height: "5rem",
        display: 'flex',
        flexDirection:  'row',
        gap:4,
        paddingRight: '2.5rem'
    }

    return(
        <Box
        sx={mobileDevice ? styleMobile : stylePattern}
        >
            {
                routes && routes.map(({title, icon, path}, key) => (
                    <ToolTip key={key} title={title}>
                        <Button
                        onClick={() => currentRoute != path && handleSetRoute(path ?? '/')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: currentRoute === path ? 'secondary.dark' : 'transparent',
                            color: darkMode ? '#fff' : (currentRoute === path ? '#fff' : 'primary.main'),
                            textTransform: 'none',
                        }}
                        >   
                        <Typography
                        sx={{
                            display: 'block',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                        }}
                        >
                            {title}
                        </Typography>
                        </Button>
                    </ToolTip>
                ))
            }

            <Divider orientation={mobileDevice ? 'horizontal' : 'vertical'} sx={{
                width: mobileDevice ? '100%' : ''
            }} />
            <ShortcutsField />
            {children}
        </Box>
    )
}

export default SideBar;