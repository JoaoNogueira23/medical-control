import { useEffect, useState } from "react";
import Page from "../../layouts/Page";
import {
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridRowsProp,
    GridToolbar
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box, Button, Tooltip, Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";
import axios from "axios";
import useAppContext from "../../hooks/useAppContext";
import useDataContext from "../../hooks/useDataContext";
import { pacitentDataType } from "../../types/dataTypes/pacitentTypes";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ModalRegistePacient from "../../components/Modal/ModalResgisterPacitent";
import { EmailInputDatagrid } from "../../components/Datagrid/EmailEditInput";
import { RefreshOutlined } from "@mui/icons-material";

type PacitentEditRequest = {
  id: string;
  emailList: string;
}

export default function OverviewPacients() {

    const alert = useSnackBar()
    const [emails, setEmails] = useState<string[]>([])
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [rows, setRows] = useState<GridRowsProp>([]);
    const {apiURL, darkMode} = useAppContext()
    const {pacitents, setPacitents, setOptionsPacitents} = useDataContext()
    const [open, setOpen] = useState<boolean>(false)

    // states custom email edit input

    const requestPacitents = async () => {
      setLoading(true)
      const urlRequest = apiURL + '/pacitents/data-pacitents'
      await axios.get(urlRequest)
          .then(response => {
              const tempData: pacitentDataType[] = response.data.data
              alert("Requisição realizada com sucesso!")

              if(tempData){
                  setPacitents(tempData)
                  setOptionsPacitents(
                      response.data.data.map((obj: pacitentDataType) => ({
                          label: obj.name,
                          id: obj.id
                      }))
                  )
              }

          })
          .catch((_err) => {
              alert('Erro na requisição!', {type: 'error'})
          })
          .finally(() => setLoading(false))
    }

    const requestEditPacitent = async (data: PacitentEditRequest) => {
      setLoading(true)
      const urlRequest = apiURL + '/pacitents/edit-pacitent'
      await axios.put(urlRequest, data)
        .then(_response => {
          alert('Registro atualizado com sucesso!')
          requestPacitents()
        })
        .catch((_err) => {
          alert('Erro na atualização de resgitro!', {type: 'error'})
      })
      .finally(() => setLoading(false))

    }

  


    useEffect(() => {
      if(pacitents.length == 0){
          requestPacitents()
      }
    }, [])

    const renderEditEmailInput = (emailList: string) => {
      return(
        <EmailInputDatagrid 
          emails={emails}
          setEmails={setEmails}
          value={emailList}
        />
      )
    }

  
    const columns: GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ]; 
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
        },
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Nome',
          width: 250,
          editable: false,
          headerAlign: 'center',
          type: 'string',
          align: 'center',
        },
        {
          headerName: 'Altura',
          field: 'height',
          width: 80,
          editable: false,
          headerAlign: 'center',
          type: 'number'
        },
        {
          headerName: 'Peso',
          field: 'weight',
          width: 80,
          headerAlign: 'center',
          editable: false,
          type: 'number',
          renderCell: (params) => {
            return <span>{params.value}</span>
          }
        },
        {
          headerName: 'Idade',
          field: 'age',
          width: 80,
          editable: false,
          headerAlign: 'center',
          type: 'number'
        },
        {
          headerName: 'Lista de Emails',
          field: 'emailList',
          type: 'string',
          width: 300,
          headerAlign: 'center',
          editable: true,
          align: 'center',
          renderCell: (params) => {
            return <span>{params.value}</span>
          },
          renderEditCell: (params) => renderEditEmailInput(params.value)
        },
        {
          headerName: 'Histórico Médico',
          field: 'historical',
          align: 'center',
          headerAlign: 'center',
          type: 'string',
          width: 400,
          editable: false,
        },
        
    ];
      
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id: GridRowId) => () => {
        if(!onEdit){
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            setOnEdit(true)
        }else{
            alert("é permitida apenas uma edição por vez!", {type: 'info'})
        }
      
    };
  
    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id: GridRowId) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      setOnEdit(false)
      setEmails([])
    };
  
    const processRowUpdate = (newRow: GridRowModel) => {
      setLoading(true)
      const updatedRow = { ...newRow, email: emails.join(';'), isNew: false }; 
      setEmails([])
      let dataPayload = {
        id: newRow.id,
        emailList: emails.join(';')
      }
      requestEditPacitent(dataPayload)
      setOnEdit(false)
      setLoading(false)
      // cuidado, precisa ser retornado a linha que está sendo atualizada, em razaõa no useCallback que o próprio MUI realiza por trás
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    return(
        <Page
        sx={{
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            height: '100vh',
        }}
        >

        <Box
            sx={{
              display: 'flex',
              marginTop: '2rem',
              gap: 4,
              justifyContent: 'space-between',
            }}
            >

                <Typography 
                fontWeight={700}
                >
                    {"Visão Geral Pacientes"}
                </Typography>

                <Box
                sx={{
                  alignSelf: 'flex-end'
                }}
                >
                  <Tooltip title={'Cadastro de novos pacientes'}>
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
                  
                  <Tooltip
                  title={'Atualização de dados'}
                  >
                    <Button onClick={() => requestPacitents()}>
                      <RefreshOutlined />
                    </Button>
                  </Tooltip>
                  
                </Box>
              
              
            </Box>

            <ModalRegistePacient 
            open={open}
            setOpen={(setOpen)}
            />
           

            <DataGrid
            sx={{
                width: '80vw',
                marginBottom: '3.2rem'
            }}
            columns={columns}
            rows={pacitents}
            getRowHeight={() => 'auto'}
            editMode="row"
            rowModesModel={rowModesModel}
            loading={loading}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
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