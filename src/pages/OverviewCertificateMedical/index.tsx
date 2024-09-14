import { useEffect, useState } from "react";
import Page from "../../layouts/Page";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowClassNameParams,
    GridToolbar
} from '@mui/x-data-grid';
import { Box, Button, Tooltip, Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";
import ModalRecordMedical from "../../components/Modal/ModalRegisterCase";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import axios from "axios";
import useAppContext from "../../hooks/useAppContext";
import useDataContext from "../../hooks/useDataContext";
import SendIcon from '@mui/icons-material/Send';


type payloadSendEmailType = {
  name: string;
  emailList: string;
  end_date: string;
}

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
              alert('Erro no carregamentos dos atestados!', {type: 'error'})
          })
          .finally(() => setLoading(false))
    }

  


    useEffect(() => {
      if(medicalCertificate.length == 0){
          setLoading(true)
          requestPacitents()
      }
    }, [])

    const handleSendEmail = async (data: payloadSendEmailType) => {
      const urlRequest = apiURL + '/utilities/send-email'
      await axios.post(urlRequest, data)
          .then(_response => {
              alert("E-mail enviado com sucesso!")

          })
          .catch(err => {
              console.log(err)
              alert('Erro no envio de e-mail!', {type: 'error'})
          })
          .finally(() => setLoading(false))
    }

  
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 90 },
        {
          field: 'actions',
          headerName: 'Enviar E-mail',
          renderCell: (params: GridRenderCellParams<any>) => {
            let data = {
              name: params.row.name,
              emailList: params.row.emailList,
              end_date: params.row.end_date
            }
            return(
              <Button
              onClick={() => handleSendEmail(data)}
              >
                  <SendIcon />
              </Button>
            )
            
          },
        },
        {
          field: 'name',
          headerName: 'Nome',
          width: 250,
          editable: false,
          headerAlign: 'center',
          align: 'center'
        },
        {
          field: 'emailList',
          headerName: 'E-mail(s)',
          width: 250,
          editable: false,
          headerAlign: 'center',
          align: 'center'
        },
        {
          field: 'differenceDays',
          headerName: 'Dias Restantes',
          width: 150,
          type: 'number',
          headerAlign: 'center',
          align: 'center',
          editable: false,
        },
        {
          field: 'start_date',
          headerName: 'Data Inicial',
          type: 'string',
          width: 200,
          editable: false,
          align: 'center',
          headerAlign: 'center',
        },
        {
          field: 'end_date',
          headerName: 'Data Final',
          type: 'string',
          width: 200,
          editable: false,
          align: 'center',
          headerAlign: 'center',
        },
        {
            field: 'describe',
            headerName: 'Descrição',
            type: 'string',
            headerAlign: 'center',
            align: 'center',
            width: 350,
            editable: false,
        },
    ];

    const datagridStyle = {
        width: '80vw',
        marginBottom: '2rem',
        '.row-class-urgent':{
          backgroundColor: '#FF9688'
        },
        '.row-class-middle':{
          backgroundColor: '#F7C70D'
        }
    }
  

    return(
        <Page
        sx={{
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            height: '100vh',
        }}
        >
            <ModalRecordMedical 
            open={open}
            setOpen={setOpen}
            />

            <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              width: '80vw',
              marginTop: '2rem',
              gap: 2,
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center'
            }}
            >
              <Typography 
              fontWeight={700}
              sx={{
                gridColumn: '2/3',
              }}
              align='center'
              variant='h5'
              >
                  {"Atestados Médicos"}
              </Typography>

              <Tooltip
              title={'Cadastro de atestado'}
              sx={{
                gridColumn: '1/3'
              }}
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
            sx={datagridStyle}
            columns={columns}
            rows={medicalCertificate}
            getRowHeight={() => 'auto'}
            loading={loading}
            slots={{toolbar: GridToolbar}}
            getRowClassName={(params: GridRowClassNameParams<any>): string => {
              if(params.row.differenceDays == 1){
                return 'row-class-urgent'
              }else if(params.row.differenceDays == 2 ){
                return 'row-class-middle'
              }
              return ''
            }}
            initialState={
              {
                columns:{
                  columnVisibilityModel: {
                    id: false,
                    emnailList: false
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