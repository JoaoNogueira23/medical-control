import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {Alert, AlertColor, Snackbar, SnackbarCloseReason} from '@mui/material'


type PositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface MessageOptions {
    type?: AlertColor;
    position?: PositionType;
    duration?: number;
}

type Full<T> = {
    [P in keyof T]-?: T[P]
}

interface MessageProps extends Full<MessageOptions>{
    label: string;
}

interface SnackBarContextProps {
    handleMessage: (message: string, options?: MessageOptions) => void
}

export const SnackBarContext = createContext<SnackBarContextProps>({} as SnackBarContextProps)

export const SnackBarProvider = ({children}: PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<MessageProps>({
        label: '',
        type: 'success',
        position: 'bottom-left',
        duration: 3000
    })

    const {label, type, position} = message

    const handleMessage = (message: string, options?: MessageOptions) => setMessage({
        label: message,
        type: options?.type ?? 'success',
        position: options?.position ?? 'bottom-left',
        duration: options?.duration ?? 3000
    })

    const handleClose = (_: Event | React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if(reason == 'clickaway') return;
        setOpen(false)
    }

    useEffect(() => {
        const {duration, label} = message
        if(label){
            setOpen(true)
            const timeout = setTimeout(() => setOpen(false), duration)
            return () => clearTimeout(timeout)
        }
    }, [message])

    const [vertical, horizontal] = position.split("-") as ['bottom' | "top", "left" | "center" | "right"];

    return(
        <SnackBarContext.Provider value={{handleMessage}}>
            <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{vertical, horizontal}}
            sx={{
                maxWidth: "45%"
            }}
            >
                <Alert
                onClose={handleClose}
                severity={type}
                sx={{width: '100%'}}
                >
                    {label}
                </Alert>
            </Snackbar>
            {children}
        </SnackBarContext.Provider>


    )
    
}