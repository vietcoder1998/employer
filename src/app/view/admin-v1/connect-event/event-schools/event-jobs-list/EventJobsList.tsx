import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Checkbox, Tooltip, Modal, Tabs, Spin } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../utils/convertTime';
import './EventJobsList.scss';
import { TYPE } from '../../../../../../const/type';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../models/job-names';
import { IEmBranch } from '../../../../../../models/em-branches';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IEventJobDetail } from '../../../../../../models/event-job-detail';
import { _requestToServer } from '../../../../../../services/exec';
import { PUT } from '../../../../../../const/method';
import { JOB_ANNOUNCEMENTS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IModalState } from '../../../../../../models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import JobSuitableCandidate from '../../../../layout/job-suitable-candidate/JobSuitableCandidate';
import JobDetail from '../../../../layout/job-detail/JobDetail';
import { IEventJobsFilter, IEventJob } from '../../../../../../models/event-jobs';
import JobAnnouncementsApply from '../../../jobs/job-announcements/job-announcements-apply/JobAnnouncementsApply';
import { searchWithUnicode } from '../../../../../../utils/searchWithUnicode'
import { searchWithUnicodeLabel } from '../../../../../../utils/searchWithUnicodeLabel'
import { createRequest } from './EventJobListRequest'
let { Option } = Select;
let CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;
const plainOptions = ['Đang chờ', 'Chấp nhận'];

const ViewPriority = (props?: { priority?: string, timeLeft?: string }) => {
    let { priority } = props;
    switch (priority) {

        case TYPE.TOP:
            return (
                <Tooltip title={props.timeLeft ? props.timeLeft : "Vô thời hạn"} placement="left">
                    <div className='top f-sm'>
                        {"Gói tuyển dụng gấp"}
                    </div>
                </Tooltip>
            );
        case TYPE.HIGHLIGHT:
            return (
                <Tooltip title={props.timeLeft ? props.timeLeft : "Vô thời hạn"} placement="left">
                    <div className='high_light f-sm'>
                        {"Gói tuyển dụng nổi bật"}
                    </div>
                </Tooltip>
            );
        case TYPE.IN_DAY:
            return (
                <Tooltip title={props.timeLeft ? props.timeLeft : "Vô thời hạn"} placement="left">
                    <div className='in_day f-sm'>
                        {"Gói tuyển dụng trong ngày"}
                    </div>
                </Tooltip>
            );
        case TYPE.TITLE_HIGHLIGHT:
            return (
                <Tooltip title={props.timeLeft ? props.timeLeft : "Vô thời hạn"} placement="left">
                    <div className='title_highlight f-sm'>
                        {"Gói tiêu đề nổi bật"}
                    </div>
                </Tooltip>
            );
        default:
            return <span></span>
    }
};

interface IEventJobsListProps extends StateProps, DispatchProps {
    match?: any;
    getListEventJobs: Function;
    getListEmBranches: Function;
    getTypeManagement: Function;
    getEventJobDetail: (id?: string, schoolEventID?: string) => any;
    getJobServiceEvent: Function;
    handleDrawer: Function;
    handleModal: Function;
    getListJobSuitableCandidate: Function;
    history: any;
    getListEventSchools?: Function;
    listEventSchools: any;
    getListJobService: Function;
    listJobService: any;
    setEventJobDetail: any;
    clearProfileStudent: any;
    getListJobAnnouncements: Function;

};

interface IEventJobsListState {
    dataTable?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    employerID?: string;
    target?: string;
    jobNameID?: string;
    jobId?: string;
    showModal?: boolean;
    loading?: boolean;
    message?: string;
    listEmBranches?: Array<any>;
    valueType?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    listEventJobs?: Array<any>;
    id?: string;
    loadingTable?: boolean;
    body?: IEventJobsFilter;
    unCheckbox?: boolean;
    listCheck?: Array<any>;
    stateCheckbox?: Array<string>;
    openDrawer?: boolean;
    homePriority?: string;
    searchPriority?: string;
    highlight?: string;
    highlightExpired?: boolean;
    homeExpired: boolean;
    searchExpired: boolean;
    eventJobDetail: IEventJobDetail;
    listEventSchools?: Array<any>;
    typeModal: string;
    ojd?: boolean;
    jid?: string;
    eid?: string;
    bodyListEventSchools?: any;
    loadingDetailJob?: boolean;
    applyModal?: boolean;
    applyId?: string;
    stateApply?: string;
    idSelected?: string;
    pendingAppliedSelected?: string;
    acceptedAppliedSelected?: string
    hiddenTilte?: boolean
    RejectSelected?: string
};

class EventJobsList extends PureComponent<IEventJobsListProps, IEventJobsListState> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            pageIndex: 0,
            pageSize: 10,
            employerID: null,
            jobNameID: null,
            jobId: null,
            showModal: false,
            loading: false,
            message: null,
            listEmBranches: [],
            valueType: null,
            announcementTypeID: null,
            createdDate: null,
            adminID: null,
            hidden: false,
            listEventJobs: [],
            id: null,
            loadingTable: true,
            body: {
                schoolEventID: null,
                expired: null,
                hidden: null,
                jobType: null,
                homePriority: null,
                homeExpired: null,
                searchPriority: null,
                searchExpired: null,
                highlightExpired: null,
                highlight: null,
                excludedJobIDs: null,
                jobNameIDs: null,
                jobGroupIDs: null,
                hasPendingApplied: null,
                hasAcceptedApplied: null,
                hasRejectedApplied: null,
                jobShiftFilter: null,
                jobLocationFilter: null
            },
            bodyListEventSchools: {
                schoolID: null,
                createdDate: null,
                startedDate: null,
                finishedDate: null,
                started: null,
                finished: null
            },
            unCheckbox: false,
            listCheck: [],
            homePriority: null,
            searchPriority: null,
            homeExpired: true,
            searchExpired: true,
            highlight: null,
            highlightExpired: true,
            eventJobDetail: null,
            typeModal: null,
            ojd: false,
            jid: null,
            eid: null,
            listEventSchools: null,
            loadingDetailJob: true,
            applyModal: false,
            applyId: null,
            stateApply: null,
            idSelected: null,
            pendingAppliedSelected: null,
            acceptedAppliedSelected: null,
            hiddenTilte: false
        };
    }

    columns = [
        {
            title: '#',
            width: 20,
            dataIndex: 'index',
            key: 'index',
            className: 'action',
            fixed: 'left',
        },
        {
            title: 'Tiêu đề',
            width: 220,
            dataIndex: 'item',
            key: 'item',
            fixed: 'left',
            render: (item) => this.titleJob(item)

        },
        {
            title: 'Loại công việc',
            dataIndex: 'jobType',
            className: 'action',
            key: 'jobType',
            width: 110,
        },
        {
            title: 'Đang chờ / Chấp nhận',
            dataIndex: 'pendingApplied',
            className: 'action',
            key: 'pendingApplied',
            render: ({ item }) => this.renderApply(item),
            width: 110,
        },
        {
            title: 'Từ chối',
            dataIndex: 'Reject',
            className: 'action',
            key: 'Reject',
            render: ({ item }) => this.renderReject(item),
            width: 70,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'employerBranchName',
            key: 'employerBranchName',
            // width: 200,
        },
        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'priority',
            className: 'action',
            key: 'priority',
            width: 190,
        },
        {
            title: 'Ngày đăng / Ngày hết hạn',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 120,
        },

        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            dataIndex: 'operation',
            render: ({ hidden, id, schoolEventID, item }) => this.EditToolTip(hidden, id, schoolEventID, item),
            width: 100,
        }
    ];

    onToggleModal = () => {
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    getTextDecoration(item) {
        if (item.hidden === false) {
            if (this.state.idSelected === item.id) {
                return 'underline'

            }
            else {
                return 'unset'
            }
        } else if (item.hidden === true) {
            if (this.state.idSelected === item.id) {
                return 'underline line-through'

            }
            else {
                return 'line-through'
            }
        } else {
            return 'unset'
        }
    }

    titleJob = (item) =>
        (
            <Tooltip title={item.hidden ? "Bài đăng đã bị ẩn" : ""} placement={"topLeft"}>
                <div>
                    <a
                        className="titleJob"
                        style={{
                            fontWeight: "bold",
                            fontSize: '1.12em',
                            color: '#1890ff',
                            textDecoration: this.getTextDecoration(item),

                        }}
                        onClick={
                            async () => {
                                this.setState({ ojd: true, loadingDetailJob: true });
                                setTimeout(() => {
                                    this.props.getListJobSuitableCandidate(item.id, 0, 10, TYPE.STUDENT);
                                    this.props.getEventJobDetail(item.id, item.schoolEventID);
                                    this.setState({ jid: item.id })
                                }, 300);
                                this.setState({ idSelected: item.id, pendingAppliedSelected: null, acceptedAppliedSelected: null })
                            }
                        } >{item.jobTitle}</a>
                    <div>{item.jobName ? item.jobName.name : ""}</div>
                </div>
            </Tooltip>

        )

    renderReject = (item) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} className="pending-candidate">
                <div
                    className="n-candidate"
                    style={{
                        pointerEvents: item.rejectedApplied === 0 ? 'none' : undefined
                    }}
                >
                    <Tooltip title="Xem chi tiết">
                        <div style={{ color: 'red', textDecoration: this.state.RejectSelected === item.id ? 'underline' : 'unset' }} onClick={() => {
                            this.setState({ applyModal: true, applyId: item.id, stateApply: 'REJECTED' })
                            this.setState({ RejectSelected: item.id, idSelected: null, acceptedAppliedSelected: null, pendingAppliedSelected: null })
                        }}>
                            {item.rejectedApplied} <Icon type="user-delete" />
                        </div>
                    </Tooltip>
                </div>

            </div>
        )
    }

    renderApply = (item) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} className="pending-candidate">
                <div
                    className="n-candidate"
                    style={{
                        pointerEvents: item.pendingApplied === 0 ? 'none' : undefined
                    }}
                >
                    <Tooltip title="Xem chi tiết">
                        <div style={{ color: 'orange', textDecoration: this.state.pendingAppliedSelected === item.id ? 'underline' : 'unset' }} onClick={() => {
                            this.setState({ applyModal: true, applyId: item.id, stateApply: 'PENDING' })
                            this.setState({ pendingAppliedSelected: item.id, idSelected: null, acceptedAppliedSelected: null })
                        }}>
                            {item.pendingApplied} <Icon type={'user'} />
                        </div>
                    </Tooltip>
                </div>
                <div style={{ margin: '0 8px' }}> / </div>
                <div
                    className="n-candidate"
                    style={{
                        pointerEvents: item.acceptedApplied === 0 ? 'none' : undefined
                    }}
                >
                    <Tooltip title="Xem chi tiết">
                        <div style={{ color: '#1687f2', textDecoration: this.state.acceptedAppliedSelected === item.id ? 'underline' : 'unset' }} onClick={() => {
                            this.setState({ applyModal: true, applyId: item.id, stateApply: 'ACCEPTED' })
                            this.setState({ acceptedAppliedSelected: item.id, idSelected: null, pendingAppliedSelected: null })
                        }}>
                            {item.acceptedApplied} <Icon type={'user-add'} />
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }

    EditToolTip = (hidden?: boolean, id?: string, schoolEventID?: string, item?: any) => {
        // let { body, pageIndex, pageSize } = this.state;
        return (
            <>
                {this.state.body.schoolEventID === null ?
                    <Tooltip placement="topLeft" title={hidden ? "Hiện bài đăng" : "Ẩn bài đăng"} >
                        <Icon
                            className="f-ic eye"
                            type={hidden ? "eye-invisible" : "eye"}
                            style={{ color: hidden ? "" : "" }}
                            onClick={async () =>
                                await _requestToServer(
                                    PUT,
                                    JOB_ANNOUNCEMENTS + `/${id}/hidden/${!hidden}`,
                                    undefined,
                                    undefined,
                                    undefined,
                                    EMPLOYER_HOST,
                                    false,
                                    false,

                                ).then((res: any) => {
                                    console.log(res)
                                    if (res) {
                                        let { body, pageIndex, pageSize } = this.state;
                                        this.props.getListEventJobs(body, pageIndex, pageSize);
                                    }
                                })}
                        />
                    </Tooltip>
                    : null}

                <Tooltip placement="topRight" title={"Kích hoạt gói dịch vụ"}>
                    <Icon
                        className="f-ic dollar"
                        type="dollar"
                        onClick={async () => {
                            console.log(item)
                            await this.props.getEventJobDetail(id, schoolEventID ? schoolEventID : null)
                            this.props.setEventJobDetail(item)
                            await this.props.handleDrawer();
                        }} />
                </Tooltip>
                <Tooltip placement="leftBottom" title={"Chỉnh sửa"}>
                    <Icon
                        className="f-ic edit"
                        type="edit"
                        onClick={() => {

                            window.open(routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${id}`)
                        }}
                    />
                </Tooltip>
                <Tooltip placement="bottom" title={"Đăng bài tương tự"}>
                    <Icon
                        className="f-ic copy"
                        type="copy"
                        onClick={() => {
                            window.open(routeLink.JOB_ANNOUNCEMENTS + routePath.COPY + `/${id}`)
                        }}
                    />
                </Tooltip>
                <Tooltip placement="bottom" title={"Xóa bài đăng"}>
                    <Icon
                        className="f-ic delete"
                        type="delete"
                        onClick={() => this.props.handleModal({ msg: "Bạn chắc chắn muốn  xóa bài đăng này ?", typeModal: TYPE.DELETE })}
                    />
                </Tooltip>
            </>
        )
    }

    static getDerivedStateFromProps(nextProps: IEventJobsListProps, prevState: IEventJobsListState) {
        if (
            nextProps.listEventJobs &&
            nextProps.listEventJobs !== prevState.listEventJobs
        ) {
            let { pageIndex, pageSize } = prevState;
            let dataTable = [];
            let url_string = window.location.href;
            let url = new URL(url_string);
            let eid = url.searchParams.get("eid");
            let expiredJob = url.searchParams.get("expiredJob");

            let body = prevState.body;
            if (expiredJob) {
                body[TYPE.JOB_FILTER.expired] = expiredJob
            }
            if (eid) {
                body.schoolEventID = eid;
                nextProps.getJobServiceEvent(eid);
            }
            let renderJobType = (item) => {
                let colorJobType, nameJobType
                if (item.jobType === 'PARTTIME') {
                    colorJobType = 'rgb(0, 179, 60)'
                    nameJobType = item.jobType
                } else if (item.jobType === 'INTERNSHIP') {
                    colorJobType = 'rgb(255, 153, 51)'
                    nameJobType = 'Thực Tập'
                } else {
                    colorJobType = 'rgb(6, 187, 228)'
                    nameJobType = item.jobType
                }
                return (
                    <div style={{ backgroundColor: colorJobType, color: '#fff', fontSize: '0.9em', fontWeight: 'bold', padding: '3px 0', margin: '0 8px' }}>{nameJobType}</div>
                )
            }

            let renderPriority = (item) => {
                if (!item.priority.homePriority && !item.priority.searchPriority && !item.priority.highlight) {
                    return (<div style={{ fontStyle: 'italic' }}>Chưa kích hoạt gói dịch vụ</div>)
                } else {
                    return (
                        <>
                            <ViewPriority priority={item.priority.homePriority} timeLeft={item.priority.homeTimeLeft} />
                            <ViewPriority priority={item.priority.searchPriority} timeLeft={item.priority.searchTimeLeft} />
                            <ViewPriority priority={item.priority.highlight} timeLeft={item.priority.highlightTimeLeft} />
                        </>
                    )
                }
            }
            let renderTime = (item) => (
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <div style={{ textAlign: 'left' }}>
                        <div><i className="fa fa-calendar-o" aria-hidden="true"></i> {timeConverter(item.createdDate, 1000)}</div>
                        <div><i className="fa fa-calendar-times-o" aria-hidden="true"></i> {timeConverter(item.expirationDate, 1000)}</div>
                    </div>
                </div>
            )

            nextProps.listEventJobs.forEach((item: IEventJob, index: number) => {
                dataTable.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    item: item,
                    // jobName: item.jobName ? item.jobName.name : "",
                    jobType: renderJobType(item),
                    employerBranchName: item.employerBranchName ? item.employerBranchName : "",
                    createdDate: renderTime(item),
                    // expirationDate: timeConverter(item.expirationDate, 1000),
                    pendingApplied: { item },
                    hidden: `${!item.hidden ? "Hiện" : "Ẩn"}, ${!item.expired ? "Còn hạn" : "Hết hạn"}`,
                    priority: renderPriority(item),
                    operation: { hidden: item.hidden, id: item.id, schoolEventID: item.schoolEventID, item },
                    Reject: { item }
                });
            })

            return {
                listEventJobs: nextProps.listEventJobs,
                dataTable,
                loadingTable: false,
                body,
                eid
            }
        }

        if (
            nextProps.eventJobDetail &&
            nextProps.eventJobDetail !== prevState.eventJobDetail
        ) {
            let { eventJobDetail } = nextProps;
            return {
                homePriority: eventJobDetail.priority.homePriority,
                highlight: eventJobDetail.priority.highlight,
                highlightExpired: eventJobDetail.priority.highlightExpired,
                searchPriority: eventJobDetail.priority.searchPriority,
                homeExpired: eventJobDetail.priority.homeExpired,
                searchExpired: eventJobDetail.priority.searchExpired,
                eventJobDetail,
                loadingDetailJob: false
            }
        }
        return null;
    };

    async componentDidMount() {
        await this.props.getListEmBranches();
        await this.props.getListEventSchools(this.state.bodyListEventSchools, 0, 0);
        await this.searchEventJobs();
        await this.props.getListJobService();
    };

    onChoseHomePriority = (event: any) => {
        // console.log(event)
        this.setState({ homePriority: event });
    };

    onChoseSearchPriority = (event: any) => {
        this.setState({ searchPriority: event });
    };

    onChoseHighLightPriority = (event: any) => {
        this.setState({ highlight: event });
    };

    onCancelRegisterBenefit = () => {
        this.props.handleDrawer();
        this.setState({
            homePriority: null,
            searchPriority: null,
            highlight: null,
        })
    }

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    handleCheckBox = (event: any) => {
        let { body } = this.state;
        let list_param = [
            { label: "Đang chờ", param: TYPE.JOB_FILTER.hasPendingApplied },
            { label: "Từ chối", param: TYPE.JOB_FILTER.hasRejectedApplied },
            { label: "Chấp nhận", param: TYPE.JOB_FILTER.hasAcceptedApplied },
        ]
        if (typeof event === "boolean") {
            if (event) {
                body.hasAcceptedApplied = null;
                body.hasPendingApplied = null;
                body.hasRejectedApplied = null;
            }
        } else {
            body.hasAcceptedApplied = null;
            body.hasPendingApplied = null;
            body.hasRejectedApplied = null;
            event.forEach((element: string) => {
                let arr = list_param.filter((item: any, index: number) => {
                    return (item.label === element)
                });

                arr.forEach((item: any, index) => {
                    body[item.param] = true;
                });
            });
        }

        this.setState({ body }, () => {
            this.searchEventJobs()
        });
    };

    setPageIndex = async (event: any) => {
        window.scrollTo({ top: 0 });
        // console.log(this.state.body)
        await this.setState({ pageIndex: event.current - 1, pageSize: event.pageSize });
        await this.searchEventJobs();
    };

    searchEventJobs = async () => {
        let { body, pageIndex, pageSize } = this.state;
        // console.log(body)
        await this.setState({ loadingTable: true })
        await this.props.getListEventJobs(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { listEmBranches } = this.props;
        let value: any = event;
        switch (param) {
            case TYPE.JOB_FILTER.jobNameIDs:
                if (value) {
                    value = [value];
                } else {
                    value = [value]
                }
                break;
            case TYPE.JOB_FILTER.jobLocationFilter:
                if (value) {
                    let data = listEmBranches.filter((item: IEmBranch, index: number) => { return item.id === event });
                    value = { distance: 1, lat: data[0].lat, lon: data[0].lon }
                }
                break;
            case 'schoolEventID':
                console.log(value)
                if (value) {
                    value = [value]
                    this.props.getJobServiceEvent(value);
                } else {
                    value = null
                }
            default:
                break;
        }

        switch (event) {
            case TYPE.TRUE:
                value = true;
                break;
            case TYPE.FALSE:
                value = false;
                break;
            default:
                break;
        }

        body[param] = value;
        this.setState({ body, pageIndex: 0 }, () => {
            this.searchEventJobs()
        });
    };

    onChangeCreatedDate = (event) => {
        this.setState({ createdDate: momentToUnix(event) });
    };

    onChangeHidden = (event) => {
        let { hidden } = this.state;
        switch (event) {
            case 0:
                hidden = true;
                break;
            case -1:
                hidden = false;
                break;
            default:
                break;
        };
        this.setState({ hidden });
    };

    requeryData = async () => {
        let { id, body } = this.state;
        await this.searchEventJobs();
        await this.props.getEventJobDetail(id, body.schoolEventID);
        await this.props.handleModal();
    };

    // EventJobListService(){

    // }

    render() {
        let {
            dataTable,
            loadingTable,
            unCheckbox,
            listCheck,
            body,
            loading,
            ojd,
            jid,
            applyModal
        } = this.state;

        let {
            eventJobDetail,
            totalItems,
            listJobNames,
            listEmBranches,
            jobServiceEvent,
            modalState,
            jobSuitableCandidates,
            listEventSchools,
            listJobService
        } = this.props;

        let url_string = window.location.href;
        let url = new URL(url_string);
        let expiredJob = url.searchParams.get("expiredJob");
        let active_search = 0
        if (!eventJobDetail.priority.searchPriority) {
            active_search = 1
        } else if (eventJobDetail.priority.searchPriority === 'HIGHLIGHT' && eventJobDetail.priority.searchExpired) {
            active_search = 2
        }
        let active_home = 0
        if (!eventJobDetail.priority.homePriority) {
            active_home = 1
        } else if (eventJobDetail.priority.homePriority === 'TOP' && eventJobDetail.priority.homeExpired) {
            active_home = 2
        } else if (eventJobDetail.priority.homePriority === 'IN_DAY' && eventJobDetail.priority.homeExpired) {
            active_home = 3
        }
        let active_highlight = 0
        if (!eventJobDetail.priority.highlight) {
            active_highlight = 1
        } else if (eventJobDetail.priority.highlight === 'TITLE_HIGHLIGHT' && eventJobDetail.priority.highlightExpired) {
            active_highlight = 2
        }

        return (
            <>
                <Modal
                    visible={modalState.open_modal}
                    title={"Workvn thông báo"}
                    destroyOnClose={true}
                    onOk={() => createRequest(this)}
                    onCancel={() => {
                        this.setState({ message: null, loading: false });
                        this.props.handleModal();
                    }}
                    footer={[
                        <Button
                            key="cancel"
                            type="danger"
                            children="Đóng"
                            onClick={() => {
                                this.setState({
                                    message: null,
                                    loading: false
                                });

                                this.props.handleModal()
                            }}
                        />,
                        <Button
                            key="ok"
                            type={modalState.typeModal === TYPE.DELETE ? "danger" : "primary"}
                            icon={modalState.typeModal === TYPE.DELETE ? "delete" : "check"}
                            loading={loading}
                            children={modalState.typeModal === TYPE.DELETE ? "Xóa" : "Xác nhận"}
                            onClick={() => createRequest(this)}
                        />
                    ]}
                    children={modalState.msg}
                />
                <Modal
                    visible={ojd}
                    title={<div style={{ textTransform: "uppercase" }}>Chi tiết công việc</div>}
                    destroyOnClose={true}
                    onOk={() => createRequest(this)}
                    width={'80vw'}
                    onCancel={() => {
                        this.setState({ ojd: false, loading: false });
                    }}
                    footer={null}
                >
                    {this.state.loadingDetailJob ?
                        <div style={{ display: 'flex', justifyContent: 'center', minHeight: 200, alignItems: 'center' }}>
                            <Spin />
                        </div>
                        :
                        <Row>
                            <Col span={16}>
                                <JobDetail
                                    jobDetail={{
                                        jobName: eventJobDetail.jobName.name,
                                        jobTitle: eventJobDetail.jobTitle,
                                        employerName: eventJobDetail.employerName,
                                        employerUrl: eventJobDetail.employerLogoUrl,
                                        expriratedDate: eventJobDetail.expirationDate,
                                        jobType: eventJobDetail.jobType,
                                        shifts: eventJobDetail.shifts,
                                        description: eventJobDetail.description,
                                        createdDate: eventJobDetail.createdDate,
                                        employerBranch: eventJobDetail.employerBranchName,
                                        requiredSkills: eventJobDetail.requiredSkills
                                    }}
                                />
                            </Col>
                            <Col span={8}>
                                <div id="scroll"></div>
                                <Tabs key={TYPE.STUDENT} >
                                    <TabPane tab={"Sinh viên tương thích"} key={TYPE.STUDENT} />
                                </Tabs>
                                <JobSuitableCandidate
                                    jobSuitableCandidates={jobSuitableCandidates.items}
                                    pageIndex={jobSuitableCandidates.pageIndex}
                                    pageSize={jobSuitableCandidates.pageSize}
                                    totalItems={jobSuitableCandidates.totalItems}
                                    loading={jobSuitableCandidates.loading}
                                    onGetListJobSuitableCandidate={(pageIndex, pageSize) => this.props.getListJobSuitableCandidate(jid, pageIndex, pageSize, TYPE.STUDENT)}
                                />
                            </Col>
                        </Row>}
                </ Modal>
                <Modal
                    visible={applyModal}
                    title={"Danh sách ứng viên công việc"}
                    destroyOnClose={true}
                    width={'80vw'}
                    onCancel={() => {
                        this.setState({ applyModal: false });
                        setTimeout(() => {
                            this.props.clearProfileStudent()
                        }, 500)
                    }}
                    footer={null}
                >
                    <JobAnnouncementsApply id={this.state.applyId} searchEventJobs={this.searchEventJobs} stateApply={this.state.stateApply} />
                </Modal>
                <DrawerConfig
                    title={"Gói dịch vụ ưu tiên"}
                    width={800}
                >
                    {body.schoolEventID ?
                        <div>
                            <h6>Gói dịch vụ sử dụng</h6>
                            <Row>
                                {eventJobDetail.priority.homePriority === TYPE.IN_DAY || eventJobDetail.priority.homePriority === TYPE.TOP ?
                                    <Col md={12}>
                                        <div className={eventJobDetail.priority.homeExpired ? "wapper-service-unactive" : "wapper-service"}>
                                            <div className="service">
                                                <div>Trang chủ</div>
                                                {eventJobDetail.priority.homePriority === TYPE.TOP ? <div className="bold-value">TUYỂN GẤP</div> : null}
                                                {eventJobDetail.priority.homePriority === TYPE.IN_DAY ? <div className="bold-value">TRONG NGÀY</div> : null}
                                                {eventJobDetail.priority.homePriority !== TYPE.IN_DAY && eventJobDetail.priority.homePriority !== TYPE.TOP ? <div className="bold-value">_</div> : null}
                                            </div>
                                            <div className="service-center">
                                                {eventJobDetail.priority.homeExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                {eventJobDetail.priority.homeTimeLeft ? <div className="bold-value">{eventJobDetail.priority.homeTimeLeft}</div> : null}
                                                {eventJobDetail.priority.homeExpiration < 0 && eventJobDetail.priority.homePriority ? <div className="bold-value">VÔ HẠN</div> : null}
                                                {eventJobDetail.priority.homeExpiration < 0 && !eventJobDetail.priority.homePriority ? <div className="bold-value">_</div> : null}
                                            </div>
                                            <div className="service">
                                                <div>Ngày hết hạn</div>
                                                {eventJobDetail.priority.homeExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.homeExpiration, 1000)}</div> : <div>_</div>}
                                            </div>
                                        </div>
                                    </Col> : null}
                                {eventJobDetail.priority.highlight ?
                                    <Col md={12}>
                                        <div className={eventJobDetail.priority.highlightExpired ? "wapper-service-unactive" : "wapper-service"}>
                                            <div className="service">
                                                <div>Nổi bật tiêu đề</div>
                                                {eventJobDetail.priority.highlight === 'TITLE_HIGHLIGHT' ? <div className="bold-value">NỔI BẬT TIÊU ĐỀ</div> : <div className="bold-value">_</div>}
                                            </div>
                                            <div className="service-center">
                                                {eventJobDetail.priority.highlightExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                {eventJobDetail.priority.highlightTimeLeft ? <div className="bold-value">{eventJobDetail.priority.highlightTimeLeft}</div> : null}
                                                {eventJobDetail.priority.highlightExpiration < 0 && eventJobDetail.priority.highlight ? <div className="bold-value">VÔ HẠN</div> : null}
                                                {eventJobDetail.priority.highlightExpiration < 0 && !eventJobDetail.priority.highlight ? <div className="bold-value">_</div> : null}
                                            </div>
                                            <div className="service">
                                                <div>Ngày hết hạn</div>
                                                {eventJobDetail.priority.highlightExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.highlightExpiration, 1000)}</div> : <div>_</div>}
                                            </div>
                                        </div>
                                    </Col> : null}
                                {!eventJobDetail.priority.homePriority && !eventJobDetail.priority.highlight ? <span className="italic"> (Chưa kích hoạt gói dịch vụ)</span> : null}
                            </Row>
                            <hr />
                            <h6><Icon type="home" style={{ verticalAlign: 3 }} /> Gói dịch vụ ưu tiên trang chủ</h6>
                            <Row>
                                <Col md={24}>
                                    <div className="select-service">
                                        <div>
                                            <div className="title-caplock">TUYỂN GẤP</div>
                                            <div className="description">Hiển thị bài đăng ở danh sách việc tuyển gấp trên trang chủ sự kiện</div>
                                            <div className="bold-text description">Hiệu lực: 15 ngày</div>
                                            <div className="bold-text description">Số lượt: {jobServiceEvent.homeTopQuantiy}</div>
                                        </div>
                                        {!(active_home === 0 && eventJobDetail.priority.homePriority === 'IN_DAY') ?
                                            <Button
                                                type={active_home === 0 ? "ghost" : "primary"}
                                                style={{
                                                    float: "right",
                                                    marginLeft: 10
                                                }}
                                                disabled={active_home === 0}
                                                onClick={() => {
                                                    this.props.handleModal({
                                                        msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                                        typeModal: 'HOME_TOP_EVENT'
                                                    });
                                                }}
                                            >
                                                {active_home === 0 ? "Đã kích hoạt" : null}

                                                {active_home === 1 ? "Kích hoạt" : null}
                                                {active_home === 3 ? "Kích hoạt lại" : null}
                                            </Button> : null}
                                    </div>
                                </Col>
                            </Row>
                            <h6 style={{ marginTop: 15 }}><Icon type="highlight" style={{ verticalAlign: 3 }} /> Gói dịch vụ nổi bật tiêu đề</h6>
                            <div className="select-service-2">
                                <div>
                                    <div className="title-caplock">NỔI BẬT TIÊU ĐỀ</div>
                                    <div className="description">Hiển thị bài đăng với tiêu đề được bôi đậm đỏ</div>
                                    <div className="bold-text description">Hiệu lực: 15 ngày</div>
                                    <div className="bold-text description">Số lượt: {jobServiceEvent.highlightTitleQuantity}</div>
                                </div>
                                <Button
                                    type={active_highlight === 0 ? "ghost" : "primary"}
                                    style={{
                                        float: "right"
                                    }}
                                    disabled={active_highlight === 0}
                                    onClick={() => {
                                        this.props.handleModal({
                                            msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                            typeModal: 'TITLE_HIGHLIGHT_EVENT'
                                        });
                                    }}
                                >
                                    {active_highlight === 0 ? "Đã kích hoạt" : null}
                                    {active_highlight === 1 ? "Kích hoạt" : null}
                                    {active_highlight === 2 ? "Kích hoạt lại" : null}

                                </Button>
                            </div>

                        </div>
                        : <div>
                            <h6>Gói dịch vụ sử dụng</h6>
                            <>
                                <Row>
                                    {eventJobDetail.priority.homePriority === TYPE.IN_DAY || eventJobDetail.priority.homePriority === TYPE.TOP ?
                                        <Col md={12}>
                                            <div className={eventJobDetail.priority.homeExpired ? "wapper-service-unactive" : "wapper-service"}>
                                                <div className="service">
                                                    <div>Trang chủ</div>
                                                    {eventJobDetail.priority.homePriority === TYPE.TOP ? <div className="bold-value">TUYỂN GẤP</div> : null}
                                                    {eventJobDetail.priority.homePriority === TYPE.IN_DAY ? <div className="bold-value">TRONG NGÀY</div> : null}
                                                    {eventJobDetail.priority.homePriority !== TYPE.IN_DAY && eventJobDetail.priority.homePriority !== TYPE.TOP ? <div className="bold-value">_</div> : null}
                                                </div>
                                                <div className="service-center">
                                                    {eventJobDetail.priority.homeExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                    {eventJobDetail.priority.homeTimeLeft ? <div className="bold-value">{eventJobDetail.priority.homeTimeLeft}</div> : null}
                                                    {eventJobDetail.priority.homeExpiration < 0 && eventJobDetail.priority.homePriority ? <div className="bold-value">VÔ HẠN</div> : null}
                                                    {eventJobDetail.priority.homeExpiration < 0 && !eventJobDetail.priority.homePriority ? <div className="bold-value">_</div> : null}
                                                </div>
                                                <div className="service">
                                                    <div>Ngày hết hạn</div>
                                                    {eventJobDetail.priority.homeExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.homeExpiration, 1000)}</div> : <div>_</div>}
                                                </div>
                                            </div>
                                        </Col> : null}
                                    {eventJobDetail.priority.searchPriority ?
                                        <Col md={12}>
                                            <div className={eventJobDetail.priority.searchExpired ? "wapper-service-unactive" : "wapper-service"}>
                                                <div className="service">
                                                    <div>Bộ tìm kiếm</div>
                                                    {eventJobDetail.priority.searchPriority === TYPE.HIGHLIGHT ? <div className="bold-value">NỔI BẬT</div> : <div className="bold-value">_</div>}
                                                </div>
                                                <div className="service-center">
                                                    {eventJobDetail.priority.searchExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                    {eventJobDetail.priority.searchTimeLeft ? <div className="bold-value">{eventJobDetail.priority.searchTimeLeft}</div> : null}
                                                    {eventJobDetail.priority.searchExpiration < 0 && eventJobDetail.priority.searchPriority ? <div className="bold-value">VÔ HẠN</div> : null}
                                                    {eventJobDetail.priority.searchExpiration < 0 && !eventJobDetail.priority.searchPriority ? <div className="bold-value">_</div> : null}
                                                </div>
                                                <div className="service">
                                                    <div>Ngày hết hạn</div>
                                                    {eventJobDetail.priority.searchExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.searchExpiration, 1000)}</div> : <div>_</div>}
                                                </div>
                                            </div>
                                        </Col> : null}

                                    {eventJobDetail.priority.highlight ?
                                        <Col md={12}>
                                            <div className={eventJobDetail.priority.highlightExpired ? "wapper-service-unactive" : "wapper-service"}>
                                                <div className="service">
                                                    <div>Nổi bật tiêu đề</div>
                                                    {eventJobDetail.priority.highlight === 'TITLE_HIGHLIGHT' ? <div className="bold-value">NỔI BẬT TIÊU ĐỀ</div> : <div className="bold-value">_</div>}
                                                </div>
                                                <div className="service-center">
                                                    {eventJobDetail.priority.highlightExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                    {eventJobDetail.priority.highlightTimeLeft ? <div className="bold-value">{eventJobDetail.priority.highlightTimeLeft}</div> : null}
                                                    {eventJobDetail.priority.highlightExpiration < 0 && eventJobDetail.priority.highlight ? <div className="bold-value">VÔ HẠN</div> : null}
                                                    {eventJobDetail.priority.highlightExpiration < 0 && !eventJobDetail.priority.highlight ? <div className="bold-value">_</div> : null}
                                                </div>
                                                <div className="service">
                                                    <div>Ngày hết hạn</div>
                                                    {eventJobDetail.priority.highlightExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.highlightExpiration, 1000)}</div> : <div>_</div>}
                                                </div>
                                            </div>
                                        </Col> : null}
                                </Row>
                            </>
                            <hr />
                            {/* <h6>Hãy chọn gói phù hợp cho bạn <Icon type="check" style={{ color: "green" }} /></h6> */}
                            <h6><Icon type="home" theme={"filled"} /> Gói dịch vụ ưu tiên trang chủ</h6>
                            <Row>
                                <Col md={12}>
                                    <div className="select-service">
                                        <div>
                                            <div className="title-caplock">TUYỂN GẤP</div>
                                            <div className="description">Hiển thị bài đăng ở danh sách việc tuyển gấp trên trang chủ sự kiện</div>
                                            <div className="bold-text description">Hiệu lực: 15 ngày</div>
                                            <div className="bold-text description">Số lượt: {listJobService.homeTopQuantiy}</div>
                                        </div>

                                        {!(active_home === 0 && eventJobDetail.priority.homePriority === 'TOP') ?
                                            <Button
                                                type={active_home === 0 ? "ghost" : "primary"}
                                                style={{
                                                    float: "right",
                                                    marginLeft: 10
                                                }}
                                                disabled={active_home === 0}
                                                onClick={() => {
                                                    this.props.handleModal({
                                                        msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                                        typeModal: 'HOME_TOP'
                                                    });
                                                }}
                                            >
                                                {active_home === 0 ? "Đã kích hoạt" : null}
                                                {active_home === 1 ? "Kích hoạt" : null}
                                                {active_home === 3 ? "Kích hoạt" : null}
                                                {active_home === 2 ? "Kích hoạt lại" : null}
                                            </Button> : null}
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="select-service">
                                        <div>
                                            <div className="title-caplock">TRONG NGÀY</div>
                                            <div className="description">Hiển thị bài đăng ở danh sách việc trong ngày trên trang chủ</div>
                                            <div className="bold-text description">Hiệu lực: 1 ngày</div>
                                            <div className="bold-text description">Số lượt: {listJobService.homeInDayQuantity}</div>
                                        </div>
                                        {!(active_home === 0 && eventJobDetail.priority.homePriority === 'IN_DAY') ?
                                            <Button
                                                type={active_home === 0 ? "ghost" : "primary"}
                                                style={{
                                                    float: "right",
                                                    marginLeft: 10
                                                }}
                                                disabled={active_home === 0}
                                                onClick={() => {
                                                    this.props.handleModal({
                                                        msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                                        typeModal: 'HOME_IN_DAY'
                                                    });
                                                }}
                                            >
                                                {active_home === 0 ? "Đã kích hoạt" : null}
                                                {active_home === 1 ? "Kích hoạt" : null}
                                                {active_home === 2 ? "Kích hoạt" : null}

                                                {active_home === 3 ? "Kích hoạt lại" : null}
                                            </Button> : null}
                                    </div>
                                </Col>
                            </Row>


                            <h6><Icon type="search" /> Gói dịch vụ ưu tiên tìm kiếm</h6>
                            <div className="select-service-2">
                                <div>
                                    <div className="title-caplock">NỔI BẬT</div>
                                    <div className="description">Hiển thị bài đăng tại vị trí đầu tiên trong danh sách kết quả tìm kiếm</div>
                                    <div className="bold-text description">Hiệu lực: 15 ngày</div>
                                    <div className="bold-text description">Số lượt: {listJobService.searchHighLightQuantity}</div>
                                </div>
                                <Button
                                    type={active_search === 0 ? "ghost" : "primary"}
                                    style={{
                                        float: "right"
                                    }}
                                    disabled={active_search === 0}
                                    onClick={() => {
                                        this.props.handleModal({
                                            msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                            typeModal: TYPE.JOB_FILTER.highlight
                                        });
                                    }}
                                >
                                    {active_search === 0 ? "Đã kích hoạt" : null}
                                    {active_search === 1 ? "Kích hoạt" : null}
                                    {active_search === 2 ? "Kích hoạt lại" : null}
                                </Button>
                            </div>
                            <h6><Icon type="highlight" /> Gói dịch vụ nổi bật tiêu đề</h6>
                            <div className="select-service-2">
                                <div>
                                    <div className="title-caplock">NỔI BẬT TIÊU ĐỀ</div>
                                    <div className="description">Hiển thị bài đăng với tiêu đề được bôi đậm đỏ</div>
                                    <div className="bold-text description">Hiệu lực: 15 ngày</div>
                                    <div className="bold-text description">Số lượt: {listJobService.highLightQuantity}</div>
                                </div>
                                <Button
                                    type={active_highlight === 0 ? "ghost" : "primary"}
                                    style={{
                                        float: "right"
                                    }}
                                    disabled={active_highlight === 0}
                                    onClick={() => {
                                        this.props.handleModal({
                                            msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                            typeModal: 'TITLE_HIGHLIGHT'
                                        });
                                    }}
                                >
                                    {active_highlight === 0 ? "Đã kích hoạt" : null}
                                    {active_highlight === 1 ? "Kích hoạt" : null}
                                    {active_highlight === 2 ? "Kích hoạt lại" : null}

                                </Button>
                            </div>

                        </div>}


                </DrawerConfig>
                <div className="common-content">
                    <h5 className="TitleJob">
                        {expiredJob === 'true' ? `Việc làm hết hạn (${totalItems})` : `Việc làm hoạt động (${totalItems})`}
                    </h5>
                    <div className="table-operations">
                        <Row style={{ marginBottom: 10 }}>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Nhóm"} className="titleFilter" />
                                <Select
                                    showSearch
                                    defaultValue="Tuyển dụng thường"
                                    style={{ width: "100%" }}
                                    optionFilterProp="label"
                                    filterOption={searchWithUnicodeLabel}
                                    onChange={(event: any) => this.onChangeType(event, 'schoolEventID')}
                                    allowClear
                                    value={this.state.body.schoolEventID}
                                >
                                    <Option value={null} label={'Tuyển dụng thường'}>Tuyển dụng thường</Option>
                                    {
                                        listEventSchools &&
                                        listEventSchools.map(
                                            (item, index) =>
                                                <Option key={index} value={item.id} label={item.name}>
                                                    {item.name}
                                                    <div style={{ color: '#1890ff', fontSize: '0.9em' }}>
                                                        #{item.school.shortName}
                                                    </div>

                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tên việc đăng tuyển"} className="titleFilter" />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    filterOption={searchWithUnicode}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobNameIDs)}
                                    allowClear
                                >
                                    <Option value={null}>Tất cả</Option>
                                    {
                                        listJobNames &&
                                        listJobNames.map(
                                            (item: IJobName, index: number) => <Option key={index} value={item.id}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Chi nhánh"} className="titleFilter" />
                                <Select
                                    showSearch
                                    placeholder="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    filterOption={searchWithUnicode}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobLocationFilter)}
                                    allowClear
                                >
                                    <Option value={null}>Tất cả</Option>
                                    {
                                        listEmBranches &&
                                        listEmBranches.map(
                                            (item: IEmBranch, index: number) => <Option key={index} value={item.id}>{item.branchName}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Chứa trạng thái ứng tuyển"} />
                                <div>

                                    <div>
                                        <Checkbox
                                            indeterminate={unCheckbox}
                                            onChange={
                                                (event: any) => {
                                                    this.handleCheckBox(event.target.checked);
                                                    this.setState({ unCheckbox: event.target.checked })
                                                    // console.log(unCheckbox)
                                                    if (unCheckbox) {
                                                        this.setState({ listCheck: [] })
                                                    }
                                                }
                                            }
                                            style={{ marginTop: '6px' }}
                                        >
                                            Bất kì
                                </Checkbox>
                                    </div>

                                    <hr />
                                    <CheckboxGroup
                                        options={plainOptions}
                                        value={listCheck}
                                        onChange={
                                            (event: any) => {
                                                this.handleCheckBox(event);
                                                this.setState({ listCheck: event })
                                            }
                                        }
                                        disabled={unCheckbox}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loadingTable}
                            dataSource={dataTable}
                            scroll={{ x: 1090 }}
                            rowKey="event-job"
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true, current: this.state.pageIndex + 1 }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onClick: (event: any) => {
                                        this.setState({ id: record.key })
                                    }, // mouse enter row
                                };
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListEventJobs: (body: IEventJobsFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_LIST_EVENT_JOBS, body, pageIndex, pageSize }),
    getListEmBranches: () =>
        dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
    handleDrawer: (drawerState?: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
    handleModal: (modalState?: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    getEventJobDetail: (id?: string, schoolEventID?: string) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_EVENT_JOB_DETAIL, id, schoolEventID }),
    getJobServiceEvent: (id?: string) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_EVENT_JOB_SERVICE, id }),
    getListJobSuitableCandidate: (jid?: string, pageIndex?: number, pageSize?: number) =>
        dispatch({ type: REDUX_SAGA.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE, jid, pageIndex, pageSize }),
    getListEventSchools: (body: any, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_LIST_EVENT_SCHOOLS, body, pageIndex, pageSize }),
    getListJobService: () => dispatch({ type: REDUX_SAGA.JOB_SERVICE.GET_JOB_SERVICE }),
    setEventJobDetail: (data) => dispatch({ type: REDUX.EVENT_SCHOOLS.GET_EVENT_JOB_DETAIL, data }),
    clearProfileStudent: () => dispatch({ type: REDUX.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, data: null })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listEventJobs: state.EventJobs.items,
    listJobNames: state.JobNames.items,
    listEmBranches: state.EmBranches.items,
    jobServiceEvent: state.JobServiceEvent,
    modalState: state.MutilBox.modalState,
    drawerState: state.MutilBox.drawerState,
    totalItems: state.EventJobs.totalItems,
    jobSuitableCandidates: state.JobSuitableCandidates,
    eventJobDetail: state.EventJobDetail,
    listEventSchools: state.EventSchools.items,
    listJobService: state.JobService,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventJobsList);