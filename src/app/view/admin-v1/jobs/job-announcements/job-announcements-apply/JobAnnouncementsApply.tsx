import React, { Component } from 'react'
import { Icon, Divider, Row, Col, Button, Input, DatePicker, Select, Tabs, message, Result } from 'antd';
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
            return {
                list_apply_jobs
            }
        }

        return null
    }

    render() {
        let {
            state,
            list_apply_jobs
        } = this.state;

        let {
            list_job_names,
            list_em_branches,
            list_skills,
        } = this.props;

        let list_job_name_options = list_job_names.map((item: IJobName) => ({ label: item.name, value: item.id }));
        let list_em_branches_options = list_em_branches.map((item: any) => ({ label: item.branchName, value: item.id }));
        let list_skill_options = list_skills.map((item: IJobName, index: number) => (<Option key={index} value={item.name} children={item.name} />));

        return (
            <div className='common-content'>
                <h5>
                    Quản lí yêu cầu ứng tuyển
                </h5>
                <Divider orientation="left" >Nội dung bài viết</Divider>
                <div className="announcements-Apply-content">
                    <Row>
                        <Col xs={24} md={12} lg={12} xl={12} xxl={8}>

                            <Tabs
                                activeKey={state}
                                style={{ width: "100%" }}
                                onChange={(state: string) => {
                                    this.setState({ state })
                                }}
                            >
                                <TabPane tab="Đang chờ" key={TYPE.PENDING}>
                                    {
                                        list_apply_jobs && list_apply_jobs.length > 0 ? (list_apply_jobs.map((item: IApplyJob, index: number) => {
                                            return (
                                                <ApplyJobItem key={index} data={item} id={item.candidate.id} />
                                            )
                                        })) : null
                                    }
                                </TabPane>
                                <TabPane tab="Chấp nhận" key={TYPE.ACCEPTED}>
                                    {
                                        list_apply_jobs && list_apply_jobs.length > 0 ? (list_apply_jobs.map((item: IApplyJob, index: number) => {
                                            return (
                                                <ApplyJobItem key={index} data={item} id={item.candidate.id} />
                                            )
                                        })) : null
                                    }
                                </TabPane>
                                <TabPane tab="Từ chối" key={TYPE.REJECTED} >
                                    {
                                        list_apply_jobs && list_apply_jobs.length > 0 ? (list_apply_jobs.map((item: IApplyJob, index: number) => {
                                            return (
                                                <ApplyJobItem key={index} data={item} id={item.candidate.id} />
                                            )
                                        })) : null
                                    }
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col xs={24} md={12} lg={12} xl={12} xxl={16}>
                            <div className="job-announcements-apply">
                            </div>
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