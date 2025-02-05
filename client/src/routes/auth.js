import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const Checkout = lazy(() => import('../container/profile/authentication/overview/Checkout'));
const Pricing = lazy(() => import('../container/pages/Pricing'));
const SuccessPage = lazy(() => import('../container/pages/SucessPage'));
const About = lazy(() => import('../container/pages/About'));
const HowItWork = lazy(() => import('../container/pages/HowItWork'));
const FindInstructor = lazy(() => import('../container/pages/FindInstructor'));
const StudentDetail = lazy(() => import('../container/pages/StudentDetail'));
const InstructorDetail = lazy(() => import('../container/pages/InstructorDetail'));
const Features = lazy(() => import('../container/pages/Features'));
const Help = lazy(() => import('../container/pages/Help'));
const Disclaimer = lazy(() => import('../container/pages/Disclaimer'));
const PrivacyPolicy = lazy(() => import('../container/pages/PrivacyPolicy'));
const ContactUs = lazy(() => import('../container/pages/Contact-Us'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const OneTimePass = lazy(() => import('../container/profile/authentication/overview/OneTimePassword'));
const ResetPass = lazy(() => import('../container/profile/authentication/overview/ResetPassword'));
const Home = lazy(() => import('../container/pages/Configuration'));
const CategoryExplore = lazy(() => import('../container/pages/CategoryExplore.js'));
const ConsultationForm = lazy(() => import('../container/pages/Consultation'));
const discussSchedule = lazy(() => import('../container/pages/discussSchedule'));
const aboutChallanges = lazy(() => import('../container/pages/aboutChallanges'));
const tellUsabout = lazy(() => import('../container/pages/tellUsabout'));
const yourname = lazy(() => import('../container/pages/yourname'));
const studentName = lazy(() => import('../container/pages/studentName'));
const yournumber = lazy(() => import('../container/pages/yournumber'));
const youremail = lazy(() => import('../container/pages/youremail'));
const exampreparing = lazy(() => import('../container/pages/exampreparing'));
const complimentary = lazy(() => import('../container/pages/complimentary'));
const timezone = lazy(() => import('../container/pages/timezone'));
const aboutus = lazy(() => import('../container/pages/aboutus'));
const hearAbout = lazy(() => import('../container/pages/hearAbout'));
const alreadyAcc = lazy(() => import('../container/pages/alreadyAcc'));
const interestTutoring = lazy(() => import('../container/pages/interestTutoring'));
const Thanks = lazy(() => import('../container/pages/Thanks'));
const Analysis = lazy(() => import('./../container/pages/Analysis'));
const PrepPage = lazy(() => import('./../container/pages/PrepPage'));
const IseePrep = lazy(() => import('./../container/pages/IseePrep'));
const SsatPrep = lazy(() => import('./../container/pages/SsatPrep'));
const HsptPrep = lazy(() => import('../container/pages/HsptPrep'));
const PsatPrep = lazy(() => import('./../container/pages/PsatPrep'));
const GrePrep = lazy(() => import('./../container/pages/GrePrep'));
const Act = lazy(() => import('../container/pages/Act.js'));
const Exam = lazy(() => import('../container/pages/Exam'));
const blog = lazy(() => import('../container/pages/blog.js'));
const HomepageNew = lazy(() => import('../container/pages/HomepageNew'));

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
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/oneTimePassword" component={OneTimePass} />
        <Route exact path="/resetPassword/:id" component={ResetPass} />
        <Route exact path="/register" component={SignUp} />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/checkout/:id" component={Checkout} /> */}
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/success" component={SuccessPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/howitwork" component={HowItWork} />
        <Route exact path="/findInstructor" component={FindInstructor} />
        <Route exact path="/instructor-detail" component={InstructorDetail} />
        <Route exact path="/student-detail" component={StudentDetail} />
        <Route exact path="/feature" component={Features} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/disclaimer" component={Disclaimer} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/category-explore/:id" component={CategoryExplore} />
        <Route exact path="/consultation" component={ConsultationForm} />
        <Route exact path="/discussSchedule" component={discussSchedule} />
        <Route exact path="/aboutChallanges" component={aboutChallanges} />
        <Route exact path="/tellUsabout" component={tellUsabout} />
        <Route exact path="/yourname" component={yourname} />
        <Route exact path="/studentName" component={studentName} />
        <Route exact path="/yournumber" component={yournumber} />
        <Route exact path="/youremail" component={youremail} />
        <Route exact path="/exampreparing" component={exampreparing} />
        <Route exact path="/complimentary" component={complimentary} />
        <Route exact path="/timezone" component={timezone} />
        <Route exact path="/aboutus" component={aboutus} />
        <Route exact path="/hearAbout" component={hearAbout} />
        <Route exact path="/alreadyAcc" component={alreadyAcc} />
        <Route exact path="/interestTutoring" component={interestTutoring} />
        <Route exact path="/Thanks" component={Thanks} />
        <Route exact path="/exam" component={Exam} />
        <Route exact path="/preppage" component={PrepPage} />
        <Route exact path="/iseeprep" component={IseePrep} />
        <Route exact path="/ssatprep" component={SsatPrep} />
        <Route exact path="/hsptprep" component={HsptPrep} />
        <Route exact path="/psatprep" component={PsatPrep} />
        <Route exact path="/greprep" component={GrePrep} />
        <Route exact path="/act" component={Act} />
        <Route exact path="/blog" component={blog} />
        <Route exact path="/" component={HomepageNew} />
        {/* <Route exact path="/Analysis" component={Analysis} />
        <Route exact path="/ViewResults" component={ViewResults} /> */}

        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
