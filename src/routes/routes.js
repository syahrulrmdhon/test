import { Login } from '../views'
import Home from '../views/beranda/beranda'
import Absensi from '../views/absensi/absensi'

import Assessment from '../views/penilaian/penilaian'
import AssessmentNew from '../views/penilaian/add'
import AssessmentComponent from '../views/penilaian/add_component'
// import AssessmentEdit from '../views/penilaian/edit'

import DaftarNilai from '../views/daftar-nilai/daftar-nilai'
import Rapor from '../views/rapor/rapor'
import DaftarMurid from '../views/student/murid'
import StudentDetail from '../views/student/detail'
import SwitchAccount from '../views/global/switch_account'
import DetailNilai from './../views/beri-nilai/beri-nilai'
import Exam from '../views/exam/index'
import CreateExam from '../views/create-exam/index'
import Question from '../views/create-exam/create-question'
import ParticipantClass from '../views/exam/participant_class/new'
import ParticipantUser from '../views/exam/participant_class/user_new'
import NoQuestions from '../views/beri-nilai/no-questions/no-questions'
import Questions from '../views/beri-nilai/no-questions/questions'
import NotFound from '../views/global/not-found'
import NewScore from './../views/beri-nilai/new'
import EditQuestion from '../views/create-exam/create-question'
import Regist from './../views/auth/regist'
import Forgot from './../views/auth/forgot'

export const MainRoutes = [
    {
        path: '/',
        exact: true,
        component: Login
  
    },
    {
        path: '/regist',
        component: Regist
    },
    {
        path: '/forgot',
        component: Forgot
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

    // PENILAIAN
    {
        path: '/penilaian/tambah',
        component: AssessmentNew
    },
    {
        path: '/penilaian/edit/:id',
        component: AssessmentNew
    },
    {
        path: '/penilaian/tambah-component',
        component: AssessmentComponent
    },
    {
        path: '/penilaian/edit-component/:id',
        component: AssessmentComponent
    },
    {
        path: '/penilaian',
        component: Assessment
    },
    // END PENILAIAN
    
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
        path: '/nilai/',
        component: DetailNilai
    },
    {
        path: '/exam/:id',
        component: Exam
    },
    {
        path:'/assessment/:assessment_id/exam/:exam_id/class/:class_id/student/:student_id',
        component:NewScore
    },
    {
        path: '/create-exam/:id',
        component: CreateExam
    },
    {
        path: '/assessment/:assessment_id/exam/:exam_id/class/:class_id' ,
        component:DetailNilai
    },
    {
        path: '/pariticipant-class/:assessment_id/assessment/:exam_id/exam' ,
        component:ParticipantClass
    },
    {
        path: '/pariticipant-user/:assessment_id/assessment/:exam_id/exam',
        component: ParticipantUser,
    },
    {
        path: '/question/:id',
        component: Question
    },
    {
        path: '/edit/:id/exam/:id',
        component: EditQuestion
    },
    {
        path: '/questions/:id',
        component: Questions
    },
    {
        path: '/beri-nilai/:assessment_id/exam/:exam_id/class/:class_id',
        component: NoQuestions
    },
    {
        path: '*',
        component: NotFound
    }
];