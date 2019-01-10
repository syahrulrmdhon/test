import { Login } from '../views'
import Beranda from '../views/beranda/beranda'
import Absensi from '../views/absensi/absensi'
import Penilaian from '../views/penilaian/penilaian'
import DaftarNilai from '../views/daftar-nilai/daftar-nilai'
import Rapor from '../views/rapor/rapor'
import DaftarMurid from '../views/student/murid'
import StudentDetail from '../views/student/detail/Detail'

export const MainRoutes = [
    {
        path: '/',
        exact: true,
        component: Login
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
        path: '/detail',
        component: StudentDetail
    }
];