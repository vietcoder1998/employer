import React, { PureComponent, Fragment } from 'react'
import './Jobs.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import JobAnnouncements from './job-announcements/JobAnnouncements';
import EmBranches from './em-branches/EmBranches';
import Announcements from './announcements/Announcements';
import FindCandidates from './find-candidates/FindCandidates';
import SavedCandidateProfiles from './saved-candidate-profiles/SavedCandidateProfiles';
const Switch = require("react-router-dom").Switch;

interface IJobsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface IJobsProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class Jobs extends PureComponent<IJobsProps, IJobsState> {
    render() {
        let  {path} = this.props.match;
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/job-announcements`} component={JobAnnouncements} />
                    <ErrorBoundaryRoute path={`${path}/em-branches`} component={EmBranches} />
                    <ErrorBoundaryRoute path={`${path}/announcements`} component={Announcements} />
                    <ErrorBoundaryRoute path={`${path}/find-candidates`} component={FindCandidates} />
                    <ErrorBoundaryRoute path={`${path}/saved-candidate`} component={SavedCandidateProfiles} />
                </Switch>
            </Fragment>
        )
    }
}