import { Login } from '../views'
import Home from '../views/beranda/beranda'
import Absensi from '../views/absensi/absensi'
import Assessment from '../views/penilaian/penilaian'
import AssessmentNew from '../views/penilaian/new'
import DaftarNilai from '../views/daftar-nilai/daftar-nilai'
import Rapor from '../views/rapor/rapor'
import DaftarMurid from '../views/student/murid'
import StudentDetail from '../views/student/detail'
import SwitchAccount from '../views/global/switch_account'
import Exam from '../views/exam/index'
import CreateExam from '../views/create-exam/Index'
import DetailNilai from './../views/beri-nilai/beri-nilai'
import Question from '../views/create-exam/create-question'
import ParticipantClass from '../views/exam/participant_class/new'
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
        component: Home
    },
    {
        path: '/absen',
        component: Absensi
    },
    {
        path: '/penilaian/tambah',
        component: AssessmentNew
    },
    {
        path: '/penilaian',
        component: Assessment
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
        path: '/exam/:id',
        component: Exam
    },
    {
        path: '/create-exam/:id',
        component: CreateExam
    },
    {
        path: '/nilai' ,
        component:DetailNilai
    },
    {
        path: '/pariticipant-class' ,
        component:ParticipantClass
    },
    {
        path: '/question/:id',
        component: Question
    },
    {
        path: '*',
        component: NotFound
    }
];