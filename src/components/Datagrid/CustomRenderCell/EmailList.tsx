import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

type PropsComponent = {
    EmailList: string;
}

export default function EmailList({EmailList}: PropsComponent) {
    const [email, setEmails] = useState([])

    useEffect(() => {

    })
    return(
        <Stack>

        </Stack>
    )
}