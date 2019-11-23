import React, { PureComponent, Fragment } from 'react'
import './Jobs.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import AnnouncementsList from './job-announcements/job-announcements-list/JobAnnouncementsList';
import AnnouncementsCreate from './job-announcements/job-announcements-create/JobAnnouncementsCreate';
import JobAnnouncements from './job-announcements/JobAnnouncements';
const Switch = require("react-router-dom").Switch;

interface JobsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface JobsProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getJobNames: Function;
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
        let {path} = this.props.match
        console.log(path)
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/job-announcements`} component={JobAnnouncements} />
                    <ErrorBoundaryRoute path={`${path}/create`} component={AnnouncementsCreate} />
                </Switch>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const mapStateToProps = (state, ownProps) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)