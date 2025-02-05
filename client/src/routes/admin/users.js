import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

//import EditQuestionsType from '../../container/pages/EditQuestionsType';
const page_path = '../../container/pages/';

const AddPost = lazy(() => import('../../container/pages/AddPost'));
const EditPost = lazy(() => import('../../container/pages/EditPost'));
const ViewPost = lazy(() => import('../../container/pages/ViewPost'));

// const AddPins = lazy(() => import('../../container/pages/AddPins'));
const StudentDashboard = lazy(() => import('../../container/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../../container/dashboard/TeacherDashboard'));
// const DefaultImage = lazy(() => import('../../container/pages/DefaultImage'));
const DefaultLink = lazy(() => import('../../container/pages/DefaultLink'));
const EditPins = lazy(() => import('../../container/pages/EditPins'));
const ViewPins = lazy(() => import('../../container/pages/ViewPins'));

const AddUser = lazy(() => import('../../container/pages/AddUsers'));
const EditUser = lazy(() => import('../../container/pages/EditUsers'));
const ViewUser = lazy(() => import('../../container/pages/ViewUsers'));
const UsersList = lazy(() => import('../../container/pages/UsersList'));
const AddUserRole = lazy(() => import('../../container/pages/AddUsersRole'));
const Roles_Permissions = lazy(() => import('../../container/pages/EditUsersRole'));
const Payments = lazy(() => import('../../container/pages/Payments'));
const Subscriptions = lazy(() => import('../../container/pages/Subscriptions'));
const Plans = lazy(() => import('../../container/pages/Plans'));

const SectionList = lazy(() => import('../../container/pages/SectionList'));
const SkillList = lazy(() => import('../../container/pages/SkillList'));
const TopicList = lazy(() => import('../../container/pages/TopicList'));
const UserGroup = lazy(() => import('../../container/pages/UserGroup'));

const CategoryList = lazy(() => import('../../container/pages/CategoryList'));
const SubCategory = lazy(() => import('../../container/pages/SubCategory'));
const TagsList = lazy(() => import('../../container/pages/TagsList'));

const QuizzesList = lazy(() => import('../../container/pages/QuizzesList'));
const CreateNewQuiz = lazy(() => import('../../container/pages/CreateNewQuiz'));
const CreateNewExam = lazy(() => import('../../container/pages/CreateNewExam'));
const EditNewQuiz = lazy(() => import('../../container/pages/EditNewQuiz'));
const EditNewExam = lazy(() => import('../../container/pages/EditNewExam'));
const OverAllReportQuiz = lazy(() => import('../../container/pages/OverAllReportQuiz'));
const QuizDetailedReport = lazy(() => import('../../container/pages/QuizDetailedReport'));
const OverAllReportExam = lazy(() => import('../../container/pages/OverAllReportExam'));
const ExamDetailedReport = lazy(() => import('../../container/pages/ExamDetailedReport'));

const ExamList = lazy(() => import('../../container/pages/ExamList.js'));
const CreatePractice = lazy(() => import('../../container/pages/CreatePractice'));
const QuizType = lazy(() => import('../../container/pages/QuizType.js'));
const ExamType = lazy(() => import('../../container/pages/ExamType.js'));

const PracticeSets = lazy(() => import('../../container/pages/PracticeSets.js'));

const PracticeLessonList = lazy(() => import('../../container/pages/PracticeLessonList.js'));
const CreatePracticeLesson = lazy(() => import('../../container/pages/CreatePracticeLesson'));
const PracticeVideoList = lazy(() => import('../../container/pages/PracticeVideoList.js'));
const CreatePracticeVideo = lazy(() => import('../../container/pages/CreatePracticeVideo'));

const Lessions = lazy(() => import('../../container/pages/ExamType.js'));
const Videos = lazy(() => import('../../container/pages/ExamType.js'));
const LessionsBank = lazy(() => import('../../container/pages/LessonBank.js'));

//******************* Question Bank Starts ********************************************/
const ImportQuestions = lazy(() => import('../../container/pages/ImportQuestions'));
const ComprehensionsList = lazy(() => import('../../container/pages/ComprehensionsList'));
const QuestionsTypes = lazy(() => import('../../container/pages/QuestionsTypes'));
const QuestionList = lazy(() => import('../../container/pages/QuestionList'));
const AddQuestionsSingle = lazy(() => import('../../container/pages/AddQuestionsSingle'));
const EditQuestions = lazy(() => import('../../container/pages/EditQuestions'));
const Addshortquestion = lazy(() => import('../../container/pages/Addshortquestion'));
const AddQuestionType = lazy(() => import('../../container/pages/AddQuestionType'));
const EditQuestionsType = lazy(() => import('../../container/pages/EditQuestionsType'));
const EditComprehension = lazy(() => import('../../container/pages/EditComprehension'));
// const AddQuestionsType = lazy(() => import('../../container/pages/AddQuestionsType'));
//******************* Questions Bank Ends ********************************************/

// const Board = lazy(() => import('../../components/PinterestBoard/TrelloApp'));
// const NewBoard = lazy(() => import('../../ComponentsTrello/BoardApp'));
const Schedule = lazy(() => import('../../components/Schedules/TrelloApp'));
const Pin = lazy(() => import('../../container/pages/Pin'));

const CustomerList = lazy(() => import('../../container/pages/CustomerList'));
const AddCustomer = lazy(() => import('../../container/pages/AddCustomer'));
const ViewCustomer = lazy(() => import('../../container/pages/ViewCustomer'));
const EditCustomer = lazy(() => import('../../container/pages/EditCustomer'));

const ChatGpt = lazy(() => import('../../container/pages/GeneralSetting'));
const Configuration = lazy(() => import('../../container/pages/Configuration'));
const FormUI = lazy(() => import('../../container/pages/FormUI'));

const SocialAccounts = lazy(() => import('../../container/pages/SocialAccounts'));

const GeneralSetting = lazy(() => import('../../container/pages/GeneralSetting'));
const LocalSettings = lazy(() => import('../../container/pages/LocalSettings'));
const HomePageSetting = lazy(() => import('../../container/pages/HomePageSetting'));
const EmailSetting = lazy(() => import('../../container/pages/EmailSetting'));
const PaymentSetting = lazy(() => import('../../container/pages/PaymentSetting'));
const BillandTaxSetting = lazy(() => import('../../container/pages/BillandTaxSetting'));
const ThemeSetting = lazy(() => import('../../container/pages/ThemeSetting'));
const MainteneceSetting = lazy(() => import('../../container/pages/MainteneceSetting'));
const Students = lazy(() => import('../../container/pages/Students'));
const Teachers = lazy(() => import('../../container/pages/Teachers'));
const ClassWork = lazy(() => import('../../container/pages/ClassWork'));
const VideoBank = lazy(() => import('../../container/pages/VideoBank.js'));
const CreateVideo = lazy(() => import('../../container/pages/CreateVideos'));
const PinList = lazy(() => import('../../container/pages/PinList'));
const LoginNew = lazy(() => import('../admin/LoginNew'));
const Signupcategory = lazy(() => import('../admin/Signupcategory'));
const CreateUser = lazy(() => import('../admin/CreateUser'));

const Board = lazy(() => import('../../components/PinterestBoard/TrelloApp'));
const AddDifficultyLevel = lazy(() => import('../../container/pages/AddDifficultyLevel'));
const CreatedLessons = lazy(() => import('../../container/pages/CreatedLessons'));
const EditLessons = lazy(() => import('../../container/pages/EditLessons'));
const EditVideos = lazy(() => import('../../container/pages/EditVideos'));
const EditPractice = lazy(() => import('../../container/pages/EditPractice'));
const AddMatchQuestions = lazy(() => import('../../container/pages/AddMatchQuestions'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* 1 */}
      <Route path={`${path}/add-post`} component={AddPost} />
      <Route path={`${path}/edit-post/:id`} component={EditPost} />
      <Route path={`${path}/view-post/:id`} component={ViewPost} />

      {/* <Route path={`${path}/default-image`} component={DefaultImage} /> */}
      <Route path={`${path}/default-link`} component={DefaultLink} />
      {/* <Route path={`${path}/add-pins`} component={AddPins} /> */}
      <Route path={`${path}/student`} component={StudentDashboard} />
      <Route path={`${path}/teacher`} component={TeacherDashboard} />
      <Route path={`${path}/edit-pins/:id`} component={EditPins} />
      <Route path={`${path}/view-pins/:id`} component={ViewPins} />
      <Route path={`${path}/plans`} component={Plans} />
      <Route path={`${path}/subscriptions`} component={Subscriptions} />
      <Route path={`${path}/payments`} component={Payments} />
      <Route path={`${path}/add-user`} component={AddUser} />
      <Route path={`${path}/add-role`} component={AddUserRole} />
      <Route path={`${path}/edit-user/:id`} component={EditUser} />
      <Route path={`${path}/view-user/:id`} component={ViewUser} />
      <Route path={`${path}/users`} component={UsersList} />
      <Route path={`${path}/lessons`} component={LessionsBank} />
      <Route path={`${path}/roles-permissions`} component={Roles_Permissions} />
      {/* Manage Tests */}
      {/* <Route path={`${path}/quizzes`} component={QuizzesList} /> */}
      <Route path={`${path}/create`} component={CreateNewQuiz} />
      <Route path={`${path}/create-exam`} component={CreateNewExam} />
      <Route path={`${path}/:id/edit-quiz`} component={EditNewQuiz} />
      <Route path={`${path}/:id/edit-exam`} component={EditNewExam} />
      <Route path={`${path}/:id/overallQuiz-report`} component={OverAllReportQuiz} />
      <Route path={`${path}/:id/quizDetailed_report`} component={QuizDetailedReport} />
      <Route path={`${path}/:id/overallExam-report`} component={OverAllReportExam} />
      <Route path={`${path}/:id/examDetailed_report`} component={ExamDetailedReport} />
      <Route path={`${path}/exams`} component={ExamList} />
      <Route path={`${path}/quiz-type`} component={QuizType} />
      <Route path={`${path}/exam-type`} component={ExamType} />

      {/* Manage Learning */}
      <Route path={`${path}/practice-sets`} component={PracticeSets} />
      <Route path={`${path}/createpractice`} component={CreatePractice} />

      <Route path={`${path}/configure-lessons`} component={CreatePracticeLesson} />
      <Route path={`${path}/createpracticelesson`} component={CreatePracticeLesson} />

      <Route path={`${path}/configure-videos`} component={CreatePracticeVideo} />
      <Route path={`${path}/createpracticevideo`} component={CreatePracticeVideo} />

      <Route path={`${path}/exam-type`} component={ExamType} />
      <Route path={`${path}/exam-type`} component={ExamType} />

      {/* ******************* Question Bank Routes Starts *********************************************/}
      <Route path={`${path}/question`} component={QuestionList} />
      <Route path={`${path}/:id/add-singlequestion`} component={AddQuestionsSingle} />
      <Route path={`${path}/:id/edit-questions/`} component={EditQuestions} />
      <Route path={`${path}/add-shortquestions`} component={Addshortquestion} />
      <Route path={`${path}/add-questiontype`} component={AddQuestionType} />
      <Route path={`${path}/:id/edit-questiontype`} component={EditQuestionsType} />
      <Route path={`${path}/import-questions`} component={ImportQuestions} />
      <Route path={`${path}/comprehension`} component={ComprehensionsList} />
      <Route path={`${path}/question-types`} component={QuestionsTypes} />
      <Route path={`${path}/:id/edit-comprehension`} component={EditComprehension} />
      {/* ******************* Question Bank Routes Ends *********************************************/}

      <Route path={`${path}/categorieslist`} component={CategoryList} />
      <Route path={`${path}/sub-category`} component={SubCategory} />
      <Route path={`${path}/tags`} component={TagsList} />

      <Route path={`${path}/add-customer`} component={AddCustomer} />
      <Route path={`${path}/view-customer/:id`} component={ViewCustomer} />
      <Route path={`${path}/edit-customer/:id`} component={EditCustomer} />

      <Route exact path={`${path}/social_accounts`} component={SocialAccounts} />
      {/* <Route exact path={`${path}/Board`} component={Board} />
      <Route exact path={`${path}/NewBoard`} component={NewBoard} /> */}
      <Route exact path={`${path}/Pinterest`} component={Pin} />
      <Route exact path={`${path}/schedule`} component={Schedule} />

      <Route path={`${path}/chatgpt`} component={ChatGpt} />
      <Route path={`${path}/configuration`} component={Configuration} />
      <Route path={`${path}/form-builder`} component={FormUI} />

      <Route path={`${path}/sectionlist`} component={SectionList} />
      <Route path={`${path}/skill-list`} component={SkillList} />
      <Route path={`${path}/topiclist`} component={TopicList} />
      <Route path={`${path}/usergroup`} component={UserGroup} />

      <Route path={`${path}/general-settings`} component={GeneralSetting} />
      <Route path={`${path}/local-settings`} component={LocalSettings} />
      <Route path={`${path}/home-settings`} component={HomePageSetting} />
      <Route path={`${path}/email-settings`} component={EmailSetting} />
      <Route path={`${path}/payment-settings`} component={PaymentSetting} />
      <Route path={`${path}/billandtax-settings`} component={BillandTaxSetting} />
      <Route path={`${path}/theme-settings`} component={ThemeSetting} />
      <Route path={`${path}/maintenance-settings`} component={MainteneceSetting} />
      <Route path={`${path}/students`} component={Students} />
      <Route path={`${path}/teachers`} component={Teachers} />
      <Route path={`${path}/class-work`} component={ClassWork} />
      <Route path={`${path}/videos`} component={VideoBank} />
      <Route path={`${path}/createVideo`} component={CreateVideo} />
      <Route path={`${path}/pin-list`} component={PinList} />
      <Route path={`${path}/login-new`} component={LoginNew} />
      <Route path={`${path}/signup-category`} component={Signupcategory} />
      <Route path={`${path}/create-new-user`} component={CreateUser} />
      <Route exact path={`${path}/Board`} component={Board} />
      <Route path={`${path}/add-difficultylevel`} component={AddDifficultyLevel} />
      <Route path={`${path}/createlesson`} component={CreatedLessons} />
      <Route path={`${path}/editlesson/:id`} component={EditLessons} />
      <Route path={`${path}/editvideos/:id`} component={EditVideos} />
      <Route path={`${path}/:id/edit-practice`} component={EditPractice} />
      <Route path={`${path}/:id/add-matchquestions`} component={AddMatchQuestions} />
      <Route path={`${path}/:id/add-shortquestions`} component={Addshortquestion} />

      {/* <Route exact path={`${path}/Board`} component={Board} /> */}
    </Switch>
  );
};
export default PagesRoute;
