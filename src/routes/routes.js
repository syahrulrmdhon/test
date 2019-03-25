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
import Description from '../views/description/index'
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

//profile
import BasicInformation from './../views/profile/basic'
import UpdatePassword from './../views/profile/update-password'
import TeachList from './../views/profile/teach-list'


//online exams
import OnlineExamList from './../views/online-test/exam-list/index'
import CreateList from './../views/online-test/create-exam/index'
import Bank from './../views/online-test/bank/bank'
import Global from './../views/global/navbar'
import CreateQuestion from './../views/online-test/create-exam/create-question'

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
        // for resend email verification
        path: '/notif-regist/:code',
        component: NewPassword
    },
    {
        // for send email verification
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
        path: '/attendance',
        component: Absensi
    },

    // PENILAIAN
    {
        path: '/assessment/add',
        component: AssessmentNew
    },
    {
        path: '/assessment/edit/:id',
        component: AssessmentNew
    },
    {
        path: '/assessment/add-component',
        component: AssessmentComponent
    },
    {
        path: '/assessment/edit-component/:id',
        component: AssessmentComponent
    },
    {
        path: '/assessment',
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
        path: '/score-list',
        component: DaftarNilai
    },
    {
        path: '/student-report',
        component: Rapor
    },
    {
        path: '/students',
        component: DaftarMurid
    },
    {
        path: '/detail/:id',
        exact: true,
        component: StudentDetail
    },
    {
        path: '/detail/:id/description/:subject',
        component: Description
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
        component: Questions //beri nilai tidak buat soal
    },
    {
        path: '/beri-nilai/:assessment_id/exam/:exam_id/class/:class_id',
        component: NoQuestions
    },
    {
        path: '/score/attitude/:id',
        exact: true,
        component: DetailScoreAttitude
    },
    {
        path: '/score/attitude/new/assessment/:assessment_id/class/:class_id/user/:user_id',
        component: NewAttitudeScore
    },
    {
        path: '/profile/basic-information',
        component: BasicInformation
    },
    {
        path: '/profile/update-password',
        component: UpdatePassword
    },
    {
        path: '/profile/teach-list',
        component: TeachList
    },

    //online exams
    {
        path: '/online-exam/',
        exact: true,
        component: OnlineExamList
    },
    {
        path: '/online-exam/create/:assessment/exam/:exam',
        component: CreateQuestion
    },
    {
        path: '/online-exam/create',
        component: CreateList
    },
    {
        path: '/bank',
        component: Bank
    },

    {
        path: '/globa',
        component: Global
    },

    {
        path: '*',
        component: NotFound
    }
];