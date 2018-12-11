import { Login } from '../views';
import Beranda from '../views/beranda/beranda';
import Absensi from '../views/absensi/absensi';
import Penilaian from '../views/penilaian/penilaian';
import DaftarNilai from '../views/daftar-nilai/daftar-nilai';
import Rapor from '../views/rapor/rapor';
import DaftarMurid from '../views/murid/murid';

export const MainRoutes = [
    // {
    //     path: '/',
    //     component: Login
    // },
    {
        path: '/home',
        component: Beranda
    },
    {
        path: '/absensi',
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
    }
];