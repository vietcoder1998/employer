import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FallBack from './FallBack';

const Admin = lazy(() => import('./../app/view/admin-v1/Admin'));
const Login = lazy(() => import('./../app/view/login/Login'));
const NotFound = lazy(() => import('./../app/view/not-found/NotFound'));
const Announcements = lazy(() => import('./../app/view/announcement/Announcement'));

export default function Routes(props) {
  let [asyncBr, setAsync] = React.useState(0);
  setTimeout(() => {
    if (asyncBr === 10) {
      setAsync(0)
    } else
      setAsync(asyncBr + 2);
  }, 4000);
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
          <Route path={'/v1/admin'} component={Admin} />
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
          <Route path='/announcements' component={Announcements} />
        </Suspense>
      </Router>
    </>
  );
}
