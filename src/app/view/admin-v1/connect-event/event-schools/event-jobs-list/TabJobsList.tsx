import React, { PureComponent } from 'react'
import { connect } from 'react-redux';

import './EventJobsList.scss';

import { IAppState } from '../../../../../../redux/store/reducer';
import { _requestToServer } from '../../../../../../services/exec';
import EventJobsList from './EventJobsList'
import JobAnnouncementsList from '../../../jobs/job-announcements/job-announcements-list/JobAnnouncementsList'
import { Tabs } from 'antd';
import { REDUX_SAGA } from '../../../../../../const/actions';

const { TabPane } = Tabs;

interface ITabJobsListProps extends StateProps, DispatchProps {
    totalItems?: any;
    getListJobAnnouncements?: any;
};

interface ITabJobsListState {
    dataTable?: Array<any>;
};


class TabJobsList extends PureComponent<ITabJobsListProps, ITabJobsListState> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: null
        };
    }

    static getDerivedStateFromProps(nextProps: ITabJobsListProps, prevState: ITabJobsListState) {

    };

    async componentDidMount() {
        this.props.getListJobAnnouncements({
            expired: null,
            hidden: null,
            jobType: null,
            homePriority: null,
            homeExpired: null,
            searchPriority: null,
            searchExpired: null,
            excludedJobIDs: null,
            jobNameIDs: null,
            jobGroupIDs: null,
            hasPendingApplied: null,
            hasAcceptedApplied: null,
            hasRejectedApplied: null,
            jobShiftFilter: null,
            jobLocationFilter: null
        }, 0, 10)
    };
    render() {
        return (
            <>
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab={`Việc làm trong nhà trường (${this.props.totalItems})`} key="1">
                        <EventJobsList />
                    </TabPane>
                    <TabPane tab={`Việc làm thông thường (${this.props.totalItemsJobAnnouncements})`} key="2">
                        <JobAnnouncementsList />
                    </TabPane>
                </Tabs>
            </>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListJobAnnouncements: (body, pageIndex: number, pageSize: number) =>
    dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENTS.GET_JOB_ANNOUNCEMENTS, body, pageIndex, pageSize }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    totalItems: state.EventJobs.totalItems,
    totalItemsJobAnnouncements: state.JobAnnouncements.totalItems,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TabJobsList);