import { Chip, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSnackBar from "../../../hooks/useSnackbar";
import AddIcon from '@mui/icons-material/Add'

interface PropsComponents {
    emails: string[];
    setEmails: React.Dispatch<React.SetStateAction<string[]>>;
    value: string;
}

export function EmailInputDatagrid({value='', emails, setEmails}: PropsComponents){

    const alert = useSnackBar()

    const [email, setEmail] = useState<string>('')

    const handleDeleteEmail = (emailToDelete: string) => {
        const updatedEmails = emails.filter(email => email !== emailToDelete)
        setEmails(updatedEmails)
    }

    const validateEmail = (emailTest: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTest)
    }

    const handleAddEmail = () => {
        !validateEmail(email) ? alert("Invalid E-mail!", {type: 'warning'}) : ''
        if(email && !emails.includes(email) && validateEmail(email)){
            setEmails([...emails, email])
            setEmail('')
        }
    }

    useEffect(() => {
        let arrayEmails = value.split(';')
        setEmails(arrayEmails)
    }, [])


    return(
        <Stack
        spacing={0.5}
        >   
            {emails.map((email, key) => (
                <Chip
                key={key}
                label={email}
                onDelete={() => handleDeleteEmail(email)}
                />
            ))}
            <TextField 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
                if(e.key == 'enter'){
                    handleAddEmail()
                    e.preventDefault()
                }
            }}
            />
            <IconButton
            onClick={handleAddEmail}
            >
                <AddIcon />
            </IconButton>

        </Stack>
    )
}