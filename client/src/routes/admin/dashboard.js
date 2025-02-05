import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Ecommerce = lazy(() => import('../../container/dashboard/Ecommerce'));
const Business = lazy(() => import('../../container/dashboard/Business'));
const Performance = lazy(() => import('../../container/dashboard/Performance'));
const CRM = lazy(() => import('../../container/dashboard/CRM'));
const AddPins = lazy(() => import('../../container/pages/AddPins'));
// const QuizzesList = lazy(() => import('../../container/pages/QuizzesList'));

//
const AddPost = lazy(() => import('../../container/pages/AddPost'));
const EditPost = lazy(() => import('../../container/pages/EditPost'));
const ViewPost = lazy(() => import('../../container/pages/ViewPost'));

// const AddPins = lazy(() => import('../../container/pages/AddPins'));
const StudentDashboard = lazy(() => import('../../container/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../../container/dashboard/TeacherDashboard'));
const StudentHome = lazy(() => import('../../container/dashboard/StudentDashboard'));
const Tutoring = lazy(() => import('../../container/pages/Tutoring'));
const Exam = lazy(() => import('../../container/pages/Exam'));
const PastPapers = lazy(() => import('../../container/pages/PastPapers'));
const AllCourses = lazy(() => import('../../container/pages/AllCourses.js'));
const ActivePlan = lazy(() => import('../../container/pages/ActivePlan'));
//

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

const Pages = lazy(() => import('../../container/pages/Pages'));

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
const EditNewPage = lazy(() => import('../../container/pages/EditNewPage'));
const AddNewPage = lazy(() => import('../../container/pages/AddNewPage'));
const ViewNewPage = lazy(() => import('../../container/pages/ViewNewPage'));
const EditNewExam = lazy(() => import('../../container/pages/EditNewExam'));
const OverAllReportQuiz = lazy(() => import('../../container/pages/OverAllReportQuiz'));
const OverAllReportPractice = lazy(() => import('../../container/pages/OverAllReportPractice'));
const QuizDetailedReport = lazy(() => import('../../container/pages/QuizDetailedReport'));
const OverAllReportExam = lazy(() => import('../../container/pages/OverAllReportExam'));
const ExamDetailedReport = lazy(() => import('../../container/pages/ExamDetailedReport'));

const ExamList = lazy(() => import('../../container/pages/ExamList.js'));
const CreatePractice = lazy(() => import('../../container/pages/CreatePractice'));
const QuizType = lazy(() => import('../../container/pages/QuizType.js'));
const ExamType = lazy(() => import('../../container/pages/ExamType.js'));
const AddSquenceQuestion = lazy(() => import('../../container/pages/AddSquenceQuestion.js'));
const AddFillTheBlanks = lazy(() => import('../../container/pages/AddFillTheBlanks.js'));
const AddMultipleQuestions = lazy(() => import('../../container/pages/AddMultipleQuestions.js'));

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
const Parents = lazy(() => import('../../container/pages/Parents'));
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
const ImportUsers = lazy(() => import('../../container/pages/ImportUsers'));
const CoursesList = lazy(() => import('../../container/pages/CoursesList'));
const CreateCourses = lazy(() => import('../../container/pages/CreateNewCourse'));
//
const Analysis = lazy(() => import('../../container/pages/Analysis'));
const NewAnalysis = lazy(() => import('../../container/pages/NewAnalysis'));
const ViewResults = lazy(() => import('../../container/pages/ViewResults'));
const Consultation = lazy(() => import('../../container/pages/ConsultationRequests'));
//
const Blog = lazy(() => import('../../container/pages/Blog1'));
const AddBlog = lazy(() => import('../../container/pages/AddBlog'));
const EditBlog = lazy(() => import('../../container/pages/EditBlog'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* 1 */}
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route exact path={`${path}/eco`} component={Ecommerce} />
      <Route exact path={`${path}/business`} component={Business} />
      <Route exact path={`${path}/performance`} component={Performance} />
      <Route exact path={`${path}/crm`} component={CRM} />
      <Route exact path={`${path}/admin`} component={AddPins} />

      {/* 2 */}
      {/* 2 ENGAGE*/}

      {/* Start Manage Tests */}
      <Route path={`${path}/engage/quizzes`} component={QuizzesList} />
      <Route path={`${path}/engage/create`} component={CreateNewQuiz} />
      <Route path={`${path}/engage/edit-quiz/:id`} component={EditNewQuiz} />
      <Route path={`${path}/configuration/add-page`} component={AddNewPage} />
      <Route path={`${path}/configuration/edit-page/:id`} component={EditNewPage} />
      <Route path={`${path}/configuration/view-page/:id`} component={ViewNewPage} />
      <Route path={`${path}/engage/exam-type`} component={ExamType} />
      <Route path={`${path}/library/add-squence-questions/:id`} component={AddSquenceQuestion} />
      <Route path={`${path}/library/add-fillblanks/:id`} component={AddFillTheBlanks} />
      <Route path={`${path}/library/add-muliple-questions/:id`} component={AddMultipleQuestions} />
      <Route path={`${path}/engage/overallQuiz-report/:id`} component={OverAllReportQuiz} />
      <Route path={`${path}/engage/overallpractice-report/:id`} component={OverAllReportPractice} />
      <Route path={`${path}/engage/quizDetailed_report/:id`} component={QuizDetailedReport} />
      <Route path={`${path}/engage/quiz-type`} component={QuizType} />
      <Route path={`${path}/engage/create-exam`} component={CreateNewExam} />
      <Route path={`${path}/engage/edit-exam/:id`} component={EditNewExam} />
      <Route path={`${path}/engage/overallExam-report/:id`} component={OverAllReportExam} />
      <Route path={`${path}/engage/examDetailed_report/:id`} component={ExamDetailedReport} />
      <Route path={`${path}/engage/exams`} component={ExamList} />

      {/* End Manage Tests */}

      {/*Start Manage Learning */}

      <Route path={`${path}/engage/practice-sets`} component={PracticeSets} />
      <Route path={`${path}/engage/createpractice`} component={CreatePractice} />
      <Route path={`${path}/engage/configure-lessons`} component={CreatePracticeLesson} />
      <Route path={`${path}/engage/createpracticelesson`} component={CreatePracticeLesson} />
      <Route path={`${path}/engage/configure-videos`} component={CreatePracticeVideo} />
      <Route path={`${path}/engage/createpracticevideo`} component={CreatePracticeVideo} />
      <Route path={`${path}/engage/edit-practice/:id`} component={EditPractice} />
      <Route path={`${path}/engage/courses`} component={CoursesList} />
      <Route path={`${path}/engage/create-course`} component={CreateCourses} />

      {/*End Manage Learning */}

      {/* Start Manage Events */}
      <Route exact path={`${path}/engage/Pinterest`} component={Pin} />
      <Route exact path={`${path}/engage/schedule`} component={Schedule} />
      <Route exact path={`${path}/engage/Board`} component={Board} />
      <Route path={`${path}/engage/pin-list`} component={PinList} />
      {/*End  Manage Events */}

      {/* 3 LIBRARY*/}

      {/* Question Bank Routes Starts */}
      <Route path={`${path}/library/question`} component={QuestionList} />
      <Route path={`${path}/library/add-singlequestion/:id`} component={AddQuestionsSingle} />
      <Route path={`${path}/library/edit-questions/:id`} component={EditQuestions} />
      <Route path={`${path}/library/add-shortquestions/:id`} component={Addshortquestion} />
      <Route path={`${path}/library/add-questiontype`} component={AddQuestionType} />
      <Route path={`${path}/library/edit-questiontype/:id`} component={EditQuestionsType} />
      <Route path={`${path}/library/import-questions`} component={ImportQuestions} />
      <Route path={`${path}/library/comprehension`} component={ComprehensionsList} />
      <Route path={`${path}/library/question-types`} component={QuestionsTypes} />
      <Route path={`${path}/library/edit-comprehension/:id`} component={EditComprehension} />
      <Route path={`${path}/library/add-matchquestions/:id`} component={AddMatchQuestions} />
      {/* Question Bank Routes Ends */}

      {/* Lesson Bank Routes Starts */}
      <Route path={`${path}/library/lessons`} component={LessionsBank} />
      <Route path={`${path}/library/editlesson/:id`} component={EditLessons} />
      <Route path={`${path}/library/createlesson`} component={CreatedLessons} />
      {/* Lesson Bank Routes Ends */}

      {/* Video Bank Routes Starts */}
      <Route path={`${path}/library/videos`} component={VideoBank} />
      <Route path={`${path}/library/editvideos/:id`} component={EditVideos} />
      <Route path={`${path}/library/createVideo`} component={CreateVideo} />

      {/* Video  Bank Routes Ends /}
      

      {/* 4 CONFIGURATION*/}

      {/* Start  Monetization */}
      <Route path={`${path}/configuration/plans`} component={Plans} />
      <Route path={`${path}/configuration/pages`} component={Pages} />

      <Route path={`${path}/configuration/subscriptions`} component={Subscriptions} />
      <Route path={`${path}/configuration/payments`} component={Payments} />

      {/* Ends  Monetization */}

      {/* Start  Manage Users */}
      <Route path={`${path}/configuration/users`} component={UsersList} />

      <Route path={`${path}/configuration/create-new-user`} component={CreateUser} />
      <Route path={`${path}/configuration/usergroup`} component={UserGroup} />
      <Route path={`${path}/configuration/add-user`} component={AddUser} />
      <Route path={`${path}/configuration/add-role`} component={AddUserRole} />
      <Route path={`${path}/configuration/roles-permissions`} component={Roles_Permissions} />
      <Route path={`${path}/configuration/import-users`} component={ImportUsers} />

      {/* Ends  Manage Users */}
      {/* Start  Manage Categories */}
      <Route path={`${path}/configuration/categorieslist`} component={CategoryList} />
      <Route path={`${path}/configuration/sub-category`} component={SubCategory} />
      <Route path={`${path}/configuration/tags`} component={TagsList} />

      {/* Ends  Manage Categories */}
      {/* Start  Manage Subjects */}
      <Route path={`${path}/configuration/sectionlist`} component={SectionList} />
      <Route path={`${path}/configuration/skill-list`} component={SkillList} />
      <Route path={`${path}/configuration/topiclist`} component={TopicList} />

      {/* Ends  Manage Subjects */}

      {/* Start  Settings */}
      <Route path={`${path}/configuration/general-settings`} component={GeneralSetting} />
      <Route path={`${path}/configuration/local-settings`} component={LocalSettings} />
      <Route path={`${path}/configuration/home-settings`} component={HomePageSetting} />
      <Route path={`${path}/configuration/email-settings`} component={EmailSetting} />
      <Route path={`${path}/configuration/payment-settings`} component={PaymentSetting} />
      <Route path={`${path}/configuration/billandtax-settings`} component={BillandTaxSetting} />
      <Route path={`${path}/configuration/theme-settings`} component={ThemeSetting} />
      <Route path={`${path}/configuration/maintenance-settings`} component={MainteneceSetting} />

      {/* Ends  Settings */}
      {/* Starts  Teacher Dashboard */}
      <Route path={`${path}/students`} component={Students} />
      <Route path={`${path}/parents`} component={Parents} />
      <Route path={`${path}/teachers`} component={Teachers} />
      <Route path={`${path}/class-work`} component={ClassWork} />
      <Route path={`${path}/student`} component={StudentDashboard} />
      <Route path={`${path}/teacher`} component={TeacherDashboard} />
      <Route path={`${path}/studenthome`} component={StudentHome} />
      <Route path={`${path}/tutoring`} component={Tutoring} />
      <Route path={`${path}/exam`} component={Exam} />
      <Route path={`${path}/PastPapers`} component={PastPapers} />
      <Route path={`${path}/AllCourses`} component={AllCourses} />
      <Route path={`${path}/activeplan`} component={ActivePlan} />
      <Route path={`${path}/blog`} component={Blog} />
      <Route path={`${path}/addblog`} component={AddBlog} />
      <Route path={`${path}/editblog/:id`} component={EditBlog} />
      {/* Ends  Teacher Dashboard */}

      {/* 1 Extra Files*/}

      <Route path={`${path}/add-customer`} component={AddCustomer} />
      <Route path={`${path}/view-customer/:id`} component={ViewCustomer} />
      <Route path={`${path}/edit-customer/:id`} component={EditCustomer} />
      <Route exact path={`${path}/social_accounts`} component={SocialAccounts} />
      <Route path={`${path}/chatgpt`} component={ChatGpt} />
      <Route path={`${path}/configuration`} component={Configuration} />
      <Route path={`${path}/form-builder`} component={FormUI} />
      <Route path={`${path}/login-new`} component={LoginNew} />
      <Route path={`${path}/signup-category`} component={Signupcategory} />
      <Route path={`${path}/add-post`} component={AddPost} />
      <Route path={`${path}/edit-post/:id`} component={EditPost} />
      <Route path={`${path}/view-post/:id`} component={ViewPost} />
      {/* <Route path={`${path}/default-image`} component={DefaultImage} /> */}
      <Route path={`${path}/default-link`} component={DefaultLink} />
      <Route path={`${path}/edit-pins/:id`} component={EditPins} />
      <Route path={`${path}/view-pins/:id`} component={ViewPins} />

      <Route path={`${path}/edit-user/:id`} component={EditUser} />
      <Route path={`${path}/view-user/:id`} component={ViewUser} />

      {/* 1 Extra Files*/}
      <Route path={`${path}/Analysis/:id`} component={Analysis} />
      <Route path={`${path}/NewAnalysis/:id`} component={NewAnalysis} />
      <Route path={`${path}/viewResults`} component={ViewResults} />
      <Route path={`${path}/consultation`} component={Consultation} />
    </Switch>
  );
};

export default DashboardRoutes;
