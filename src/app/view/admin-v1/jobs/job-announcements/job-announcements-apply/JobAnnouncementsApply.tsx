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
    stateApply?: string;
    listPending?: Array<IApplyJob>;
    listAccepted?: Array<IApplyJob>;
    listRejected?: Array<IApplyJob>;
    listShifts?: Array<IShiftDetail>;
    lBtn?: boolean;
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
            listPending: [],
            listAccepted: [],
            listRejected: [],
            listShifts: [],
            defaultId: null,
            lBtn: false,
            stateApply: null,
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
            const stateApply = param.get('state');

            return {
                id: props.match.params.id,
                listApplyJobs,
                stateApply,
            }
        }

        if (
            props.listApplyJobs &&
            props.listApplyJobs !== state.listApplyJobs
        ) {
            let listApplyJobs = props.listApplyJobs;
            let listPending = [];
            let listAccepted = [];
            let listRejected = [];
            let listShifts = [];
            let defaultId = null;
            if (listApplyJobs && listApplyJobs.length > 0) {
                listApplyJobs.forEach((item: IApplyJob, index: number) => {
                    switch (item.state) {
                        case TYPE.PENDING:
                            listPending.push(item);
                            break;
                        case TYPE.REJECTED:
                            listRejected.push(item);
                            break;
                        case TYPE.ACCEPTED:
                            listAccepted.push(item);
                            break;

                        default:
                            break;
                    }
                })
                if(listPending.length > 0) {
                    // searchShift(listApplyJobs[0].student.id, TYPE.PENDING, listApplyJobs[0].student.id)
                    listShifts = listPending[0].appliedShifts
                    defaultId = listPending[0].student.id
                }
            }
            return {
                listApplyJobs,
                listPending,
                listRejected,
                listAccepted,
                listShifts,
                defaultId
            }
        }

        return null
    }

    searchShift = (id?: string, type?: string, defaultId?: string) => {
        this.setState({ loading: true })
        let { listApplyJobs } = this.state;
        let listShifts = [];
        setTimeout(() => {
            if (id) {
                listApplyJobs.forEach((item: IApplyJob) => {
                    if (id === item.student.id) {
                        listShifts = item.appliedShifts;
                    }
                });
            }

            this.setState({ listShifts, loading: false })
        }, 250);

        this.setState({ defaultId })
    }

    createRequest = async (cid?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => {
        let { id } = this.state;
        await this.setState({ lBtn: true });
        await _requestToServer(
            PUT,
            APPLY_JOB + `/${id}/apply/students/${cid}/state/${state}`,
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
        await this.setState({ lBtn: false })
    }
    selectShift(type) {
        if(type === "ACCEPTED") {
            if(this.state.listAccepted.length > 0) {
                this.setState({listShifts: this.state.listAccepted[0].appliedShifts, defaultId: this.state.listAccepted[0].student.id })
            }
        } else if(type === "PENDING") {
            if(this.state.listPending.length > 0) {
                this.setState({listShifts: this.state.listPending[0].appliedShifts, defaultId: this.state.listPending[0].student.id })
            }
        } else if(type === "REJECTED") { 
            if(this.state.listRejected.length > 0) {
                this.setState({listShifts: this.state.listRejected[0].appliedShifts, defaultId: this.state.listRejected[0].student.id })
            }
        }
    }
    render() {
        let {
            stateApply,
            listRejected,
            listAccepted,
            listPending,
            listShifts,
            loading,
            defaultId,
            lBtn
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
                                activeKey={stateApply}
                                style={{ width: "100%" }}
                                onChange={(stateApply: string) => {
                                    // console.log(stateApply)
                                    this.selectShift(stateApply)
                                    this.setState({ stateApply })
                                }}
                            >
                                <TabPane tab={`Đang chờ (${listPending.length})`}
                                    key={TYPE.PENDING}
                                    disabled={listPending.length === 0}
                                    style={{ paddingRight: 10 }}
                                >
                                    <div className="content-apply">
                                        {
                                            listPending.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên đang chờ" />
                                                : (listPending.map((item: IApplyJob, index: number) =>
                                                    <ApplyJobItem
                                                        key={index}
                                                        type="PENDING"
                                                        lBtn={lBtn}
                                                        data={item}
                                                        id={item.student.id}
                                                        defaultId={item.student.id === defaultId}
                                                        onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                        onClick={
                                                            (event: string) => this.searchShift(event, TYPE.PENDING, item.student.id)
                                                        }
                                                    />
                                                ))
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab={`Chấp nhận (${listAccepted.length})`} key={TYPE.ACCEPTED} disabled={listAccepted.length === 0}>
                                    <div className="content-apply">
                                        {
                                            listAccepted.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên được chấp nhận" />
                                                : (listAccepted.map((item: IApplyJob, index: number) =>
                                                    <ApplyJobItem
                                                        key={index}
                                                        type={"ACCEPTED"}
                                                        data={item}
                                                        id={item.student.id}
                                                        defaultId={item.student.id === defaultId}
                                                        onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                        onClick={
                                                            (event: string) => this.searchShift(event, TYPE.ACCEPTED, item.student.id)
                                                        }
                                                    />
                                                ))
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab={`Từ chối (${listRejected.length})`} key={TYPE.REJECTED} disabled={listRejected.length === 0} >
                                    <div className="content-apply">
                                        {
                                            listRejected.length === 0 ?
                                                <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên bị từ chối" />
                                                : listRejected.map(
                                                    (item: IApplyJob, index: number) =>
                                                        <ApplyJobItem
                                                            type="REJECTED"
                                                            key={index}
                                                            data={item}
                                                            id={item.student.id}
                                                            defaultId={item.student.id === defaultId}
                                                            onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                            onClick={
                                                                (event: string) => this.searchShift(event, TYPE.REJECTED, item.student.id)
                                                            }
                                                        />
                                                )
                                        }
                                    </div>
                                </TabPane>
                            </Tabs>
                            {totalItems === 0 ?
                                <Empty style={{ marginTop: '5vh' }} description="Dữ liệu không tồn tại" /> : ""
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
                                        listShifts &&
                                            listShifts.length > 0 ?
                                            listShifts.map(
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