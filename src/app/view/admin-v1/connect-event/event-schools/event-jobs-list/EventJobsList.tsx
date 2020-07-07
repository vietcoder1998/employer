import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Cascader, Checkbox, Tooltip, Radio, Modal, message, Tabs, Spin } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../utils/convertTime';
import './EventJobsList.scss';
import { TYPE } from '../../../../../../const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../models/job-names';
import { IEventSchoolFilter } from '../../../../../../models/event-schools';

import { IEmBranch } from '../../../../../../models/em-branches';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IEventJobDetail } from '../../../../../../models/event-job-detail';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, DELETE, PUT } from '../../../../../../const/method';
import { EVENT_SCHOOLS, ADMIN_ACCOUNT } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IModalState } from '../../../../../../models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import JobSuitableCandidate from '../../../../layout/job-suitable-candidate/JobSuitableCandidate';
import JobDetail from '../../../../layout/job-detail/JobDetail';
import { IEventJobsFilter, IEventJob } from '../../../../../../models/event-jobs';

let { Option } = Select;
let CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;
const plainOptions = ['Đang chờ', 'Chấp nhận'];
const strForSearch = str => {
    return str
        ? str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : str;
};

const ViewPriority = (props?: { priority?: string, timeLeft?: string }) => {
    let { priority } = props;
    switch (priority) {
        case TYPE.TOP:
            return (
                <Tooltip title={"Gói tuyển dụng gấp"} placement="left">
                    <div className='top f-sm'>
                        {props.timeLeft ? props.timeLeft : "Đến hết sự kiện"}
                    </div>
                </Tooltip>
            );
        case TYPE.HIGHLIGHT:
            return (
                <Tooltip title={"Gói tuyển dụng nổi bật"} placement="left">
                    <div className='high_light f-sm'>
                        {props.timeLeft ? props.timeLeft : "Đến hết sự kiện"}
                    </div>
                </Tooltip>
            );
        case TYPE.IN_DAY:
            return (
                <Tooltip title={"Gói tuyển dụng trong ngày"} placement="left">
                    <div className='in_day f-sm'>
                        {props.timeLeft ? props.timeLeft : "Đến hết sự kiện"}
                    </div>
                </Tooltip>
            );
        case TYPE.TITLE_HIGHLIGHT:
            return (
                <Tooltip title={"Gói tiêu đề nổi bật"} placement="left">
                    <div className='title_highlight f-sm'>
                        {props.timeLeft ? props.timeLeft : "Đến hết sự kiện"}
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
    setEventJobDetail: any
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
            loadingDetailJob: true
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
            dataIndex: 'title',
            key: 'jobTitle',
            fixed: 'left',
            render: ({ item }) => this.titleJob(item),
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
            width: 110,
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

    options = [
        {
            value: TYPE.JOB_FILTER.homePriority,
            label: 'Trang chủ ',
            children: [
                {
                    value: TYPE.TOP,
                    label: 'Tuyển gấp',
                },
                {
                    value: 'IN_DAY',
                    label: 'Trong ngày',
                }
            ],
        },
        {
            value: TYPE.JOB_FILTER.highlight,
            label: 'Tìm kiếm',
            children: [
                {
                    value: TYPE.TITLE_HIGHLIGHT,
                    label: 'Nổi bật tiêu đề',
                },
            ],
        },
    ];

    onToggleModal = () => {
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };
    titleJob = (item) => {
        return (
            <div>
                <a className="titleJob" style={{ fontWeight: "bold", fontSize: '1.12em', color: '#1890ff' }} onClick={
                    async () => {
                        this.setState({ ojd: true, loadingDetailJob: true });
                        setTimeout(() => {
                            this.props.getListJobSuitableCandidate(item.id, 0, 10, TYPE.STUDENT);
                            this.props.getEventJobDetail(item.id, item.schoolEventID);
                            this.setState({ jid: item.id })
                        }, 300);
                    }
                } target="_blank">{item.jobTitle}</a>
                <div>{item.jobName ? item.jobName.name : ""}</div>
            </div>
        )
    }
    EditToolTip = (hidden?: boolean, id?: string, schoolEventID?: string, item?: any) => {
        let { body, pageIndex, pageSize } = this.state;

        return (
            <>
                <Tooltip placement="topRight" title={"Kích hoạt gói dịch vụ"}>
                    <Icon
                        className="f-ic dollar"
                        type="dollar"
                        onClick={async () => {
                            // console.log(item)
                            // await this.props.getEventJobDetail(id, schoolEventID ? schoolEventID : null)
                            this.props.setEventJobDetail(item)
                            await this.props.handleDrawer();
                        }} />
                </Tooltip>
                <Tooltip placement="top" title={"Chỉnh sửa"}>
                    <Icon
                        className="f-ic edit"
                        type="edit"
                        onClick={() => {

                            window.open(routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${id}`)
                        }}
                    />
                </Tooltip>
                {/* <Tooltip placement="topRight" title={"Xem tương thích"}>
                    <Icon
                        className="f-ic"
                        type="solution"
                        twoToneColor="purple"
                        onClick={async () => {
                            this.setState({ ojd: true });
                            setTimeout(() => {
                                this.props.getListJobSuitableCandidate(id, 0, 10, TYPE.STUDENT);
                                this.props.getEventJobDetail(id, schoolEventID);
                                this.setState({ jid: id })
                            }, 300);
                        }}
                    />
                </Tooltip> */}
                <Tooltip placement="top" title={"Đăng bài tương tự"}>
                    <Icon
                        className="f-ic copy"
                        type="copy"
                        onClick={() => {
                            window.open(routeLink.JOB_ANNOUNCEMENTS + routePath.COPY + `/${id}`)
                        }}
                    />
                </Tooltip>
                <Tooltip placement="topRight" title={"Xóa bài đăng"}>
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

            // body.schoolEventID = eid;

            // nextProps.getJobServiceEvent(eid);
            // let renderTitleJob = (item) => (
            //     <div>
            //         <a className="titleJob" style={{ fontWeight: "bold", fontSize: '1.12em' }} href={routeLink.EVENT + routePath.JOBS + routePath.FIX + `/${item.id}?eid=${item.schoolEventID}`} target="_blank">{item.jobTitle}</a>
            //         <div>{item.jobName ? item.jobName.name : ""}</div>
            //     </div>
            // )
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
            let renderCandidate = (item) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div
                            className="n-candidate"
                            style={{
                                pointerEvents: item.pendingApplied === 0 ? 'none' : undefined
                            }}
                        >
                            <Tooltip title="Xem chi tiết">
                                <Link
                                    to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${item.id}?state=${TYPE.PENDING}`}
                                    disabled={item.pendingApplied === 0 ? true : false}
                                    target="_blank"
                                >
                                    <div style={{ color: 'orange' }}>
                                        {item.pendingApplied} <Icon type={'user'} />
                                    </div>
                                </Link>
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
                                <Link
                                    to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${item.id}?state=${TYPE.ACCEPTED}`}
                                    disabled={item.acceptedApplied === 0 ? true : false}
                                    target="_blank"
                                >
                                    <div style={{ color: '#1687f2' }}>
                                        {item.acceptedApplied} <Icon type={'user-add'} />
                                    </div>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>


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
                        <div><i class="fa fa-calendar-o" aria-hidden="true"></i> {timeConverter(item.createdDate, 1000)}</div>
                        <div><i class="fa fa-calendar-times-o" aria-hidden="true"></i> {timeConverter(item.expirationDate, 1000)}</div>
                    </div>
                </div>
            )

            nextProps.listEventJobs.forEach((item: IEventJob, index: number) => {
                dataTable.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    title: { item },
                    // jobName: item.jobName ? item.jobName.name : "",
                    jobType: renderJobType(item),
                    employerBranchName: item.employerBranchName ? item.employerBranchName : "",
                    createdDate: renderTime(item),
                    // expirationDate: timeConverter(item.expirationDate, 1000),
                    pendingApplied: renderCandidate(item),
                    hidden: `${!item.hidden ? "Hiện" : "Ẩn"}, ${!item.expired ? "Còn hạn" : "Hết hạn"}`,
                    priority: renderPriority(item),
                    operation: { hidden: item.hidden, id: item.id, schoolEventID: item.schoolEventID, item }
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
            // console.log(eventJobDetail);
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
        // if (nextProps.listEventSchools && nextProps.listEventSchools !== prevState.listEventSchools) {
        //     console.log(nextProps.listEventSchools);
        //     return null;
        // }
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
                    value = value
                }
                break;
            case TYPE.JOB_FILTER.jobLocationFilter:
                if (value) {
                    let data = listEmBranches.filter((item: IEmBranch, index: number) => { return item.id === event });
                    value = { distance: 1, lat: data[0].lat, lon: data[0].lon }
                }
                break;
            case 'schoolEventID':
                if (value) {
                    value = value
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
        // console.log(body);
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

    createRequest = async () => {
        let { homePriority, id, body, highlight } = this.state;
        let { modalState } = this.props;
        await this.setState({ loading: true });
        switch (modalState.typeModal) {
            case TYPE.JOB_FILTER.homePriority:
                await _requestToServer(
                    POST,
                    EVENT_SCHOOLS + `/${body.schoolEventID + routePath.JOBS}/${id}/priority/home`,
                    { homePriority },
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false
                ).then((res: any) => {
                    if (res) {
                        this.requeryData()
                    }
                }).finally(
                    () => this.setState({
                        loading: false
                    })
                );
                break;

            case TYPE.JOB_FILTER.highlight:
                await _requestToServer(
                    POST,
                    EVENT_SCHOOLS + `/${body.schoolEventID + routePath.JOBS}/${id}/highlight`,
                    { highlight },
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false
                ).then((res: any) => {
                    if (res) {
                        this.requeryData()
                    }
                }).finally(
                    () => this.setState({
                        loading: false
                    })
                );
                break;

            case TYPE.DELETE:
                await _requestToServer(
                    DELETE,
                    ADMIN_ACCOUNT + `/jobs/${id}`,
                    undefined,
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false
                ).then((res) => {
                    if (res) {
                        this.searchEventJobs();
                        this.props.handleModal();
                    }
                }).finally(
                    () => this.setState({
                        loading: false
                    })
                )
                break;
            default:
                break;
        };
    };

    requeryData = async () => {
        let { id, eid } = this.state;
        await this.searchEventJobs();
        // await this.props.getJobServiceEvent(eid);

        await this.props.getEventJobDetail(id, eid);
        await this.props.handleModal();
    };
    searchWithUnicode = (input, option) => {
        if (option.props.value) {
            // console.log(option.props.value)
            return strForSearch(option.props.children).includes(
                strForSearch(input)
            );
        } else {
            return false;
        }
    }
    searchWithUnicodeLabel = (input, option) => {
        if (option.props.label) {
            // console.log(option.props.label)
            return strForSearch(option.props.label).includes(
                strForSearch(input)
            );
        } else {
            return false;
        }
    }
    render() {
        let {
            dataTable,
            loadingTable,
            unCheckbox,
            listCheck,
            homePriority,
            highlight,
            homeExpired,
            highlightExpired,
            searchExpired,
            body,
            loading,
            ojd,
            jid,
            eid,
            searchPriority
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

        let homeExpiration = eventJobDetail.priority.homeExpiration
        let highlightExpiration = eventJobDetail.priority.highlightExpiration;
        let searchExpiration = eventJobDetail.priority.searchExpiration;
        let un_active_home = eventJobDetail.priority.homePriority !== null;
        let un_active_home_2 = homeExpiration !== -1 && !homeExpired;
        let un_active_highlight = eventJobDetail.priority.highlight !== null;
        let un_active_search = searchExpiration !== -1 && !searchExpired;

        let url_string = window.location.href;
        let url = new URL(url_string);
        let expiredJob = url.searchParams.get("expiredJob");
        return (
            <>
                <Modal
                    visible={modalState.open_modal}
                    title={"Workvn thông báo"}
                    destroyOnClose={true}
                    onOk={this.createRequest}
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
                            onClick={async () => this.createRequest()}
                        />
                    ]}
                    children={modalState.msg}
                />
                <Modal
                    visible={ojd}
                    title={<div style={{ textTransform: "uppercase" }}>Chi tiết công việc</div>}
                    destroyOnClose={true}
                    onOk={this.createRequest}
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
                            <Col span={14}>
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
                            <Col span={10}>
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
                <DrawerConfig
                    title={"Gói dịch vụ ưu tiên"}
                    width={800}
                >
                    {body.schoolEventID ?
                        <div>
                            <h6>Gói dịch vụ đang hoạt động</h6>
                            <label className='top'>Gói tuyển dụng gấp: {jobServiceEvent.homeTopQuantiy}</label>
                            <label className='title_highlight'>Gói tiêu đề nổi bật:  {jobServiceEvent.highlightTitleQuantity}</label>
                            <hr />
                            <h6>Hãy chọn gói phù hợp cho bạn:</h6>
                            <>
                                <IptLetterP
                                    style={{ margin: "15px 5px" }}
                                    value={`Nhóm gói tuyển dụng ở trang chủ${homeExpiration !== -1 && homeExpired ? "(Hết hạn)" : ""}`}
                                >
                                    <Radio.Group onChange={
                                        (event: any) => this.onChoseHomePriority(event.target.value)}
                                        value={homePriority}
                                        disabled={un_active_home}
                                    >
                                        <Radio value={TYPE.TOP}>Tuyển dụng gấp</Radio>
                                        {/* <Radio value={TYPE.IN_DAY}>Tuyển dụng trong ngày</Radio> */}
                                    </Radio.Group>
                                    <Button
                                        icon="check"
                                        type={un_active_home ? "ghost" : "primary"}
                                        style={{
                                            float: "right"
                                        }}
                                        disabled={un_active_home}
                                        onClick={() => {
                                            this.props.handleModal({
                                                msg: "Bạn muốn kích hoạt gói dịch vụ tuyển gấp cho bài đăng này ?",
                                                typeModal: TYPE.JOB_FILTER.homePriority
                                            });
                                        }}
                                    >
                                        {un_active_home ? "Đã kích hoạt" : "Kích hoạt"}
                                    </Button>
                                </IptLetterP>
                                <IptLetterP
                                    style={{ margin: "15px 5px" }}
                                    value={`Nhóm gói tuyển dụng tiêu đề nổi bật ${highlightExpiration !== -1 && highlightExpired ? "(Hết hạn)" : ""}`}
                                >
                                    <Radio.Group
                                        onChange={
                                            (event: any) => this.onChoseHighLightPriority(event.target.value)}
                                        value={highlight}
                                        disabled={un_active_highlight}
                                    >
                                        <Radio value={TYPE.TITLE_HIGHLIGHT}>Tiêu đề nổi bật</Radio>
                                    </Radio.Group>
                                    <Button
                                        type={un_active_highlight ? "ghost" : "primary"}
                                        icon="check"
                                        style={{
                                            float: "right"
                                        }}
                                        disabled={un_active_highlight}
                                        onClick={() => {
                                            this.props.handleModal({
                                                msg: "Bạn muốn kích hoạt gói tiêu đề nổi bật cho bài đăng này ?",
                                                typeModal: TYPE.JOB_FILTER.highlight
                                            });
                                        }}
                                    >
                                        {un_active_highlight ? "Đã kích hoạt" : "Kích hoạt"}
                                    </Button>
                                </IptLetterP>
                            </>
                            <div style={{
                                marginTop: "30px",
                                textAlign: "center",
                            }}
                            >
                                {
                                    (!homeExpired && homeExpiration !== -1) ||
                                        (!searchExpired && homeExpiration !== -1) ?
                                        <span className="italic">(Đang kích hoạt gói dịch vụ)</span> :
                                        <span className="italic"> (Chưa kích hoạt gói dịch vụ)</span>
                                }
                            </div>
                        </div>
                        : <div>
                            <h6>Gói dịch vụ đang hoạt động</h6>
                            <>
                                {/* <label className='top'>Gói tuyển dụng gấp: {listJobService.homeTopQuantiy}</label>
                                <label className='in_day'>Gói tuyển dụng trong ngày: {listJobService.homeInDayQuantity}</label>
                                <label className='high_light'>Gói tìm kiếm nổi bật:  {listJobService.searchHighLightQuantity}</label> */}
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
                                                {eventJobDetail.priority.homeExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.homeExpiration, 1000)}</div> : <div>_</div> }
                                            </div>
                                        </div>
                                    </Col> :  null}
                                    {eventJobDetail.priority.searchPriority ? 
                                    <Col md={12}>
                                    <div className={eventJobDetail.priority.searchExpired ? "wapper-service-unactive" : "wapper-service"}>
                                            <div className="service">
                                                <div>Bộ tìm kiếm</div>
                                                {eventJobDetail.priority.searchPriority === TYPE.HIGHLIGHT ? <div className="bold-value">NỔI BẬT</div> : <div className="bold-value">_</div> }
                                            </div>
                                            <div className="service-center">
                                                {eventJobDetail.priority.searchExpired ? <div>Hết hạn</div> : <div>Hiệu lực</div>}
                                                {eventJobDetail.priority.searchTimeLeft ? <div className="bold-value">{eventJobDetail.priority.searchTimeLeft}</div> : null}
                                                {eventJobDetail.priority.searchExpiration < 0 && eventJobDetail.priority.searchPriority ? <div className="bold-value">VÔ HẠN</div> : null}
                                                {eventJobDetail.priority.searchExpiration < 0 && !eventJobDetail.priority.searchPriority ? <div className="bold-value">_</div> : null}
                                            </div>
                                            <div className="service">
                                                <div>Ngày hết hạn</div>
                                                {eventJobDetail.priority.searchExpiration > 0 ? <div className="bold-value">{timeConverter(eventJobDetail.priority.searchExpiration, 1000)}</div> : <div>_</div> }
                                            </div>
                                        </div>
                                    </Col> : null}
                                </Row>
                            </>
                            <hr />
                            <h6>Hãy chọn gói phù hợp cho bạn <Icon type="check" style={{ color: "green" }} /></h6>
                            <>
                                <IptLetterP
                                    style={{ margin: "15px 5px" }}
                                    value={`Nhóm gói tuyển dụng ở trang chủ${homeExpiration !== -1 && homeExpired ? "(Hết hạn)" : ""}`}
                                >
                                    <Radio.Group
                                        onChange={
                                            (event: any) => this.onChoseHomePriority(event.target.value)
                                        }
                                        value={homePriority}
                                        disabled={un_active_home_2}
                                    >
                                        <Radio value={TYPE.TOP}>Tuyển dụng gấp</Radio>
                                        <Radio value={TYPE.IN_DAY}>Tuyển dụng trong ngày</Radio>
                                    </Radio.Group>
                                    <Button
                                        icon="check"
                                        type={un_active_home_2 ? "ghost" : "primary"}
                                        style={{
                                            float: "right"
                                        }}
                                        disabled={un_active_home_2}
                                        onClick={() => {
                                            this.props.handleModal({
                                                msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                                typeModal: TYPE.JOB_FILTER.homePriority
                                            });
                                        }}
                                    >
                                        {un_active_home_2 ? "Đã kích hoạt" : " Kích hoạt"}
                                    </Button>
                                </IptLetterP>
                                <IptLetterP
                                    style={{ margin: "15px 5px" }}
                                    value={`Nhóm gói tuyển dụng tìm kiếm" ${searchExpiration !== -1 && searchExpired ? "(Hết hạn)" : ""}`}
                                >
                                    <Radio.Group onChange={
                                        (event: any) => this.onChoseSearchPriority(event.target.value)}
                                        value={searchPriority}
                                        disabled={un_active_search}
                                    >
                                        <Radio value={TYPE.HIGHLIGHT}>Tìm kiếm nổi bật</Radio>
                                    </Radio.Group>
                                    <Button
                                        type={un_active_search ? "ghost" : "primary"}
                                        icon="check"
                                        style={{
                                            float: "right"
                                        }}
                                        disabled={un_active_search}
                                        onClick={() => {
                                            this.props.handleModal({
                                                msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                                typeModal: TYPE.JOB_FILTER.searchPriority
                                            });
                                        }}
                                    >
                                        {un_active_search ? "Đã kích hoạt" : " Kích hoạt"}
                                    </Button>
                                </IptLetterP>
                            </>
                            <div style={{
                                marginTop: "30px",
                                textAlign: "center",
                            }}
                            >
                                {
                                    (!homeExpired && homeExpiration !== -1) ||
                                        (!searchExpired && homeExpiration !== -1) ?
                                        <span className="italic">(Đang kích hoạt gói dịch vụ)</span> :
                                        <span className="italic"> (Chưa kích hoạt gói dịch vụ)</span>
                                }
                            </div>

                        </div>}
                    <hr />
                    <Row>
                        <Col md={12}>
                            <div className="test" style={{ padding: "10px 15px" }}>
                                <h6><Icon type="home" theme={"filled"} /> Gói dịch vụ ưu tiên trang chủ</h6>
                                <div>
                                    Hiển thị bài đăng ở danh sách việc tuyển gấp trên trang chủ sự kiện,
                                    tăng lượt view, click.
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="test" style={{ padding: "10px 15px" }}>
                                <h6><Icon type="star" theme={"filled"} /> Gói tiêu đề nổi bật</h6>
                                <div>
                                    Làm nổi bật tiêu đề bài đăng, tăng tương tác( kích thích thị hiểu người dùng xem)
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ padding: "40px 10px 20px ", width: "100%" }}>
                        <Button
                            type="danger"
                            style={{
                                float: "left"
                            }}
                            onClick={() => this.onCancelRegisterBenefit()}
                        >
                            Đóng
                        </Button>
                    </div>
                </DrawerConfig>
                <div className="common-content">
                    <h5 className="TitleJob">
                        {expiredJob === 'true' ? `Việc làm hết hạn (${totalItems})` : `Việc làm hoạt động (${totalItems})`}
                    </h5>
                    {/* <Tooltip title="Lọc tìm kiếm" >
                            <Button
                                onClick={() => this.searchEventJobs()}
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 10px",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px"
                                }}
                                icon={loadingTable ? "loading" : "filter"}
                            />
                        </Tooltip> */}
                    {/* <Link to={routeLink.EVENT + routePath.JOBS + routePath.CREATE + `?eid=${eid}`} >
                            <Tooltip title="Tạo bài đăng mới" >
                                <Button
                                    type="primary"
                                    style={{
                                        float: "right",
                                        margin: "0px 10px",
                                        padding: "10px",
                                        borderRadius: "50%",
                                        height: "45px",
                                        width: "45px"
                                    }}
                                    icon={"plus"}
                                />
                            </Tooltip>
                        </Link> */}
                    {/* </h5> */}
                    <div className="table-operations">
                        <Row style={{ marginBottom: 10 }}>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Nhóm"} className="titleFilter" />
                                <Select
                                    showSearch
                                    defaultValue="Tuyển dụng thường"
                                    style={{ width: "100%" }}
                                    optionFilterProp="label"
                                    filterOption={this.searchWithUnicodeLabel}
                                    onChange={(event: any) => this.onChangeType(event, 'schoolEventID')}
                                    allowClear
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
                                    filterOption={this.searchWithUnicode}
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
                                    filterOption={this.searchWithUnicode}
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
                            {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Loại công việc"} className="titleFilter"/>
                                <Select
                                    showSearch
                                    placeholder="Tất cả"
                                    defaultValue="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobType)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.FULLTIME}>Toàn thời gian</Option>
                                    <Option value={TYPE.PARTTIME}>Bán thời gian</Option>
                                    <Option value={TYPE.INTERNSHIP}>Thực tập sinh</Option>
                                </Select>
                            </Col> */}
                            {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Gói dịch vụ"} />
                                <Cascader
                                    placeholder="Không chọn gói"
                                    style={{ width: "100%" }}
                                    options={this.options}
                                    onChange={
                                        (event: any) => {
                                            if (event.length === 0) {
                                                body.homePriority = null;
                                                body.searchPriority = null;
                                                this.setState({ body });
                                            } else this.onChangeType(event[1], event[0]);
                                        }
                                    }
                                />
                            </Col> */}
                            {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Hạn đang bài"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    placeholder="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.expired)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.FALSE}>Còn hạn</Option>
                                    <Option value={TYPE.TRUE}>Hết hạn</Option>
                                </Select>
                            </Col> */}
                            {/* <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Trạng thái ẩn/hiện"} />
                                <Select
                                    showSearch
                                    placeholder="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.hidden)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đang ẩn</Option>
                                    <Option value={TYPE.FALSE}>Đang hiện</Option>
                                </Select>
                            </Col> */}
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
    setEventJobDetail: (data) => dispatch({ type: REDUX.EVENT_SCHOOLS.GET_EVENT_JOB_DETAIL, data })
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