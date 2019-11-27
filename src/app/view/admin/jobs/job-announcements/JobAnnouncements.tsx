import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import JobAnnouncementsList from './job-announcements-list/JobAnnouncementsList';
import JobAnnouncementsCreate from './job-announcements-create/JobAnnouncementsCreate';
const Switch = require("react-router-dom").Switch;

interface JobAnnouncementsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface JobAnnouncementsProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class JobAnnouncements extends PureComponent<JobAnnouncementsProps, JobAnnouncementsState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }r

    render() {
        let {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={JobAnnouncementsList} />
                    <ErrorBoundaryRoute path={`${path}/create`} component={JobAnnouncementsCreate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncements)