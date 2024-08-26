import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import routes from "../router/routes";


export default function Root(){
    return(
        <>
            <SideBar routes={routes} />
            <Outlet />
        </>
    )
}