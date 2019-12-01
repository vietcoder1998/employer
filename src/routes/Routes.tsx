import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FallBack from './FallBack';

const Route = require("react-router-dom").Route;
const Admin = lazy(() => import('./../app/view/admin-v1/Admin'));
const Login = lazy(() => import('./../app/view/login/Login'));
const NotFound = lazy(() => import('./../app/view/not-found/NotFound'));

export default function Routes(props) {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<FallBack />} >
          <Route exact path='/login' component={Login} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route path={'/v1/admin'} component={Admin} />
        </Suspense>
        <Suspense fallback={<FallBack />} >
          <Route exact path={'/404'} component={NotFound} />
        </Suspense>
      </Router>
    </React.Fragment >
  );
}
