import { Autocomplete, Box, Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import useSnackBar from "../../../hooks/useSnackbar";
import useAppContext from "../../../hooks/useAppContext";
import useDataContext from "../../../hooks/useDataContext";

type FormValues = {
    name: string;
    id: string;
    id_pacitent: string;
    describe: string;
    end_date: string | null;
    start_date: string | null;
}



export default function FormsRecordMedical() {
    
    // states and variables
    const {apiURL} = useAppContext()
    const {optionsPacitents} = useDataContext()
    const alert = useSnackBar()

    const {
        handleSubmit, 
        control, 
        register,
        setValue,
        formState: {errors}
    }  = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
        let pacitentId = optionsPacitents.filter(obj => obj.label === data.name)[0].id

        let submitedObject = {...data, id_pacitent: pacitentId}

        requestCreateMedicalCertificate(submitedObject)

    }

    const requestCreateMedicalCertificate = async (data: FormValues) => {
        const urlRequest = apiURL + '/pacitents/add-certificate'
        await axios.post(
            urlRequest,
            data
        )
            .then(_response => {
                alert('Atestado cadastrado com sucesso!')
            })
            .catch(err => {
                console.log(err)
                alert('Erro no cadastramento do atestado!', {type: 'error'})
            })
    }

    

    return(
        <form onSubmit={handleSubmit(onSubmit)}
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
        }}
        >
            <Controller
            control={control}
            name={'name'}
            rules={{
                required: {
                    value: true,
                    message: 'Campo Obrigatório'
                }
            }}
            render={(_params) => {
                return(
                    <Autocomplete 
                    disablePortal
                    options={optionsPacitents}
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        justifySelf: 'center'
                    }}
                    renderInput={(params) => (
                        <TextField
                        autoFocus
                        label={'Nome'}
                        {...register('name')}
                        helperText={errors.name?.message}
                        error={!!errors.describe?.message}
                        required={true}
                        variant="standard"
                        {...params}
                        />
                    )}
                    />  
                )
            }}
           /> 
           {errors.name && <p>{errors.name.message}</p>}

            <Controller
            control={control}
            name={'describe'}
            rules={{
            }}
            render={(_params) => {
                return(
                    <TextField
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        justifySelf: 'center'
                    }}
                    autoFocus
                    label={'Descrição'}
                    {...register('describe')}
                    helperText={errors.describe?.message}
                    error={!!errors.describe?.message}
                    variant="standard"
                    />
                )
            }}
           /> 
           {errors.describe && <p>{errors.describe.message}</p>}

            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    control={control}
                    name={'start_date'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Campo Obrigatório'
                        }
                    }}
                    render={(_params) => {
                        return(
                            <DatePicker 
                            label="Data de Início"
                            onChange={(date: Dayjs | null) => {
                                setValue('start_date', date ? date.format('YYYY-MM-DD') : null)
                            }}
                            />
                        )
                    
                    }}
                /> 
            </LocalizationProvider>
            {errors.start_date && <p>{errors.start_date.message}</p>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    control={control}
                    name={'end_date'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Campo Obrigatório'
                        }
                    }}
                    render={(_params) => {
                        return(
                            <DatePicker 
                            label="Data Final"
                            onChange={(date: Dayjs | null) => {
                                setValue('end_date', date ? date.format('YYYY-MM-DD') : null)
                            }}
                            />
                        )
                    
                    }}
                /> 
            </LocalizationProvider>
            {errors.end_date && <p>{errors.end_date.message}</p>}
            </Box>
           

           <Button type='submit' variant="contained" onClick={handleSubmit(onSubmit)}>
                Cadastrar
           </Button>
        </form>
    )
}