import { Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import useAppContext from "../../hooks/useAppContext"
import axios from "axios"
import useSnackBar from "../../hooks/useSnackbar"
import useDataContext from "../../hooks/useDataContext"
import Card from "../../components/charts/Cards"
import { cardType } from "../../types/chartsType/chatsTypes"

export default function HomePage(){

    const [currentWindow, setCurrentWindow] = useState<number>(window.innerWidth)
    const {apiURL} = useAppContext()
    const {setCardsData, cardsData} = useDataContext()
    const [loading, setLoading] = useState<boolean>(false)

    const alert = useSnackBar()

    const resizeWindow = () => {
        setCurrentWindow(window.innerWidth)
    }

    window.addEventListener('resize', () => {
        resizeWindow()
    })

    const requestDataCharts = async () => {
        const urlRequest = apiURL + '/charts/data-cards'

        await axios.get(urlRequest)
          .then(response => {
              alert("Métricas carregadas com sucesso!")

              setCardsData(response.data.data)

          })
          .catch(err => {
              console.log(err)
              alert('Erro no processamento das métricas!', {type: 'error'})
          })
          .finally(() => 
            setLoading(false)
        )
    }

    useEffect(() => {
        requestDataCharts()
    }, [])
    
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
                {loading ? (
                    <CircularProgress />
                ) : 
                (
                    cardsData.map((item: cardType) => (
                        <Card
                        loading={loading}
                        title={item.name}
                        number={item.value}
                        />
                    ))
                )
                }
                
            </Box>  
        </Box>
    )
}