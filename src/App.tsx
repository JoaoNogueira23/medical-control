import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { Box } from "@mui/material"
import  {RouterProvider} from 'react-router-dom'
import router from "./router"
import { SnackBarProvider } from "./components/SnackBar"
import Header from "./components/Header"

import { ThemeProvider } from "@emotion/react"
import useAppContext from "./hooks/useAppContext"
import darkPalette from "./styles/darkPallet"
import lightPalette from "./styles/lightPallet"
import typography from "./styles/typography"

function App() {

  const {darkMode} = useAppContext()


  return (
    <Box
    sx={{
      width: '100vw',
      height: '100vh'
    }}
    >
      <ThemeProvider 
      theme={responsiveFontSizes(createTheme({
        palette: darkMode ? darkPalette : lightPalette,
        typography
      }))} 
      >
        <SnackBarProvider>
          <Header />
          <Box 
          sx={{
            backgroundColor: 'background.default',
            height: 'calc(100% - 4.2rem)',
            display: 'flex',
            flexDirection: 'row'
          }}
          >
            <RouterProvider router={router}/>
          </Box>
        </SnackBarProvider>
      </ThemeProvider>
      
    </Box>
  )
}

export default App
