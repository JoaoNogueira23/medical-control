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
import { Box, Button, Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";
import ModalRecordMedical from "../../components/Modal/ModalRegisterCase";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import axios from "axios";
import useAppContext from "../../hooks/useAppContext";
import useDataContext from "../../hooks/useDataContext";


export default function CertificateMedicalPage() {
    const alert = useSnackBar()
    const [emails, setEmails] = useState<string[]>([])
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [open, setOpen] = useState<boolean>(false)
    const {apiURL} = useAppContext()
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
        { field: 'id', headerName: 'id', width: 90 },
        {
          field: 'name',
          headerName: 'Nome',
          width: 150,
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
            width: 300,
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
      let rowsUpdated = rows.map(row => row.id === newRow.id ? updatedRow : row)
      setRows(rowsUpdated)
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
        }}
        >
            <ModalRecordMedical 
            open={open}
            setOpen={setOpen}
            />

            <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              alignItems: 'center',
              marginTop: '2rem',
            }}
            >
              <Typography 
              sx={{
                  gridColumn: 'span 2',
                  
              }}
              >
                  {"Atestados Médicos"}
              </Typography>

              <Button onClick={() => setOpen(true)}
              sx={{
                gridColumn: 'span 1',
                justifySelf: 'end'
              }}
              >
                <ContentPasteGoIcon />
              </Button>
            </Box>
           

            <DataGrid
            sx={{
                width: '80vw'
            }}
            columns={columns}
            rows={medicalCertificate}
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