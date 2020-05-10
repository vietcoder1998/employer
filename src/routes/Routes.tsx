import React, { Suspense, lazy } from 'react';
// @ts-ignore
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FallBack from './FallBack';

const Admin = lazy(() => import('./../app/view/admin-v1/Admin'));
const Login = lazy(() => import('./../app/view/login/Login'));
const NotFound = lazy(() => import('./../app/view/not-found/NotFound'));
const Announcements = lazy(() => import('./../app/view/announcement/Announcement'));
const Convernient = lazy(() => import('./../app/view/convernient/Convernient'));

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
          <Route exact path='/forgot' component={Login} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route path='/announcements' component={Announcements} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route path='/convernient' component={Convernient} />
        </Suspense>
      </Router>
    </>
  );
}
