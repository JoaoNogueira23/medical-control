import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import routes from "./routes";


const router = createBrowserRouter([
    {
        element: <Root/>,
        children: routes
    }
])

export default router;