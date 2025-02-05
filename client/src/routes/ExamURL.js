import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const Checkout = lazy(() => import('../container/profile/authentication/overview/Checkout'));
const Pricing = lazy(() => import('../container/pages/Pricing'));
const SuccessPage = lazy(() => import('../container/pages/SucessPage'));
const About = lazy(() => import('../container/pages/About'));
const Features = lazy(() => import('../container/pages/Features'));
const Help = lazy(() => import('../container/pages/Help'));
const Disclaimer = lazy(() => import('../container/pages/Disclaimer'));
const PrivacyPolicy = lazy(() => import('../container/pages/PrivacyPolicy'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const OneTimePass = lazy(() => import('../container/profile/authentication/overview/OneTimePassword'));
const ResetPass = lazy(() => import('../container/profile/authentication/overview/ResetPassword'));
const Home = lazy(() => import('../container/pages/Configuration'));
const CategoryExplore = lazy(() => import('../container/pages/CategoryExplore.js'));
const ConsultationForm = lazy(() => import('../container/pages/Consultation'));
const Exam = lazy(() => import('../container/pages/Exam'));
const PracticeSet = lazy(() => import('../container/pages/PracticeSet'));
const ExamSuccess = lazy(() => import('../container/pages/ExamSuccess'));
const QuizSuccess = lazy(() => import('../container/pages/QuizSuccess'));
const PracticeSuccess = lazy(() => import('../container/pages/PracticeSetSuccess'));
const Quiz = lazy(() => import('../container/pages/Quiz'));
const Analysis = lazy(() => import('./../container/pages/Analysis'));
const ViewResults = lazy(() => import('./../container/pages/ViewResults'));
const OverViewQuiz = lazy(() => import('./../container/pages/OverViewQuiz'));
const OverViewExam = lazy(() => import('./../container/pages/OverViewExam'));
const OverViewPractice = lazy(() => import('./../container/pages/OverViewPracticeSet'));
console.log('AUTH');
const NotFound = () => {
  console.log('not found');
  return <Redirect to="/" />;
};

const FrontendRoutes = () => {
  console.log('frontend route');
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/exam/:id" component={Exam} />
        <Route exact path="/practice-sets/:id" component={PracticeSet} />
        <Route exact path="/quiz/:id" component={Quiz} />
        <Route exact path="/exam-success" component={ExamSuccess} />
        <Route exact path="/quiz-success" component={QuizSuccess} />
        <Route exact path="/practice-sets-success" component={PracticeSuccess} />
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout/:id" component={Checkout} />
        <Route exact path="/Analysis" component={Analysis} />
        <Route exact path="/viewResults" component={ViewResults} />
        <Route exact path="/overview-quiz/:id" component={OverViewQuiz} />
        <Route exact path="/overview-exam/:id" component={OverViewExam} />
        <Route exact path="/overview-practice-set/:id" component={OverViewPractice} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
