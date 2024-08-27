
//Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeMaxOutlined'
import HomePage from '../pages/Home/HomePage'
import { RouteType } from './IRoute'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import OverviewPacients from '../pages/OverviewPacients';


const routes: RouteType[] = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeOutlinedIcon />,
        element: <HomePage/>
    },
    {
        title: 'Overview Pacients',
        path: '/pacients-control',
        icon: <AppRegistrationIcon />,
        element: <OverviewPacients />
    },
]

export default routes;