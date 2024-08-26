
//Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeMaxOutlined'
import HomePage from '../pages/HomePage'
import { RouteType } from './IRoute'


const routes: RouteType[] = [
    {
        title: 'home',
        path: '/',
        icon: <HomeOutlinedIcon />,
        element: <HomePage/>
    }
]

export default routes;