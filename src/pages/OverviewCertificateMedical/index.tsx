import { useEffect, useState } from "react";
import Page from "../../layouts/Page";
import {
    DataGrid,
    GridColDef,
    GridToolbar
} from '@mui/x-data-grid';
import { Box, Button, Tooltip, Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";
import ModalRecordMedical from "../../components/Modal/ModalRegisterCase";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import axios from "axios";
import useAppContext from "../../hooks/useAppContext";
import useDataContext from "../../hooks/useDataContext";


export default function CertificateMedicalPage() {
    const alert = useSnackBar()
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const {apiURL, darkMode} = useAppContext()
    const {medicalCertificate, setMedicalCertificate} = useDataContext()

    const requestPacitents = async () => {
      
      const urlRequest = apiURL + '/pacitents/data-certificates'
      await axios.get(urlRequest)
          .then(response => {
              alert("Requisição realizada com sucesso!")

              setMedicalCertificate(response.data.data)

          })
          .catch(err => {
              console.log(err)
              alert('Erro na requisição!', {type: 'error'})
          })
          .finally(() => setLoading(false))
    }

  


    useEffect(() => {
      if(medicalCertificate.length == 0){
          setLoading(true)
          requestPacitents()
      }
    }, [])

  
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 90 },
        {
          field: 'name',
          headerName: 'Nome',
          width: 250,
          editable: false,
        },
        {
          field: 'start_date',
          headerName: 'Data Inicial',
          type: 'string',
          width: 200,
          editable: false,
        },
        {
          field: 'end_date',
          headerName: 'Data Final',
          type: 'string',
          width: 200,
          editable: false,
        },
        {
            field: 'describe',
            headerName: 'Descrição',
            type: 'string',
            width: 350,
            editable: false,
        },
    ];
  

    return(
        <Page
        sx={{
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
        }}
        >
            <ModalRecordMedical 
            open={open}
            setOpen={setOpen}
            />

            <Box
            sx={{
              display: 'flex',
              width: '80vw',
              marginTop: '2rem',
              gap: 4,
              justifyContent: 'space-between',
            }}
            >
              <Typography 
              fontWeight={500}
              >
                  {"Atestados Médicos"}
              </Typography>

              <Tooltip
              title={'Cadastro de atestado'}
              >
                <Button onClick={() => setOpen(true)}
                sx={{
                  gridColumn: 'span 1',
                  justifySelf: 'end',
                  color: darkMode ? '#fff' : ''
                }}
                >
                  <ContentPasteGoIcon />
                </Button>
              </Tooltip>

              
            </Box>
           

            <DataGrid
            sx={{
                width: '80vw'
            }}
            columns={columns}
            rows={medicalCertificate}
            getRowHeight={() => 'auto'}
            loading={loading}
            slots={{toolbar: GridToolbar}}
            initialState={
              {
                columns:{
                  columnVisibilityModel: {
                    id: false
                  }
                },
                sorting: {
                  sortModel: [{ field: 'daysJustified', sort: 'desc' }],
                },
              }
            }
            />
        </Page>
    )
}