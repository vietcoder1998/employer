import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FallBack from './FallBack';

const Admin = lazy(() => import('./../app/view/admin-v1/Admin'));
const Login = lazy(() => import('./../app/view/login/Login'));
const NotFound = lazy(() => import('./../app/view/not-found/NotFound'));
const ForgetPw = lazy(() => import('./../app/view/forget-pw/ForgetPw'));
const Announcements = lazy(() => import('./../app/view/announcement/Announcement'));
const is_authen = localStorage.getItem('ecr');
export default function Routes(props) {
  return (
    <>
      <Router>
        <Suspense fallback={<FallBack />} >
          <Route exact path='*' component={NotFound} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path='/login' component={Login} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route path={'/v1/admin'} component={is_authen ? Admin : NotFound} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path={'/404'} component={NotFound} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path='/' component={Login} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path='/register' component={Login} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path='/forget-pw' component={ForgetPw} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route path='/announcements' component={Announcements} />
        </Suspense>
      </Router>
    </>
  );
}
