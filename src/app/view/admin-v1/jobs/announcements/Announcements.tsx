import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../../routes/ErrorBoundaryRoute';
import PendingJobsList from './announcements/AnnouncementsList';
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
        let  {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={PendingJobsList} />
                </Switch>
            </Fragment>
        )
    }
}
