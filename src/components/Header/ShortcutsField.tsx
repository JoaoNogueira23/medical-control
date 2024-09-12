import { Box, IconButton, Tooltip } from "@mui/material"
import useAppContext from "../../hooks/useAppContext"
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"

type PropsShortcutsField = {
    open?: boolean;
}

const ShortcutsField = ({open}: PropsShortcutsField) => {
    const {darkMode, handleDarkMode} = useAppContext()

    return(
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            width: open ? '16rem' : '3.2rem',
            transition: '.5s ease-in-out'
        }}
        >
            <Tooltip 
            title={darkMode ? "Light Mode" : "Dark Mode"}
            >
                <IconButton onClick={handleDarkMode}>
                    {darkMode ? <LightModeOutlined/> : <DarkModeOutlined />}
                </IconButton>
            </Tooltip>
        </Box>
    )

}

export default ShortcutsField;