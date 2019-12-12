import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import JobService from './job-service/JobService';
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
            </Switch>
        </>
    )
}
