import React, { Component } from 'react'
import { Icon, Divider, Row, Col, Button, Input, DatePicker, Select, Tabs, message, Result, Empty } from 'antd';
import { connect } from 'react-redux';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { TYPE } from '../../../../../../common/const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../redux/models/job-names';
import { IAnnoucementBody, IShifts } from '../../../../../../redux/models/announcements';
import { ShiftContent, newShift } from '../../../../layout/annou-shift/AnnouShift';
import { IEmBranch } from '../../../../../../redux/models/em-branches';
import { findIdWithValue } from '../../../../../../common/utils/findIdWithValue';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, PUT } from '../../../../../../common/const/method';
import { JOB_ANNOUNCEMENTS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import moment from 'moment';
import { IApplyJob } from '../../../../../../redux/models/apply-job';
import { ApplyJobItem } from '../../../../layout/job-apply/JobApplyItem';
import { routeLink, routePath } from '../../../../../../common/const/break-cumb';
import './JobAnnouncementsApply.scss';
import { IShiftDetail } from '../../../../../../redux/models/job-annoucement-detail';
import Loading from '../../../../layout/loading/Loading';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface IJobAnnouncementsApplyState {
    title: string;
    announcementTypeID: string;
    type_management: Array<any>;
    list_item: Array<{ label: string, value: string }>,
    loading: boolean;
    value_annou: string;
    type_cpn: string;
    list_em_branches: Array<IEmBranch>;
    list_apply_jobs?: Array<IApplyJob>;
    id?: string;
    jobName?: string;
    address?: string;
    skills?: Array<string>
    state?: string;
    list_pending?: Array<IApplyJob>;
    list_accepted?: Array<IApplyJob>;
    list_rejected?: Array<IApplyJob>;
    list_shifts?: Array<IShiftDetail>;
    default_id?: string;
};

interface IJobAnnouncementsApplyProps extends StateProps, DispatchProps {
    match: any;
    history: any;
    location: any;
    getApplyJobs: Function;
    getListEmBranches: Function;
};


class JobAnnouncementsApply extends Component<IJobAnnouncementsApplyProps, IJobAnnouncementsApplyState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            type_management: [],
            list_item: [],
            loading: false,
            value_annou: "",
            list_em_branches: [],
            type_cpn: null,
            list_apply_jobs: [],
            id: null,
            list_pending: [],
            list_accepted: [],
            list_rejected: [],
            list_shifts: [],
            default_id: null
        };
    };

    async componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.getApplyJobs(id, TYPE.PENDING);
        };

        this.props.getListEmBranches();
    };

    static getDerivedStateFromProps(props: IJobAnnouncementsApplyProps, state: IJobAnnouncementsApplyState) {
        if (
            props.match.params.id &&
            props.match.params.id !== state.id
        ) {
            let list_apply_jobs = props.list_apply_jobs;
            const param = new URLSearchParams(props.location.search);
            const state = param.get('state');
            return {
                id: props.match.params.id,
                list_apply_jobs,
                state
            }
        }

        if (
            props.list_apply_jobs &&
            props.list_apply_jobs !== state.list_apply_jobs
        ) {
            let list_apply_jobs = props.list_apply_jobs;
            let list_pending = [];
            let list_accepted = [];
            let list_rejected = [];
            if (list_apply_jobs && list_apply_jobs.length > 0) {
                list_apply_jobs.forEach((item: IApplyJob, index: number) => {
                    switch (item.state) {
                        case TYPE.PENDING:
                            list_pending.push(item);
                            break;
                        case TYPE.REJECTED:
                            list_rejected.push(item);
                            break;
                        case TYPE.ACCEPTED:
                            list_accepted.push(item);
                            break;

                        default:
                            break;
                    }
                })
            }
            return {
                list_apply_jobs,
                list_pending,
                list_rejected,
                list_accepted,
            }
        }

        return null
    }

    searchShift = (id?: string, type?: string, default_id?: string) => {
        let { list_apply_jobs } = this.state;
        console.log(default_id)
        this.setState({ loading: true })
        let list_shifts = [];
        setTimeout(() => {
            if (id) {
                list_apply_jobs.forEach((item: IApplyJob) => {
                    if (id === item.candidate.id) {
                        list_shifts = item.appliedShifts;
                    }
                });
            }

            this.setState({ list_shifts, loading: false })
        }, 250);

        this.setState({default_id})
    }

    createRequest() {

    }
    render() {
        let {
            state,
            list_apply_jobs,
            list_rejected,
            list_accepted,
            list_pending,
            list_shifts,
            loading,
            default_id
        } = this.state;

        let is_empty = list_apply_jobs.length === 0;
        console.log(list_shifts)

        return (
            <div className='common-content'>
                <h5>
                    Quản lí yêu cầu ứng tuyển
                </h5>
                <Divider orientation="left" >Danh sách yêu cầu</Divider>
                <div className="announcements-Apply-content">
                    <Row>
                        <Col xs={24} md={8} lg={12} xl={12} xxl={12}>
                            {is_empty ? <Empty /> : <Tabs
                                activeKey={state}
                                style={{ width: "100%" }}
                                onChange={(state: string) => {
                                    this.setState({ state })
                                }}
                            >
                                <TabPane tab="Đang chờ" key={TYPE.PENDING} disabled={list_pending.length === 0}>
                                    <div className="content-apply">
                                        {
                                            list_pending.length > 0 ? (list_pending.map((item: IApplyJob, index: number) =>
                                                <ApplyJobItem
                                                    type="PENDING"
                                                    key={index}
                                                    data={item}
                                                    id={item.candidate.id}
                                                    id_default={item.candidate.id === default_id}
                                                    onClick={
                                                        (event: string) => this.searchShift(event, TYPE.PENDING, item.candidate.id)
                                                    }
                                                />
                                            )) : null
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab="Chấp nhận" key={TYPE.ACCEPTED} disabled={list_accepted.length === 0}>
                                    <div className="content-apply">
                                        {
                                            list_accepted.length > 0 ? (list_accepted.map((item: IApplyJob, index: number) =>
                                                <ApplyJobItem
                                                    type="ACCEPTED"
                                                    key={index}
                                                    data={item}
                                                    id={item.candidate.id}
                                                    id_default={item.candidate.id === default_id}
                                                    onClick={
                                                        (event: string) => this.searchShift(event, TYPE.ACCEPTED, item.candidate.id)
                                                    }
                                                />
                                            )) : null
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab="Từ chối" key={TYPE.REJECTED} disabled={list_rejected.length === 0} >
                                    <div className="content-apply">
                                        {
                                            list_rejected.length > 0 ? (list_rejected.map(
                                                (item: IApplyJob, index: number) =>
                                                    <ApplyJobItem
                                                        type="REJECTED"
                                                        key={index}
                                                        data={item}
                                                        id={item.candidate.id}
                                                        id_default={item.candidate.id === default_id}
                                                        onClick={
                                                            (event: string) => this.searchShift(event, TYPE.REJECTED, item.candidate.id)
                                                        }
                                                    />
                                            )) : null
                                        }
                                    </div>
                                </TabPane>
                            </Tabs>}
                        </Col>
                        <Col xs={24} md={16} lg={12} xl={12} xxl={12}>
                            {loading ? <Loading /> :
                                <div className="job-announcements-apply">
                                    {
                                        list_shifts && list_shifts.length > 0 ?
                                            list_shifts.map(
                                                (item: IShifts, index: number) => {
                                                    if (item) {
                                                        return <ShiftContent key={index} id={item.id} shifts={item} removeButton={false} disableChange={true} />
                                                    }

                                                    return
                                                }
                                            ) : <Empty />
                                    }
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
                <div className="Announcements-Apply-content">
                    <Button
                        type="danger"
                        prefix={"check"}
                        style={{
                            margin: "10px 10px",
                        }}
                        onClick={() => { this.props.history.push(routeLink.JOB_ANNOUNCEMENTS + routePath.LIST) }}
                    >
                        <Icon type="left" />
                        Quay lại
                    </Button>
                </div>

            </div >
        )
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getApplyJobs: (id?: string, list_apply_jobs?: string) => dispatch({ type: REDUX_SAGA.APPLY_JOB.GET_APPLY_JOB, id, list_apply_jobs }),
    getListEmBranches: () => dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_job_names: state.JobNames.items,
    list_skills: state.Skills.items,
    list_em_branches: state.EmBranches.items,
    list_apply_jobs: state.ApplyJobs.items
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsApply)