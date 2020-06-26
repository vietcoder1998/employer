import React, { PureComponent,  } from 'react'
import { routePath } from '../../../../../const/break-cumb';
import ErrorBoundaryRoute from '../../../../../routes/ErrorBoundaryRoute';
import EventSchoolList from './event-school-list/EventSchoolList';
import TabJobsList from './event-jobs-list/TabJobsList';
import EventJobsCreate from './event-jobs-create/EventJobsCreate';

const Switch = require("react-router-dom").Switch;

interface EventSchoolState {
}

interface EventSchoolProps  {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class EventSchool extends PureComponent<EventSchoolProps, EventSchoolState> {
    render() {
           let  {path} = this.props.match
        return (
            < >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={EventSchoolList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.JOBS}/list`} component={TabJobsList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.JOBS}/create`} component={EventJobsCreate} />
                    <ErrorBoundaryRoute path={`${path}${routePath.JOBS}/fix/:id`} component={EventJobsCreate} />
                    <ErrorBoundaryRoute path={`${path}${routePath.JOBS + routePath.COPY}/:id`} component={EventJobsCreate} />
                </Switch>
            </>
        )
    }
}
