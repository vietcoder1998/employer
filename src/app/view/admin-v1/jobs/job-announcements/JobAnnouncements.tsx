import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import JobAnnouncementsList from './job-announcements-list/JobAnnouncementsList';
import JobAnnouncementsCreate from './job-announcements-create/JobAnnouncementsCreate';
import JobAnnouncementsApply from './job-announcements-apply/JobAnnouncementsApply';
const Switch = require("react-router-dom").Switch;

interface IJobAnnouncementsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface IJobAnnouncementsProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class JobAnnouncements extends PureComponent<IJobAnnouncementsProps, IJobAnnouncementsState> {
    render() {
        let  {path} = this.props.match;
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={JobAnnouncementsList} />
                    <ErrorBoundaryRoute path={`${path}/create`} component={JobAnnouncementsCreate} />
                    <ErrorBoundaryRoute path={`${path}/copy/:id`} component={JobAnnouncementsCreate} />
                    <ErrorBoundaryRoute path={`${path}/fix/:id`} component={JobAnnouncementsCreate} />
                    <ErrorBoundaryRoute path={`${path}/apply/:id`} component={JobAnnouncementsApply} />
                </Switch>
            </Fragment>
        )
    }
}
