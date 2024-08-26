import { useContext } from "react";
import { SnackBarContext } from "../components/SnackBar";


export default function useSnackBar() {
    const {handleMessage} = useContext(SnackBarContext)

    return handleMessage
}