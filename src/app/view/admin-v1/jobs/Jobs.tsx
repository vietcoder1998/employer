import React, { PureComponent,  } from 'react'
import './Jobs.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import JobAnnouncements from './job-announcements/JobAnnouncements';
import EmBranches from './em-branches/EmBranches';
import FindCandidates from './find-candidates/FindCandidates';
import SavedCandidateProfiles from './saved-candidate-profiles/SavedCandidateProfiles';
import PendingJobs from './pending-jobs/PendingJobs';
const Switch = require("react-router-dom").Switch;

interface IJobsState {
}

interface IJobsProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class Jobs extends PureComponent<IJobsProps, IJobsState> {
    render() {
        let  {path} = this.props.match;
        return (
            < >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/job-announcements`} component={JobAnnouncements} />
                    <ErrorBoundaryRoute path={`${path}/em-branches`} component={EmBranches} />
                    <ErrorBoundaryRoute path={`${path}/find-candidates`} component={FindCandidates} />
                    <ErrorBoundaryRoute path={`${path}/saved-candidate`} component={SavedCandidateProfiles} />
                    <ErrorBoundaryRoute path={`${path}/pending-jobs`} component={PendingJobs} />
                </Switch>
            </>
        )
    }
}