import React, { Component } from 'react'
import { Row, Col, Spin, Tabs, message, Empty } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { TYPE } from '../../../../../../const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
// import { IShift } from '../../../../../../models/announcements';
// import { ShiftContent } from '../../../../layout/annou-shift/AnnouShift';
import { IEmBranch } from '../../../../../../models/em-branches';
import { _requestToServer } from '../../../../../../services/exec';
import { PUT } from '../../../../../../const/method';
import { APPLY_JOB } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IApplyJob } from '../../../../../../models/apply-job';
import { ApplyJobItem } from '../../../../layout/job-apply/JobApplyItem';
// import { routeLink, routePath } from '../../../../../../const/break-cumb';
import './JobAnnouncementsApply.scss';
import { IShiftDetail } from '../../../../../../models/job-annoucement-detail';
// import Loading from '../../../../layout/loading/Loading';
import FindCandidatesDetail from '../../find-candidates/find-candidates-detail/FindCandidatesDetail'

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
    sid?: string;
    lBtn?: boolean;
    defaultId?: string;
};

interface IJobAnnouncementsApplyProps extends StateProps, DispatchProps {
    match: any;
    history: any;
    location: any;
    getApplyJobs: Function;
    getListEmBranches: Function;
    id?: string;
    searchEventJobs?: any;
    stateApply?: any;
    getFindCandidateDetail?: any
};


class JobAnnouncementsApply extends Component<IJobAnnouncementsApplyProps, IJobAnnouncementsApplyState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            typeMng: [],
            listItem: [],
            loading: true,
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
        let id

        if (this.props.match && this.props.match.params.id) {
            if (this.props.match.params && this.props.match.params.id) {
                id = this.props.match.params.id
            }

            // const param = new URLSearchParams(this.props.location.search);
            // const stateApply = param.get('state');

        } else {
            id = this.props.id
        }
        // console.log(this.props.id);
        // this.setState({ loading: true })
        // this.forceUpdate()


        // this.props.getListEmBranches();



        await this.props.getApplyJobs(id, this.onSuccessCallAPI);
        // this.setState({loading: false})

    };

    static getDerivedStateFromProps(props: IJobAnnouncementsApplyProps, state: IJobAnnouncementsApplyState) {
        if (
            props.match && props.match.params && props.match.params.id &&
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
        if (props.id && props.id !== state.id) {
            return {
                id: props.id,
                stateApply: props.stateApply,
                loading: true
            }
        }

        // if (
        //     props.listApplyJobs &&
        //     props.listApplyJobs !== state.listApplyJobs
        // ) {
        //     // console.log(props.listApplyJobs)
        //     let listApplyJobs = props.listApplyJobs;
        //     let listPending = [];
        //     let listAccepted = [];
        //     let listRejected = [];
        //     let listShifts = [];
        //     let defaultId = null;
        //     let stateApply = null;


        //     if (props.location && props.location.search) {
        //         const param = new URLSearchParams(props.location.search);
        //         stateApply = param.get('state');
        //     }
        //     if (!stateApply) {
        //         stateApply = props.stateApply
        //     }
            
        //     if (listApplyJobs && listApplyJobs.length > 0) {
        //         listApplyJobs.forEach((item: IApplyJob, index: number) => {
        //             switch (item.state) {
        //                 case TYPE.PENDING:
        //                     listPending.push(item);
        //                     break;
        //                 case TYPE.REJECTED:
        //                     listRejected.push(item);
        //                     break;
        //                 case TYPE.ACCEPTED:
        //                     listAccepted.push(item);
        //                     break;

        //                 default:
        //                     break;
        //             }
        //         })
                
        //         if (listPending && listPending.length > 0 && stateApply === 'PENDING') {
        //             // if(stateApply === 'PENDING'){
        //             // searchShift(listApplyJobs[0].student.id, TYPE.PENDING, listApplyJobs[0].student.id)
                    
        //             // listShifts = listPending[0].appliedShifts
        //             defaultId = listPending[0].student.id
        //             // }

        //             // if (stateApply === 'PENDING') {
        //             //     defaultId = listPending[0].student.id
        //             // }

        //             // console.log(listPending[0].appliedShifts)
        //             // console.log(defaultId)
        //             // console.log(listPending[0].appliedShifts)
        //         }
        //          else if (listAccepted.length > 0 && stateApply === 'ACCEPTED') {
        //             defaultId = listAccepted[0].student.id
        //         }
        //         else if(listRejected.length > 0 && stateApply === "REJECTED" ){
        //             defaultId = listRejected[0].student.id
        //         }
        //         // stateApply= TYPE.PENDING
        //         if(!stateApply) {
        //             if(listPending && listPending.length > 0) {
        //                 stateApply = "PENDING"
        //             } else if(listAccepted.length > 0) {
        //                 stateApply = "ACCEPTED"
        //             }
        //             return {
        //                 listApplyJobs,
        //                 listPending,
        //                 listRejected,
        //                 listAccepted,
        //                 listShifts,
        //                 defaultId,
        //                 loading: false,
        //                 stateApply
        //             }
        //         }
        //     }
            
        //     return {
        //         listApplyJobs,
        //         listPending,
        //         listRejected,
        //         listAccepted,
        //         listShifts,
        //         defaultId,
        //         loading: false,
        //         // stateApply
        //     }
        // }

        return null
    }
    onSuccessCallAPI = () => {
        console.log(this.state.stateApply)
        this.setState({loading: false})

        // console.log(this.props.listAccepted)
        if(this.state.stateApply === 'ACCEPTED' && this.props.listAccepted.length > 0) {
            this.setState({defaultId: this.props.listAccepted[0].student.id})
        }
        if(this.state.stateApply === 'PENDING' && this.props.listPending.length > 0) {
            this.setState({defaultId: this.props.listPending[0].student.id})
        }
        if(this.state.stateApply === 'REJECTED' && this.props.listRejected.length > 0) {
            this.setState({defaultId: this.props.listRejected[0].student.id})
        }
        if(!this.state.stateApply) {
            if(this.props.listAccepted && this.props.listAccepted.length > 0) {
                this.setState({stateApply: 'ACCEPTED', defaultId: this.props.listAccepted[0].student.id})
            } else if(this.props.listPending.length > 0){
                this.setState({stateApply: 'PENDING', defaultId: this.props.listPending[0].student.id})
            } else if(this.props.listRejected.length > 0){
                this.setState({stateApply: 'REJECTED', defaultId: this.props.listRejected[0].student.id})
            } 
        }

    }
    selectStudent = ( defaultId?: string) => {
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
                this.props.getApplyJobs(id, this.onSuccessCallAPI);
                if(state === 'ACCEPTED'){
                    this.props.getFindCandidateDetail(cid)
                }
            }

        })
        await this.setState({ lBtn: false })
        if (state === 'ACCEPTED') {
            this.setState({ stateApply: 'ACCEPTED', defaultId: cid })
        }
        if (
            this.props.searchEventJobs) {
            this.props.searchEventJobs()
        }
    }
    selectShift(type) {
        if (type === "ACCEPTED") {
            if (this.props.listAccepted && this.props.listAccepted.length > 0) {
                this.setState({  defaultId: this.props.listAccepted[0].student.id })
            }

        } else if (type === "PENDING") {
            if (this.props.listPending&&this.props.listPending.length > 0) {
                this.setState({ defaultId: this.props.listPending[0].student.id })
            }
        } else if (type === "REJECTED") {
            if (this.props.listRejected.length > 0) {
                this.setState({ defaultId: this.props.listRejected[0].student.id })
            }
        }
    }
    render() {
        let {
            stateApply,
            // listRejected,
            // listAccepted,
            // listPending,
            // listShifts,
            loading,
            defaultId,
            lBtn
        } = this.state;
        let {
            totalItems, listAccepted, listPending, listRejected
        } = this.props;

        return (
            <div className='common-content'>
                {/* <h5>
                    Danh sách ứng viên công việc
                </h5> */}
                {/* <Divider orientation="left" >Danh sách yêu cầu</Divider> */}
                {/* if ({this.state.listAccepted.length > 0} ) {
                this.setState({ listShifts: this.state.listAccepted[0].appliedShifts, defaultId: this.state.listAccepted[0].student.id })
            }
        
            if ({this.state.listPending.length > 0}) {
                this.setState({ listShifts: this.state.listPending[0].appliedShifts, defaultId: this.state.listPending[0].student.id })
            }
        
            if (this.state.listRejected.length > 0) {
                this.setState({ listShifts: this.state.listRejected[0].appliedShifts, defaultId: this.state.listRejected[0].student.id })
            } */}
                <div className="announcements-Apply-content">
                    {loading ?
                        <div style={{ justifyContent: 'center', flex: 1, display: 'flex', marginTop: 70 }}>
                            <Spin />
                        </div> :
                        <Row>
                            <Col xs={24} md={10} lg={12} xl={8} xxl={12}>
                                <Tabs
                                    activeKey={stateApply}
                                    style={{ width: "100%" }}
                                    onChange={(stateApply: string) => {
                                        // console.log(stateApply)
                                        this.selectShift(stateApply)
                                        this.setState({ stateApply })
                                    }}

                                >
                                    {/* {this.state.listShifts} */}
                                    <TabPane tab={`Đang chờ (${listPending.length})`}
                                        key={TYPE.PENDING}
                                        disabled={listPending.length === 0}
                                        style={{ paddingRight: 10 }}
                                    >
                                        {listPending.length > 0 ?
                                            <div style={{ marginTop: 5, color: 'red' }}>Ấn "Chấp nhận hồ sơ" để xem thông tin ứng viên MIỄN PHÍ</div> : null}
                                        <div className="content-apply">
                                            {
                                                listPending.length === 0 ?
                                                    <Empty style={{ paddingTop: "5vh" }} description="Không có ứng viên đang chờ" />
                                                    : (
                                                        listPending.map((item: IApplyJob, index: number) =>
                                                            <ApplyJobItem
                                                                key={index}
                                                                type="PENDING"
                                                                lBtn={lBtn}
                                                                data={item}
                                                                id={item.student.id}
                                                                defaultId={item.student.id === defaultId}
                                                                onChangeType={(id?: string, state?: 'PENDING' | 'REJECTED' | 'ACCEPTED') => this.createRequest(id, state)}
                                                                onClick={
                                                                    (event: string) => this.selectStudent(item.student.id)
                                                                }

                                                            />
                                                        ))
                                            }
                                        </div>
                                    </TabPane>
                                    <TabPane tab={`Chấp nhận (${listAccepted.length})`}
                                        key={TYPE.ACCEPTED}
                                        disabled={listAccepted.length === 0}
                                    >
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
                                                                (event: string) => this.selectStudent(item.student.id)
                                                            }
                                                        />
                                                    ))
                                            }
                                        </div>
                                    </TabPane>
                                    <TabPane tab={`Từ chối (${listRejected.length})`}
                                        key={TYPE.REJECTED}
                                        disabled={listRejected.length === 0}
                                    >
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
                                                                    (event: string) => this.selectStudent(item.student.id)
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
                            <Col xs={24} md={14} lg={12} xl={16} xxl={12} style={{ height: 'calc(80vh - 36px)', overflow: 'auto' }}>
                                {/* <p
                                style={{
                                    margin: "10px 20px -10px",
                                    fontWeight: 600
                                }}
                            >
                                Thông tin ca
                            </p> */}

                                <FindCandidatesDetail sid={defaultId} />


                            </Col>
                        </Row>}
                </div>

            </div >
        )
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getApplyJobs: (id?: string, onSuccessCallAPI?) => dispatch({ type: REDUX_SAGA.APPLY_JOB.GET_APPLY_JOB, id, onSuccessCallAPI }),
    getListEmBranches: () => dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
    getFindCandidateDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, id }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listJobNames: state.JobNames.items,
    listSkills: state.Skills.items,
    listEmBranches: state.EmBranches.items,
    listApplyJobs: state.ApplyJobs.items,
    listAccepted: state.ApplyJobs.listAccepted,
    listPending: state.ApplyJobs.listPending,
    listRejected: state.ApplyJobs.listRejected,
    totalItems: state.ApplyJobs.totalItems
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsApply)