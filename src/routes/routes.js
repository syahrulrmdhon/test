import { Login } from '../views'
import Beranda from '../views/beranda/beranda'
import Absensi from '../views/absensi/absensi'
import Penilaian from '../views/penilaian/penilaian'
import DaftarNilai from '../views/daftar-nilai/daftar-nilai'
import Rapor from '../views/rapor/rapor'
import DaftarMurid from '../views/student/murid'
import StudentDetail from '../views/student/detail'
import TablePengetahuan from '../views/daftar-nilai/table-pengetahuan'
import TableKeterampilan from '../views/daftar-nilai/table-keterampilan'
import TableSikap from '../views/daftar-nilai/table-sikap'
import SwitchAccount from '../views/global/switch_account'
import DetailNilai from './../views/beri-nilai/beri-nilai'
import NotFound from '../views/global/not-found'

export const MainRoutes = [
    {
        path: '/',
        exact: true,
        component: Login
    },
    {
        path: '/switch',
        component: SwitchAccount
    },
    {
        path: '/home',
        component: Beranda
    },
    {
        path: '/absen',
        component: Absensi
    },
    {
        path: '/penilaian',
        component: Penilaian
    },
    {
        path: '/daftar-nilai',
        component: DaftarNilai
    },
    {
        path: '/rapor',
        component: Rapor
    },
    {
        path: '/murid',
        component: DaftarMurid
    },
    {
        path: '/detail/:id',
        component: StudentDetail
    },
    {
        path: '/nilai/' ,
        component:DetailNilai   
    },
    {
        path: '*',
        component: NotFound
    }
];