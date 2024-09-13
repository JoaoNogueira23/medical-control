import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Header from "../components/Header";


export default function Root(){
    return(
        <Stack
        sx={{
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <Header />
            <Outlet />
        </Stack>
    )
}