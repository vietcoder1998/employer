import React, { PureComponent, Fragment } from 'react'
import './Jobs.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import JobAnnouncements from './job-announcements/JobAnnouncements';
import EmBranches from './em-branches/EmBranches';
import Announcements from './announcements/Announcements';
import FindCandidates from './find-candidates/FindCandidates';
import SavedCandidateProfiles from './saved-candidate-profiles/SavedCandidateProfiles';
const Switch = require("react-router-dom").Switch;

interface JobsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface JobsProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class Jobs extends PureComponent<JobsProps, JobsState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }

    render() {
        let  {path} = this.props.match;
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/job-announcements`} component={JobAnnouncements} />
                    <ErrorBoundaryRoute path={`${path}/em-branches`} component={EmBranches} />
                    <ErrorBoundaryRoute path={`${path}/annoucements`} component={Announcements} />
                    <ErrorBoundaryRoute path={`${path}/find-candidates`} component={FindCandidates} />
                    <ErrorBoundaryRoute path={`${path}/saved-candidate-profiles`} component={SavedCandidateProfiles} />
                </Switch>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
})

const mapStateToProps = (state: any, ownProps: any) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)