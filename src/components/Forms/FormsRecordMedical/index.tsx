import { Autocomplete, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";

type FormValues = {
    name: string;
    id: number | null;
    daysJustified: number | null;
    describe: string;
    end_date: string | null;
    start_date: string;
}

type pacitentType = {
    name: string;
    id: number;
    age: number;
    weight: number;
    historyMedical?: string;
    email: string;
    height: number;
    gender: string;
}

type optionsPacitentType = {
    label: string;
    id: number;
}

const pacitentsBase: pacitentType[] = [
    {
    id: 1,
    name: 'João Victor Nogueira Martins', 
    age: 24, 
    weight: 70, 
    email: 'jon.snow@email.com;joao@email.com;joao2@email.com', 
    height: 1.71,
    gender: 'masculino'
    },
    {
    id: 2,
    name: 'Lannister Cersei', 
    age: 31, 
    weight: 75, 
    email: 'cersei.lannister@email.com', 
    height: 1.72,
    gender: 'masculino'
    },
    {
    id: 2,
    name: 'Lannister Jaime', 
    age: 32, 
    weight: 80, 
    email: 'jaime.lannister@email.com', 
    height: 1.90,
    gender: 'masculino'
    },
    {
    id: 2,
    name: 'Stark Arya', 
    age: 11, 
    weight: 50, 
    email: 'arya.stark@email.com', 
    height: 1.50,
    gender: 'feminino'
    },
  ]


export default function FormsRecordMedical() {
    
    // states and variables
    const [optionsPacitent, setOptionsPacitent] = useState<optionsPacitentType[]>([])

    const {
        handleSubmit, 
        control, 
        register,
        setValue,
        formState: {errors}
    }  = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
        let pacitentId = optionsPacitent.filter(obj => obj.label === data.name)[0].id

        let submitedObject = {...data, id_pacitent: pacitentId}

        console.log(submitedObject)

    }

    


    useEffect(() => {
        if(optionsPacitent.length == 0){
            const temp: optionsPacitentType[] = pacitentsBase.map(obj => ({
                label: obj.name,
                id: obj.id
            }))

            setOptionsPacitent(temp)
        }
    })

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
                    options={optionsPacitent}
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

            <Controller
            control={control}
            name={'daysJustified'}
            render={(_params) => {
                return(
                    <TextField
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        justifySelf: 'center'
                    }}
                    autoFocus
                    type="number"
                    label={'Dias de Atestado'}
                    {...register('daysJustified')}
                    helperText={errors.daysJustified?.message}
                    error={!!errors.daysJustified?.message}
                    variant="standard"
                    />
                )
            }}
           /> 
           {errors.daysJustified && <p>{errors.daysJustified.message}</p>}

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

           <Button type='submit' variant="contained" onClick={handleSubmit(onSubmit)}>
                Cadastrar
           </Button>
        </form>
    )
}