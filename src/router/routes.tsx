import HomePage from '../pages/Home/HomePage'
import { RouteType } from './IRoute'
import OverviewPacients from '../pages/OverviewPacients';
import CertificateMedicalPage from '../pages/OverviewCertificateMedical';


const routes: RouteType[] = [
    {
        title: 'Visão Geral',
        path: '/',
        element: <HomePage/>
    },
    {
        title: 'Resgistro de Pacientes',
        path: '/pacients-control',
        element: <OverviewPacients />
    },
    {
        title: 'Atestados Médicos',
        path: '/certificate-medical',
        element: <CertificateMedicalPage />
    },
]

export default routes;