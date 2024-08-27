import { Paper, PaperProps } from "@mui/material";
import { PropsWithChildren } from "react";



export default function Page({children, sx, ...rest}: PropsWithChildren & PaperProps) {
    return(
        <Paper
        sx={{
            display: 'flex',
            backgroundColor: 'background.default',
            overflowY: 'auto',
            border: 'none',
            width: '100vw',
            ...sx
        }}
        {...rest}
        >
            {children}
        </Paper>
    )
}