import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Cascader, Checkbox, Tooltip, Radio, Modal, message } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../utils/convertTime';
import './EventJobsList.scss';
import { TYPE } from '../../../../../../const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../models/job-names';
import { IEmBranch } from '../../../../../../models/em-branches';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IEventJobDetail } from '../../../../../../models/event-job-detail';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, DELETE, PUT } from '../../../../../../const/method';
import { EVENT_SCHOOLS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IModalState } from '../../../../../../models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import JobSuitableCandidate from '../../../../layout/job-suitable-candidate/JobSuitableCandidate';
import JobDetail from '../../../../layout/job-detail/JobDetail';
import { IEventJobsFilter, IEventJob } from '../../../../../../models/event-jobs';

let { Option } = Select;
let CheckboxGroup = Checkbox.Group;
const plainOptions = ['Đang chờ', 'Từ chối', 'Chấp nhận'];

const viewCount = (id?: string | number, count?: string | number, color?: "red" | "#1687f2" | "orange", state?: string, icon?: "user" | "user-delete" | "user-add") => (
    <div
        className="n-candidate"
        style={{
            pointerEvents: count === 0 ? 'none' : undefined
        }}
    >
        <Tooltip title="Xem chi tiết">
            <Link
                to={routeLink.EVENT + routePath.APPLY + `/${id}?state=${state}`}
                disabled={count === 0 ? true : false}
                target="_blank"
            >
                <div style={{ color }}>
                    {count} <Icon type={icon} />
                </div>
            </Link>
        </Tooltip>
    </div>
);

const ViewPriority = (props?: { priority?: string, timeLeft?: string }) => {
    let { priority } = props;
    switch (priority) {
        case TYPE.TOP:
            return (
                <Tooltip title={"Gói tuyển dụng gấp"} placement="left">
                    <div className='top f-sm'>
                        ({props.timeLeft})
                    </div>
                </Tooltip>
            );
        case TYPE.HIGHLIGHT:
            return (
                <Tooltip title={"Gói tìm kiếm nổi bật"} placement="left">
                    <div className='high_light f-sm'>
                        ({props.timeLeft})
                    </div>
                </Tooltip>
            );
        // case TYPE.IN_DAY:
        //     return (
        //         <Tooltip title={"Gói tuyển dụng trong ngày"} placement="left">
        //             <div className='in_day f-sm'>
        //                 ({props.timeLeft})
        //             </div>
        //         </Tooltip>
        //     );
        default:
            return <span></span>
    }

}

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
};

interface IEventJobsListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    employerID?: string;
    target?: string;
    jobNameID?: string;
    jobId?: string;
    show_modal?: boolean;
    loading?: boolean;
    message?: string;
    listEmBranches?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    listEventJobs?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body?: IEventJobsFilter;
    un_checkbox?: boolean;
    list_check?: Array<any>;
    state_check_box?: Array<string>;
    open_drawer?: boolean;
    homePriority?: string;
    searchPriority?: string;
    homeExpired: boolean;
    searchExpired: boolean;
    eventJobDetail: IEventJobDetail;
    type_modal: string;
    ojd?: boolean;
    jid?: string;
    eid?: string;
};


class EventJobsList extends PureComponent<IEventJobsListProps, IEventJobsListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            employerID: null,
            jobNameID: null,
            jobId: null,
            show_modal: false,
            loading: false,
            message: null,
            listEmBranches: [],
            value_type: null,
            announcementTypeID: null,
            createdDate: null,
            adminID: null,
            hidden: false,
            listEventJobs: [],
            id: null,
            loading_table: true,
            body: {
                schoolEventID: null,
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
            },

            un_checkbox: false,
            list_check: [],
            homePriority: null,
            searchPriority: null,
            homeExpired: false,
            searchExpired: false,
            eventJobDetail: null,
            type_modal: null,
            ojd: false,
            jid: null,
            eid: null,
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
            width: 150,
            dataIndex: 'title',
            key: 'jobTitle',
        },

        {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            key: 'jobName',
            width: 200,
        },
        {
            title: 'Đang chờ',
            dataIndex: 'pendingApplied',
            className: 'action',
            key: 'pendingApplied',
            width: 100,
        },
        {
            title: 'Đã chấp nhận',
            dataIndex: 'acceptedApplied',
            className: 'action',
            key: 'acceptedApplied',
            width: 100,
        },
        {
            title: 'Từ chối',
            dataIndex: 'rejectedApplied',
            className: 'action',
            key: 'rejectedApplied',
            width: 100,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'employerBranchName',
            key: 'employerBranchName',
            width: 200,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'hidden',
            className: 'action',
            key: 'hidden',
            width: 120,
        },
        {
            title: 'Loại công việc',
            dataIndex: 'jobType',
            className: 'action',
            key: 'jobType',
            width: 110,
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 100,
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expirationDate',
            className: 'action',
            key: 'expirationDate',
            width: 100,
        },

        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'priority',
            className: 'action',
            key: 'priority',
            width: 190,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            dataIndex: 'operation',
            render: ({ hidden, id }) => this.EditToolTip(hidden, id),
            width: 200,
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
            value: TYPE.JOB_FILTER.searchPriority,
            label: 'Tìm kiếm',
            children: [
                {
                    value: TYPE.HIGHLIGHT,
                    label: 'Nổi bật',
                },
            ],
        },
    ];

    onToggleModal = () => {
        let { show_modal } = this.state;
        this.setState({ show_modal: !show_modal });
    };

    EditToolTip = (hidden?: boolean, id?: string) => {
        let { body, pageIndex, pageSize } = this.state;
        return (
            <>
                <Tooltip placement="topLeft" title={hidden ? "Hiện bài đăng" : "Ẩn bài đăng"}>
                    <Icon
                        className='test'
                        type={hidden ? "eye-invisible" : "eye"}
                        style={{ padding: "5px 5px", color: hidden ? "black" : "gray", margin: 2 }}
                        onClick={async () => await _requestToServer(
                            PUT,
                            EVENT_SCHOOLS + `/${id}/hidden/${!hidden}?schoolEventID=${body.schoolEventID}`,
                            undefined,
                            undefined,
                            undefined,
                            EMPLOYER_HOST,
                            false,
                            false
                        ).then((res: any) => {
                            if (res) {
                                setTimeout(() => {
                                    this.props.getListEventJobs(body, pageIndex, pageSize);
                                }, 250);
                                message.success("Thành công", 2);
                            }
                        })}
                    />
                </Tooltip>
                <Tooltip placement="topRight" title={"Kích hoạt gói dịch vụ"}>
                    <Icon
                        className='test'
                        type="dollar"
                        style={{ padding: "5px 5px", color: "orange", margin: 2 }}
                        onClick={async () => {
                            await this.props.handleDrawer();
                            await setTimeout(() => { this.props.getEventJobDetail(id, body.schoolEventID) }, 250)
                        }} />
                </Tooltip>
                <Tooltip placement="top" title={"Xem chi tiết(sửa)"}>
                    <Link
                        to={
                            routeLink.EVENT +
                            routePath.JOBS +
                            routePath.FIX +
                            `/${id}?eid=${body.schoolEventID}`
                        }
                        target="_blank"
                    >
                        <Icon
                            className='test'
                            style={{ padding: "5px 5px", margin: 2 }}
                            type="edit"
                            theme="twoTone"
                            twoToneColor="green"
                        />
                    </Link>
                </Tooltip>
                <Tooltip placement="top" title={"Đăng bài tương tự"}>
                    <Link
                        to={
                            routeLink.EVENT +
                            routePath.JOBS +
                            routePath.COPY +
                            `/${id}?eid=${body.schoolEventID}`
                        } target="_blank">
                        <Icon
                            className='test'
                            style={{ padding: "5px 5px", margin: 2 }}
                            type="copy"
                            theme="twoTone"
                        />
                    </Link>
                </Tooltip>
                {/* <Tooltip placement="topRight" title={"Xem ứng viên tương thích"}>
                    <Icon
                        className='test'
                        style={{ padding: "5px 5px", margin: 2 }}
                        type="solution"
                        twoToneColor="purple"
                        onClick={async () => {
                            this.setState({ ojd: true });
                            setTimeout(() => {
                                this.props.getListJobSuitableCandidate(id, 0, 10);
                                this.props.getEventJobDetail(id);
                                this.setState({ jid: id })
                            }, 300);
                        }}
                    />
                </Tooltip> */}
                <Tooltip placement="topRight" title={"Xóa bài đăng"}>
                    <Icon
                        className='test'
                        style={{ padding: "5px 5px", margin: 2 }}
                        type="delete"
                        theme="twoTone"
                        twoToneColor="red"
                        onClick={() => this.props.handleModal({ msg: "Bạn muốn xóa bài đăng này", type_modal: TYPE.DELETE })}
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
            let { pageIndex, pageSize, eid } = prevState;
            let data_table = [];
            let url_string = window.location.href;
            let url = new URL(url_string);
            let id = url.searchParams.get("id");
            let body = prevState.body;
            body.schoolEventID = id;
            eid = id;
            nextProps.getJobServiceEvent(eid);

            nextProps.listEventJobs.forEach((item: IEventJob, index: number) => {
                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    title: item.jobTitle,
                    jobName: item.jobName ? item.jobName.name : "",
                    jobType: item.jobType,
                    employerBranchName: item.employerBranchName ? item.employerBranchName : "",
                    createdDate: timeConverter(item.createdDate, 1000),
                    expirationDate: timeConverter(item.expirationDate, 1000),
                    acceptedApplied: viewCount(item.id, item.acceptedApplied, "#1687f2", TYPE.ACCEPTED, "user-add"),
                    rejectedApplied: viewCount(item.id, item.rejectedApplied, "red", TYPE.REJECTED, "user-delete"),
                    pendingApplied: viewCount(item.id, item.pendingApplied, "orange", TYPE.PENDING, "user"),
                    hidden: `${!item.hidden ? "Hiện" : "Ẩn"}, ${!item.expired ? "Còn hạn" : "Hết hạn"}`,
                    priority:
                        <>
                            <ViewPriority priority={item.priority.homePriority} timeLeft={item.priority.homeTimeLeft} />
                            <ViewPriority priority={item.priority.searchPriority} timeLeft={item.priority.searchTimeLeft} />
                        </>,
                    operation: { hidden: item.hidden, id: item.id }
                });
            })

            return {
                listEventJobs: nextProps.listEventJobs,
                data_table,
                loading_table: false,
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
                searchPriority: eventJobDetail.priority.searchPriority,
                homeExpired: eventJobDetail.priority.homeExpired,
                searchExpired: eventJobDetail.priority.searchExpired,
                eventJobDetail
            }
        }

        return null;
    };

    async componentDidMount() {
        await this.props.getListEmBranches();
        await this.searchEventJobs();
    };

    onChoseHomePriority = (event: any) => {
        this.setState({ homePriority: event });
    };

    onChoseSearchPriority = (event: any) => {
        this.setState({ searchPriority: event });
    };

    onCancelRegisterBenefit = () => {
        this.props.handleDrawer();
        this.setState({
            homePriority: null,
            searchPriority: null
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

        this.setState({ body });
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchEventJobs();
    };

    searchEventJobs = async () => {
        let { body, pageIndex, pageSize } = this.state;
        await this.props.getListEventJobs(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { listEmBranches } = this.props;
        let value: any = event;
        switch (param) {
            case TYPE.JOB_FILTER.jobNameIDs:
                value = [value];
                break;
            case TYPE.JOB_FILTER.jobLocationFilter:
                if (value) {
                    let data = listEmBranches.filter((item: IEmBranch, index: number) => { return item.id === event });
                    value = { distance: 1, lat: data[0].lat, lon: data[0].lon }
                }
                break;
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
        this.setState({ body });
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
        let { homePriority, searchPriority, id, body } = this.state;
        let { modalState } = this.props;
        await this.setState({ loading: true });
        switch (modalState.type_modal) {
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

            case TYPE.JOB_FILTER.searchPriority:
                await _requestToServer(
                    POST,
                    EVENT_SCHOOLS + `/${body.schoolEventID + routePath.JOBS}/${id}/priority/search`,
                    { searchPriority },
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
                    EVENT_SCHOOLS + `/${id}?schoolEventID=${body.schoolEventID}`,
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
    }

    requeryData = async () => {
        let { id, body, eid } = this.state;
        await this.searchEventJobs();
        await this.props.getJobServiceEvent(eid);
        await this.props.getEventJobDetail(id, body.schoolEventID);
        await this.props.handleModal();
    }

    render() {
        let {
            data_table,
            value_type,
            loading_table,
            un_checkbox,
            list_check,
            homePriority,
            // searchPriority,
            homeExpired,
            searchExpired,
            body,
            loading,
            ojd,
            jid
        } = this.state;

        let {
            eventJobDetail,
            totalItems,
            list_job_names,
            listEmBranches,
            jobServiceEvent,
            modalState,
            jobSuitableCandidates,
        } = this.props;

        let homeExpiration = eventJobDetail.priority.homeExpiration;
        // let searchExpiration = eventJobDetail.priority.searchExpiration;
        let un_active_home = homeExpiration !== -1 && !homeExpired;
        // let un_active_search = searchExpiration !== -1 && !searchExpired;

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
                            children="Hủy"
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
                            type={modalState.type_modal === TYPE.DELETE ? "danger" : "primary"}
                            icon={modalState.type_modal === TYPE.DELETE ? "delete" : "check"}
                            loading={loading}
                            children={modalState.type_modal === TYPE.DELETE ? "Xóa" : "Xác nhận"}
                            onClick={async () => this.createRequest()}
                        />
                    ]}
                    children={modalState.msg}
                />
                <Modal
                    visible={ojd}
                    title={"CHI TIẾT CÔNG VIỆC"}
                    destroyOnClose={true}
                    onOk={this.createRequest}
                    width={'80vw'}
                    onCancel={() => {
                        this.setState({ ojd: false, loading: false });
                    }}
                    footer={[
                        <Button
                            key="cancel"
                            children="Hủy"
                            onClick={() => {
                                this.setState({
                                    ojd: false,
                                });
                            }}
                        />
                    ]}
                >
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
                                    employerBranch: eventJobDetail.employerBranchName
                                }}
                            />
                        </Col>
                        <Col span={10}>
                            <h6>ỨNG VIÊN THÍCH HỢP</h6>
                            <JobSuitableCandidate
                                job_suitable_candidates={jobSuitableCandidates.items}
                                pageIndex={jobSuitableCandidates.pageIndex}
                                pageSize={jobSuitableCandidates.pageSize}
                                totalItems={jobSuitableCandidates.totalItems}
                                onGetListJobSuitableCandidate={(pageIndex, pageSize) => this.props.getListJobSuitableCandidate(jid, pageIndex, pageSize)}
                            />
                        </Col>
                    </Row>
                </ Modal>
                <DrawerConfig
                    title={"Kích hoạt gói dịch vụ tuyển dụng"}
                    width={800}
                >
                    <h6>Các gói của bạn</h6>
                    <>
                        <label className='top'>Gói tuyển dụng gấp: {jobServiceEvent.homeTopQuantiy}</label>
                        <label className='in_day'>Gói tuyển dụng trong ngày: {jobServiceEvent.homeInDayQuantity}</label>
                        {/* <label className='high_light'>Gói tìm kiếm nổi bật:  {jobServiceEvent.searchHighLightQuantity}</label> */}
                    </>
                    <hr />
                    <h6>Hãy chọn gói phù hợp cho bạn <Icon type="check" style={{ color: "green" }} /></h6>
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
                                <Radio value={TYPE.IN_DAY}>Tuyển dụng trong ngày</Radio>
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
                                        msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                        type_modal: TYPE.JOB_FILTER.homePriority
                                    });
                                }}
                            >
                                Kích hoạt
                            </Button>
                        </IptLetterP>
                        {/* <IptLetterP
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
                                            type_modal: TYPE.JOB_FILTER.searchPriority
                                        });
                                    }}
                                >
                                    Kích hoạt
                            </Button>
                            </IptLetterP> */}
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
                    <hr />
                    <div style={{ padding: "40px 10px 20px ", width: "100%" }}>
                        <Button
                            icon="close"
                            type="dashed"
                            style={{
                                float: "left"
                            }}
                            onClick={() => this.onCancelRegisterBenefit()}
                        >
                            Hủy bỏ thay đổi
                        </Button>
                    </div>
                </DrawerConfig>
                <div className="common-content">
                    <h5>
                        Quản lý bài đăng sự kiện nhà trường {`(${totalItems})`}
                        <Tooltip title="Tìm kiếm" >
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
                                icon={loading_table ? "loading" : "search"}
                            />
                        </Tooltip>
                        <Link to={routeLink.EVENT + routePath.JOBS + routePath.CREATE} >
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
                        </Link>
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Trạng thái hoạt động"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.expired)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.FALSE}>Còn hạn</Option>
                                    <Option value={TYPE.TRUE}>Hết hạn</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tên việc đăng tuyển"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobNameIDs)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    {
                                        list_job_names &&
                                        list_job_names.map(
                                            (item: IJobName, index: number) => <Option key={index} value={item.id}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Chi nhánh"} />
                                <Select
                                    showSearch
                                    placeholder="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobLocationFilter)}
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
                                <IptLetterP value={"Loại công việc"} />
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
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
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
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
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
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Trạng thái ẩn/hiện"} />
                                <Select
                                    showSearch
                                    placeholder="Tất cả"
                                    defaultValue="Tất cả"
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    value={value_type}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.hidden)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đang ẩn</Option>
                                    <Option value={TYPE.FALSE}>Đang hiện</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Chứa trạng thái ứng tuyển"} />
                                <Checkbox
                                    indeterminate={un_checkbox}
                                    onChange={
                                        (event: any) => {
                                            this.handleCheckBox(event.target.checked);
                                            this.setState({ un_checkbox: event.target.checked })
                                        }
                                    }
                                >
                                    Bất kì
                                </Checkbox>
                                <hr />
                                <CheckboxGroup
                                    options={plainOptions}
                                    value={list_check}
                                    onChange={
                                        (event: any) => {
                                            this.handleCheckBox(event);
                                            this.setState({ list_check: event })
                                        }
                                    }
                                    disabled={un_checkbox}
                                />
                            </Col>
                        </Row>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 1850 }}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
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
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listEventJobs: state.EventJobs.items,
    list_job_names: state.JobNames.items,
    listEmBranches: state.EmBranches.items,
    jobServiceEvent: state.JobServiceEvent,
    modalState: state.MutilBox.modalState,
    drawerState: state.MutilBox.drawerState,
    totalItems: state.EventJobs.totalItems,
    jobSuitableCandidates: state.JobSuitableCandidates,
    eventJobDetail: state.EventJobDetail
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventJobsList);