import { Login } from '../views'
import Home from '../views/beranda/beranda'
import Absensi from '../views/absensi/absensi'

import Assessment from '../views/penilaian/penilaian'
import AssessmentNew from '../views/penilaian/add'
import AssessmentComponent from '../views/penilaian/add_component'
import AttitudeDetail from '../views/penilaian/attitude_detail'
// import AssessmentEdit from '../views/penilaian/edit'

// exam - skill
import AddSkill from './../views/exam/skill/add'
import QuestionSkill from './../views/exam/skill/add_question'

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
import EditExam from '../views/create-exam/index'
import EditQuestion from '../views/create-exam/create-question'
import Regist from '../views/auth/regist/regist'
import Forgot from '../views/auth/forgot/forgot'
import Notif from './../views/auth/forgot/notif'
import Verification from '../views/auth/regist/verification';
import NotifRegist from '../views/auth/regist/notif-regist';
import NewPassword from '../views/auth/password/new-password';
import ExamDetail from './../views/exam/detail/index'
import DetailScoreAttitude from './../views/beri-nilai/attitude/'
import NewAttitudeScore from './../views/beri-nilai/attitude/new'



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
        path: '/notif-forgot',
        component: Notif
    },
    {
        path: '/verification',
        exact: true,
        component: Verification
    },
    {
        path: '/notif-regist',
        exact: true,
        component: NotifRegist
    },
    {
        path: '/verification/:code',
        component: NewPassword
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
    {
        path: '/attitude/:id/:category',
        component: AttitudeDetail
    },
    // END PENILAIAN

    // SKILL
    {
        path: '/create-skill/:id',
        component: AddSkill
    },
    {
        path: '/question-skill/:id',
        component: QuestionSkill
    },
    {
        path: '/edit-skill/:id/exam/:exam_id',
        component: AddSkill
    },
    {
        path: '/edit-question-skill/:id/exam/:exam_id',
        component: QuestionSkill
    },
    // END SKILL

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
        path: '/assessment/:assessment_id/exam/:exam_id/class/:class_id/student/:student_id',
        component: NewScore
    },
    {
        path: '/create-exam/:id',
        component: CreateExam
    },
    {
        path: '/assessment/:assessment_id/exam/:exam_id/category/:category_id/class/:class_id',
        component: DetailNilai
    },
    {
        path: '/pariticipant-class/:assessment_id/assessment/:exam_id/exam',
        component: ParticipantClass
    },
    {
        path: '/pariticipant-user/:assessment_id/assessment/:exam_id/exam',
        component: ParticipantUser,
    },
    {
        path: '/all-question/:assessment_id/assessment/:exam_id/exam',
        exact: true,
        component: ExamDetail
    },
    {
        path: '/question/:id',
        component: Question
    },
    {
        path: '/edit/:id/exam/:examId/question',
        component: EditQuestion
    },
    {
        path: '/edit/:id/exam/:examId',
        component: EditExam
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
        path:'/score/attitude/',
        exact:true,
        component:DetailScoreAttitude
    },
    {
        path:'/score/attitude/new',
        component:NewAttitudeScore
    },
    {
        path: '*',
        component: NotFound
    }
];