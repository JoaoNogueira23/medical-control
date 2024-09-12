
//Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeMaxOutlined'
import HomePage from '../pages/Home/HomePage'
import { RouteType } from './IRoute'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import OverviewPacients from '../pages/OverviewPacients';
import CertificateMedicalPage from '../pages/OverviewCertificateMedical';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const routes: RouteType[] = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeOutlinedIcon />,
        element: <HomePage/>
    },
    {
        title: 'Resgistro de Pacientes',
        path: '/pacients-control',
        icon: <HowToRegIcon />,
        element: <OverviewPacients />
    },
    {
        title: 'Atestados Médicos',
        path: '/certificate-medical',
        icon: <AppRegistrationIcon />,
        element: <CertificateMedicalPage />
    },
]

export default routes;