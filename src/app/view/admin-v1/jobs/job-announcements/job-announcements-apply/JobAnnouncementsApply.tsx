import React, { Component } from 'react'
import { Icon, Divider, Row, Col, Button, Tabs, message, Empty } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { TYPE } from '../../../../../../const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IShift } from '../../../../../../models/announcements';
import { ShiftContent } from '../../../../layout/annou-shift/AnnouShift';
import { IEmBranch } from '../../../../../../models/em-branches';
import { _requestToServer } from '../../../../../../services/exec';
import { PUT } from '../../../../../../const/method';
import { APPLY_JOB } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IApplyJob } from '../../../../../../models/apply-job';
import { ApplyJobItem } from '../../../../layout/job-apply/JobApplyItem';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import './JobAnnouncementsApply.scss';
import { IShiftDetail } from '../../../../../../models/job-annoucement-detail';
import Loading from '../../../../layout/loading/Loading';

const { TabPane } = Tabs;

interface IJobAnnouncementsApplyState {
    title: string;
    announcementTypeID: string;
    typeMng: Array<any>;
    listItem: Array<{ label: string, value: string }>,
    loading: boolean;
    valueAnnou: string;
    typeCpn: string;
    listEmBranches: Array<IEmBranch>;
    listApplyJobs?: Array<IApplyJob>;
    id?: string;
    jobName?: string;
    address?: string;
    skills?: Array<string>
    state?: string;
    list_pending?: Array<IApplyJob>;
    list_accepted?: Array<IApplyJob>;
    list_rejected?: Array<IApplyJob>;
    list_shifts?: Array<IShiftDetail>;
    l_btn?: boolean;
    defaultId?: string;
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
            typeMng: [],
            listItem: [],
            loading: false,
            valueAnnou: "",
            listEmBranches: [],
            typeCpn: null,
            listApplyJobs: [],
            id: null,
            list_pending: [],
            list_accepted: [],
            list_rejected: [],
            list_shifts: [],
            defaultId: null,
            l_btn: false
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
            let listApplyJobs = props.listApplyJobs;
            const param = new URLSearchParams(props.location.search);
            const state = param.get('state');
            return {
                id: props.match.params.id,
                listApplyJobs,
                state
            }
        }

        if (
            props.listApplyJobs &&
            props.listApplyJobs !== state.listApplyJobs
        ) {
            let listApplyJobs = props.listApplyJobs;
            let list_pending = [];
            let list_accepted = [];
            let list_rejected = [];
            if (listApplyJobs && listApplyJobs.length > 0) {
                listApplyJobs.forEach((item: IApplyJob, index: number) => {
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
                listApplyJobs,
                list_pending,
                list_rejected,
                list_accepted,
            }
        }

        return null
    }

    searchShift = (id?: string, type?: string, defaultId?: string) => {
        let { listApplyJobs } = this.state;
        this.setState({ loading: true })
        let list_shifts = [];
        setTimeout(() => {
            if (id) {
                listApplyJobs.forEach((item: IApplyJob) => {
                    if (id === item.candidate.id) {
                        list_shifts = item.appliedShifts;
                    }
                });
            }

            this.setState({ list_shifts, loading: false })
        }, 250);

        this.setState({ defaultId })
    }

    createRequest = async (cid?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => {
        let { id } = this.state;
        await this.setState({ l_btn: true });
        await _requestToServer(
            PUT,
            APPLY_JOB + `/${id}/apply/candidates/${cid}/state/${state}`,
            undefined,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        ).then((res: any) => {
            if (res) {
                message.success("Thành công", 3)
                this.props.getApplyJobs(id);
            }
        })
        await this.setState({ l_btn: false })
    }

    render() {
        let {
            state,
            list_rejected,
            list_accepted,
            list_pending,
            list_shifts,
            loading,
            defaultId,
            l_btn
        } = this.state;

        let {
            totalItems
        } = this.props;

        return (
            <div className='common-content'>
                <h5>
                    Danh sách ứng viên công việc
                </h5>
                <Divider orientation="left" >Danh sách yêu cầu</Divider>
                <div className="announcements-Apply-content">
                    <Row>
                        <Col xs={24} md={10} lg={12} xl={10} xxl={12}>
                            <Tabs
                                activeKey={state}
                                style={{ width: "100%" }}
                                onChange={(state: string) => {
                                    this.setState({ state })
                                }}
                            >
                                <TabPane
                                    tab={`Đang chờ`}
                                    key={TYPE.PENDING}
                                    disabled={list_pending.length === 0}
                                    style={{ paddingRight: 10 }}
                                >
                                    <div className="content-apply">
                                        {
                                            list_pending.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên đang chờ" />
                                                : (list_pending.map((item: IApplyJob, index: number) =>
                                                    <ApplyJobItem
                                                        key={index}
                                                        type="PENDING"
                                                        l_btn={l_btn}
                                                        data={item}
                                                        id={item.candidate.id}
                                                        defaultId={item.candidate.id === defaultId}
                                                        onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                        onClick={
                                                            (event: string) => this.searchShift(event, TYPE.PENDING, item.candidate.id)
                                                        }
                                                    />
                                                ))
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab={`Chấp nhận`} key={TYPE.ACCEPTED} disabled={list_accepted.length === 0}>
                                    <div className="content-apply">
                                        {
                                            list_accepted.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên được chấp nhận" />
                                                : (list_accepted.map((item: IApplyJob, index: number) =>
                                                    <ApplyJobItem
                                                        key={index}
                                                        type={"ACCEPTED"}
                                                        data={item}
                                                        id={item.candidate.id}
                                                        defaultId={item.candidate.id === defaultId}
                                                        onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                        onClick={
                                                            (event: string) => this.searchShift(event, TYPE.ACCEPTED, item.candidate.id)
                                                        }
                                                    />
                                                ))
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab={`Từ chối`} key={TYPE.REJECTED} disabled={list_rejected.length === 0} >
                                    <div className="content-apply">
                                        {
                                            list_rejected.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên bị từ chối" />
                                                : list_rejected.map(
                                                    (item: IApplyJob, index: number) =>
                                                        <ApplyJobItem
                                                            type="REJECTED"
                                                            key={index}
                                                            data={item}
                                                            id={item.candidate.id}
                                                            defaultId={item.candidate.id === defaultId}
                                                            onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                            onClick={
                                                                (event: string) => this.searchShift(event, TYPE.REJECTED, item.candidate.id)
                                                            }
                                                        />
                                                )
                                        }
                                    </div>
                                </TabPane>
                            </Tabs>
                            {totalItems === 0 ?
                                <Empty style={{marginTop: '5vh'}} description="Dữ liệu không tồn tại" /> : ""
                            }
                        </Col>
                        <Col xs={24} md={14} lg={12} xl={14} xxl={12}>
                            <p
                                style={{
                                    margin: "10px 20px -10px",
                                    fontWeight: 600
                                }}
                            >
                                Thông tin ca
                            </p>
                            {loading ? <Loading /> :
                                <div className="job-announcements-apply">
                                    {
                                        list_shifts &&
                                            list_shifts.length > 0 ?
                                            list_shifts.map(
                                                (item: IShift, index: number) => {
                                                    if (item) {
                                                        return <ShiftContent key={index} id={item.id} shift={item} removeButton={false} disableChange={true} />
                                                    }

                                                    return null
                                                }
                                            ) : <Empty style={{ paddingTop: "5vh" }} description="Không có ca phù hợp" />
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
    getApplyJobs: (id?: string, listApplyJobs?: string) => dispatch({ type: REDUX_SAGA.APPLY_JOB.GET_APPLY_JOB, id, listApplyJobs }),
    getListEmBranches: () => dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listJobNames: state.JobNames.items,
    listSkills: state.Skills.items,
    listEmBranches: state.EmBranches.items,
    listApplyJobs: state.ApplyJobs.items,
    totalItems: state.ApplyJobs.totalItems
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsApply)