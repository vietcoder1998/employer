import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import JobService from './job-service/JobService';
import { routePath } from '../../../../const/break-cumb';
import Promotion from './promotion/Promotion';
import InEvent from './in-event/InEvent';
const Switch = require("react-router-dom").Switch;

interface IConvenientsProps {
    match: Readonly<any>;
}

export default function Convenients(props?: IConvenientsProps) {
    let { path } = props.match
    return (
        < >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/job-service`} component={JobService} />
                <ErrorBoundaryRoute path={`${path}${routePath.PROMOTION}`} component={Promotion} />
                <ErrorBoundaryRoute path={`${path}${routePath.IN_EVENT}`} component={InEvent} />
            </Switch>
        </>
    )
}
