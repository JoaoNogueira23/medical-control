import { useState } from "react";
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
import { Box, Button, IconButton, Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";
import ModalRecordMedical from "../../components/Modal/ModalRegisterCase";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

interface dataType {
  id: number;
  name: string;
  age: number;
  email: string;
  daysJustified: number;
  describe?: string;
}


const initialRows: dataType[] = [
  { id: 1, name: 'João Victor Nogueira Martins', age: 14, daysJustified: 2, email: 'jon.snow@email.com;joao@email.com;joao2@email.com', describe: 'Descrição' },
  { id: 2, name: 'Lannister Cersei', age: 31, daysJustified: 5, email: 'cersei.lannister@email.com' },
  { id: 3, name: 'Lannister Jaime', age: 32, daysJustified: 10, email: 'jaime.lannister@email.com' },
  { id: 4, name: 'Stark Arya', age: 11, daysJustified: 3, email: 'arya.stark@email.com' },
]


export default function OverviewPacients() {

    const alert = useSnackBar()
    const [emails, setEmails] = useState<string[]>([])
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [rows, setRows] = useState<GridRowsProp>(initialRows);
    const [open, setOpen] = useState<boolean>(false)


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
          width: 150,
          editable: false,
        },
        {
          field: 'daysJustified',
          headerName: 'Dias em Atestado',
          type: 'number',
          width: 150,
          editable: false,
        },
        {
          field: 'describe',
          headerName: 'Descrição',
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
                  gridColumn: 'span 2'
              }}
              >
                  {"Overview Pacitents"}
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
            rows={rows}
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