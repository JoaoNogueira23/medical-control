import {Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import axios from "axios";
import useSnackBar from "../../../hooks/useSnackbar";
import useAppContext from "../../../hooks/useAppContext";
import useDataContext from "../../../hooks/useDataContext";
import { pacitentDataType } from "../../../types/dataTypes/pacitentTypes";

type FormValues = {
    name: string;
    id: string;
    historical?: string;
    age: number;
    height: number;
    weight: number;
    gender: string;
    emailList: string;
}

type ModalProps ={
    handleClose: () => void;
}



export default function FormsResgisterPacient({handleClose}: ModalProps) {
    
    // states and variables
    const {apiURL} = useAppContext()
    const {setPacitents, setOptionsPacitents} = useDataContext()
    const alert = useSnackBar()

    const {
        handleSubmit, 
        control, 
        register,
        formState: {errors}
    }  = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {

        requestCreatePacitent(data)

    }

    const requestPacitents = async () => {
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

                handleClose()
  
            })
            .catch(err => {
                console.log(err)
                alert('Erro na requisição!', {type: 'error'})
            })
      }

    const requestCreatePacitent = async (data: FormValues) => {
        const urlRequest = apiURL + '/pacitents/add-pacitent'
        await axios.post(
            urlRequest,
            data
        )
            .then(_response => {
                alert('Atestado cadastrado com sucesso!')
                requestPacitents()
            })
            .catch((_err) => {
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
            gap: '1rem',
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
                    <TextField
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        justifySelf: 'center'
                    }}
                    autoFocus
                    label={'Nome'}
                    {...register('name')}
                    helperText={errors.age?.message}
                    error={!!errors.age?.message}
                    variant="standard"
                    />
                )
            }}
           /> 
           {errors.name && <p>{errors.name.message}</p>}

            <Controller
            control={control}
            name={'age'}
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
                    label={'Idade'}
                    type="number"
                    {...register('age')}
                    helperText={errors.age?.message}
                    error={!!errors.age?.message}
                    variant="standard"
                    />
                )
            }}
           /> 
           {errors.age && <p>{errors.age.message}</p>}

            <Controller
                control={control}
                name={'height'}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo Obrigatório'
                    }
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
                        label={'Altura'}
                        type="number"
                        {...register('height')}
                        helperText={errors.height?.message}
                        error={!!errors.height?.message}
                        variant="standard"
                        />
                    )
                
                }}
            /> 
            {errors.height && <p>{errors.height.message}</p>}

            <Controller
                control={control}
                name={'weight'}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo Obrigatório'
                    }
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
                        label={'Peso'}
                        type="number"
                        {...register('weight')}
                        helperText={errors.weight?.message}
                        error={!!errors.weight?.message}
                        variant="standard"
                        />
                    )
                
                }}
            /> 
            {errors.weight && <p>{errors.weight.message}</p>}

            <Controller
                control={control}
                name={'emailList'}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo Obrigatório'
                    }
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
                        label={'Lista de E-mails'}
                        {...register('emailList')}
                        helperText={errors.emailList?.message}
                        error={!!errors.emailList?.message}
                        variant="standard"
                        />
                    )
                
                }}
            /> 
            {errors.emailList && <p>{errors.emailList.message}</p>}

            <Controller
                control={control}
                name={'gender'}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo Obrigatório'
                    }
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
                        label={'Gênero'}
                        {...register('gender')}
                        helperText={errors.gender?.message}
                        error={!!errors.gender?.message}
                        variant="standard"
                        />
                    )
                
                }}
            /> 
            {errors.gender && <p>{errors.gender.message}</p>}

            <Controller
                control={control}
                name={'historical'}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo Obrigatório'
                    }
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
                        label={'histórico Médico'}
                        {...register('historical')}
                        helperText={errors.historical?.message}
                        error={!!errors.historical?.message}
                        variant="standard"
                        />
                    )
                
                }}
            /> 
            {errors.historical && <p>{errors.historical.message}</p>}
           

            <Button type='submit' variant="contained" onClick={handleSubmit(onSubmit)} color='info'  sx={{
                bgcolor: '#fff'
            }}>
                Cadastrar
           </Button>
        </form>
    )
}