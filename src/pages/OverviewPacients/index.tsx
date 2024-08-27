import { useState } from "react";
import { EmailInputDatagrid } from "../../components/Datagrid/EmailEditInput/inedex";
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
    GridRenderEditCellParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import useSnackBar from "../../hooks/useSnackbar";


export default function OverviewPacients() {

    const alert = useSnackBar()
    const [emails, setEmails] = useState<string[]>([])
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [rows, setRows] = useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, isNew: false, email: 'jon.snow@email.com;joao@email.com;joao2@email.com' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, isNew: false, email: 'cersei.lannister@email.com' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, isNew: false, email: 'jaime.lannister@email.com' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, isNew: false, email: 'arya.stark@email.com' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, isNew: false, email: 'daenerys.targaryen@email.com' },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150, isNew: false, email: 'melisandre@email.com' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, isNew: false, email: 'ferrara.clifford@email.com' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, isNew: false, email: 'rossini.frances@email.com' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, isNew: false, email: 'roxie.harvey@email.com' },
    ]);
    

    const renderEditEmailInput = (params: GridRenderEditCellParams) => {
        //params.api.setEditCellValue({id: params.id, field: 'email', value: params.value})
        return(
            <EmailInputDatagrid 
            emails={emails}
            setEmails={setEmails}
            value={params.value}
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
            getActions: (data) => {
              const isInEditMode = rowModesModel[data.id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={handleSaveClick(data.id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(data.id)}
                    color="inherit"
                  />,
                ]; 
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={ handleEditClick(data.id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(data.id)}
                  color="inherit"
                />,
              ];
            },
          },
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: false,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: false,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'string',
          width: 300,
          editable: true,
          renderCell: (params) => (
            <span>{params.value}</span>
          ),
          renderEditCell: renderEditEmailInput
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];
      
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id: GridRowId) => () => {
        console.log('clicou')
        if(!onEdit){
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            setOnEdit(true)
        }else{
            alert("è permitida apenas uma edição por vez!", {type: 'warning'})
        }
      
    };
  
    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      setOnEdit(false)
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
      const updatedRow = { ...newRow, email: emails.join(';'), isNew: false }; 
      setEmails([])
      let rowsUpdated = rows.map(row => row.id === newRow.id ? updatedRow : row)
      return rowsUpdated;
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
            <Typography 
            sx={{
                marginTop: '2rem'
            }}
            >
                {"Overview Pacitents"}
            </Typography>

            <DataGrid
            sx={{
                width: '80vw'
            }}
            columns={columns}
            rows={rows}
            getRowHeight={() => 'auto'}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            />
        </Page>
    )
}