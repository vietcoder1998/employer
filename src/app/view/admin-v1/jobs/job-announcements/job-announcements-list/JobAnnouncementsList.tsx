import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Cascader, Checkbox, Tooltip, Radio, Modal, message, Tabs } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../utils/convertTime';
import './JobAnnouncementsList.scss';
import { TYPE } from '../../../../../../const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IJobAnnouncementsFilter, IJobAnnouncement } from '../../../../../../models/job-announcements';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../models/job-names';
import { IEmBranch } from '../../../../../../models/em-branches';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IJobAnnouncementDetail } from '../../../../../../models/job-annoucement-detail';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, DELETE, PUT } from '../../../../../../const/method';
import { JOB_PRIORITY_HOME, JOB_ANNOUNCEMENTS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IModalState } from '../../../../../../models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import JobSuitableCandidate from '../../../../layout/job-suitable-candidate/JobSuitableCandidate';
import JobDetail from '../../../../layout/job-detail/JobDetail';
import { IJobSuitableCandidate } from '../../../../../../models/job-suitable-candidate';

const { Option } = Select;
const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;
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
                to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${id}?state=${state}`}
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
                        {props.timeLeft}
                    </div>
                </Tooltip>
            );
        case TYPE.HIGHLIGHT:
            return (
                <Tooltip title={"Gói tìm kiếm nổi bật"} placement="left">
                    <div className='high_light f-sm'>
                        {props.timeLeft}
                    </div>
                </Tooltip>
            );
        case TYPE.IN_DAY:
            return (
                <Tooltip title={"Gói tuyển dụng trong ngày"} placement="left">
                    <div className='in_day f-sm'>
                        {props.timeLeft}
                    </div>
                </Tooltip>
            );
        default:
            return <span></span>
    }

}

interface IJobAnnouncementsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListJobAnnouncements: Function;
    getListEmBranches: Function;
    getTypeManagement: Function;
    getJobAnnouncementDetail: (id?: string) => any;
    getListJobService: Function;
    handleDrawer: Function;
    handleModal: Function;
    getListJobSuitableCandidate: Function;
    setListJobSuitableCandidate: Function;
};

interface IJobAnnouncementsListState {
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
    listJobAnnouncements?: Array<any>;
    id?: string;
    loadingTable?: boolean;
    body?: IJobAnnouncementsFilter;
    unCheckbox?: boolean;
    listCheck?: Array<any>;
    stateCheckbox?: Array<string>;
    openDrawer?: boolean;
    homePriority?: string;
    searchPriority?: string;
    homeExpired: boolean;
    searchExpired: boolean;
    jobAnnouncementDetail: IJobAnnouncementDetail;
    typeModal: string;
    ojd?: boolean;
    jid?: string;
    profileType?: string,
    loadingApply: boolean;
};


class JobAnnouncementsList extends PureComponent<IJobAnnouncementsListProps, IJobAnnouncementsListState> {
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
            listJobAnnouncements: [],
            id: null,
            loadingTable: true,
            body: {
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
            profileType: TYPE.CANDIDATE,
            unCheckbox: false,
            listCheck: [],
            homePriority: null,
            searchPriority: null,
            homeExpired: false,
            searchExpired: false,
            jobAnnouncementDetail: null,
            typeModal: null,
            ojd: false,
            jid: null,
            loadingApply: false,
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
            width: 200,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left'
        },

        {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            className: 'action',
            key: 'jobName',
            width: 160,
        },
        {
            title: 'Đang chờ',
            dataIndex: 'pendingApplied',
            className: 'action',
            key: 'pendingApplied',
            width: 100,
        },
        {
            title: 'Chấp nhận',
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
            width: 100,
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
            width: 120,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            dataIndex: 'operation',
            render: ({ hidden, id }) => this.EditToolTip(hidden, id),
            width: 120,
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
        let { showModal } = this.state;
        if (showModal) {
            this.props.setListJobSuitableCandidate({ pageIndex: 0, pageSize: 0, totalItems: 0, items: [] })
        }
        this.setState({ showModal: !showModal });
    };

    onChangeApplyType = async (key) => {
        let { jid } = this.state;
        this.setState({ profileType: key, loadingApply: true });
        this.props.setListJobSuitableCandidate({ pageIndex: 0, pageSize: 0, totalItems: 0, items: [] })
        this.props.getListJobSuitableCandidate(jid, 0, 10, key);
        setTimeout(() => {
            this.setState({ loadingApply: false })
        }, 250);
    }

    EditToolTip = (hidden?: boolean, id?: string) => {
        let { body, pageIndex, pageSize, profileType } = this.state;
        return (
            <>
                <Tooltip placement="topLeft" title={hidden ? "Hiện bài đăng" : "Ẩn bài đăng"}>
                    <Icon
                        className="f-ic"
                        type={hidden ? "eye-invisible" : "eye"}
                        style={{ color: hidden ? "black" : "gray" }}
                        onClick={async () => await _requestToServer(
                            PUT,
                            JOB_ANNOUNCEMENTS + `/${id}/hidden/${!hidden}`,
                            undefined,
                            undefined,
                            undefined,
                            EMPLOYER_HOST,
                            false,
                            false
                        ).then((res: any) => {
                            if (res) {
                                setTimeout(() => {
                                    this.props.getListJobAnnouncements(body, pageIndex, pageSize);
                                }, 250);
                                message.success("Thành công", 2);
                            }
                        })}
                    />
                </Tooltip>
                <Tooltip placement="topRight" title={"Kích hoạt gói dịch vụ"}>
                    <Icon
                        className="f-ic"
                        type="dollar"
                        style={{ color: "orange" }}
                        onClick={async () => {
                            await this.props.handleDrawer();
                            await setTimeout(() => { this.props.getJobAnnouncementDetail(id) }, 250)
                        }} />
                </Tooltip>
                <Tooltip placement="top" title={"Xem chi tiết(sửa)"}>
                    <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${id}`} target="_blank">
                        <Icon
                            className="f-ic"
                            type="edit"
                            theme="twoTone"
                            twoToneColor="green"
                        />
                    </Link>
                </Tooltip>
                <Tooltip placement="top" title={"Đăng bài tương tự"}>
                    <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.COPY + `/${id}`}>
                        <Icon
                            className="f-ic"
                            type="copy"
                            theme="twoTone"
                        />
                    </Link>
                </Tooltip>
                <Tooltip placement="topRight" title={"Xem tương thích"}>
                    <Icon
                        className="f-ic"
                        type="solution"
                        twoToneColor="purple"
                        onClick={async () => {
                            this.setState({ ojd: true });
                            setTimeout(() => {
                                this.props.getListJobSuitableCandidate(id, 0, 10, profileType);
                                this.props.getJobAnnouncementDetail(id);
                                this.props.history.push(`?id=${id}`)
                                this.setState({ jid: id })
                            }, 300);
                        }}
                    />
                </Tooltip>
                <Tooltip placement="topRight" title={"Xóa bài đăng"}>
                    <Icon
                        className="f-ic"
                        type="delete"
                        theme="twoTone"
                        twoToneColor="red"
                        onClick={() => this.props.handleModal({ msg: "Bạn chắc chắn muốn  xóa bài đăng này ?", typeModal: TYPE.DELETE })}
                    />
                </Tooltip>
            </>
        )
    }

    static getDerivedStateFromProps(nextProps: IJobAnnouncementsListProps, prevState: IJobAnnouncementsListState) {
        if (
            nextProps.listJobAnnouncements &&
            nextProps.listJobAnnouncements !== prevState.listJobAnnouncements
        ) {
            let { pageIndex, pageSize } = prevState;
            let dataTable = [];

            nextProps.listJobAnnouncements.forEach((item: IJobAnnouncement, index: number) => {
                dataTable.push({
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
                listJobAnnouncements: nextProps.listJobAnnouncements,
                dataTable,
                loadingTable: false,
            }
        }

        if (
            nextProps.jobAnnouncementDetail &&
            nextProps.jobAnnouncementDetail !== prevState.jobAnnouncementDetail
        ) {
            let { jobAnnouncementDetail } = nextProps;
            return {
                homePriority: jobAnnouncementDetail.priority.homePriority,
                searchPriority: jobAnnouncementDetail.priority.searchPriority,
                homeExpired: jobAnnouncementDetail.priority.homeExpired,
                searchExpired: jobAnnouncementDetail.priority.searchExpired,
                jobAnnouncementDetail
            }
        }

        return null;
    };

    async componentDidMount() {
        await this.props.getListEmBranches();
        await this.searchJobAnnouncement();
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
        await this.setState({ pageIndex: event.current - 1, loadingTable: true, pageSize: event.pageSize });
        await this.searchJobAnnouncement();
    };

    searchJobAnnouncement = async () => {
        let { body, pageIndex, pageSize } = this.state;
        await this.props.getListJobAnnouncements(body, pageIndex, pageSize);
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
        let { homePriority, searchPriority, id } = this.state;
        let { modalState } = this.props;
        await this.setState({ loading: true });
        switch (modalState.typeModal) {
            case TYPE.JOB_FILTER.homePriority:
                await _requestToServer(
                    POST,
                    JOB_PRIORITY_HOME + `/${id}/priority/home`,
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
                    JOB_PRIORITY_HOME + `/${id}/priority/search`,
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
                    JOB_ANNOUNCEMENTS + `/${id}`,
                    undefined,
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false
                ).then((res) => {
                    if (res) {
                        this.searchJobAnnouncement();
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
        let { id } = this.state;
        await this.searchJobAnnouncement();
        await this.props.getListJobService();
        await this.props.getJobAnnouncementDetail(id);
        await this.props.handleModal();
    }

    render() {
        let {
            dataTable,
            loadingTable,
            unCheckbox,
            listCheck,
            homePriority,
            searchPriority,
            homeExpired,
            searchExpired,
            body,
            loading,
            ojd,
            jid,
            profileType,
            loadingApply,
        } = this.state;

        let {
            jobAnnouncementDetail,
            totalItems,
            listJobNames,
            listEmBranches,
            listJobService,
            modalState,
            jobDetail,
            jobSuitableCandidates,
        } = this.props;

        let homeExpiration = jobAnnouncementDetail.priority.homeExpiration;
        let searchExpiration = jobAnnouncementDetail.priority.searchExpiration;
        let un_active_home = homeExpiration !== -1 && !homeExpired;
        let un_active_search = searchExpiration !== -1 && !searchExpired;

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
                    title={<div style={{ textTransform: "uppercase" }}>{jobDetail.jobTitle}</div>}
                    onOk={this.createRequest}
                    width={'80vw'}
                    onCancel={() => {
                        this.setState({ ojd: false, loading: false });
                    }}
                    footer={[
                        <Button
                            key="cancel"
                            children="Đóng"
                            type={"danger"}
                            onClick={() => {
                                this.setState({
                                    ojd: false,
                                    profileType: TYPE.CANDIDATE
                                });
                            }}
                        />
                    ]}
                >
                    <Row>
                        <Col span={14} >
                            <JobDetail
                                ns={true}
                                jobDetail={{
                                    jobName: jobDetail.jobName ? jobDetail.jobName.name : "",
                                    jobTitle: jobDetail.jobTitle,
                                    employerName: jobDetail.employerName,
                                    employerUrl: jobDetail.employerLogoUrl,
                                    expriratedDate: jobDetail.expirationDate,
                                    jobType: jobDetail.jobType,
                                    shifts: jobDetail.shifts,
                                    description: jobDetail.description,
                                    createdDate: jobDetail.createdDate,
                                    employerBranch: jobDetail.employerBranchName,
                                    requiredSkills: jobDetail.requiredSkills
                                }}
                            />
                        </Col>
                        <Col span={10} className="b_l">
                            <Tabs onChange={(event) => this.onChangeApplyType(event)} >
                                <TabPane tab={"Ứng viên tương thích"} key={TYPE.CANDIDATE} />
                                <TabPane tab={"Sinh viên tương thích"} key={TYPE.STUDENT} />
                            </Tabs>
                            <JobSuitableCandidate
                                profileType={profileType}
                                loading={loadingApply}
                                jobSuitableCandidates={jobSuitableCandidates.items}
                                pageIndex={jobSuitableCandidates.pageIndex}
                                pageSize={jobSuitableCandidates.pageSize}
                                totalItems={jobSuitableCandidates.totalItems}
                                onGetListJobSuitableCandidate={(pageIndex, pageSize) => this.props.getListJobSuitableCandidate(jid, pageIndex, pageSize, profileType)}
                            />

                        </Col>
                    </Row>
                </ Modal>
                <>
                    <DrawerConfig
                        title={"Kích hoạt gói dịch vụ tuyển dụng"}
                        width={800}
                    >
                        <h6>Các gói của bạn</h6>
                        <>
                            <label className='top'>Gói tuyển dụng gấp: {listJobService.homeTopQuantiy}</label>
                            <label className='in_day'>Gói tuyển dụng trong ngày: {listJobService.homeInDayQuantity}</label>
                            <label className='high_light'>Gói tìm kiếm nổi bật:  {listJobService.searchHighLightQuantity}</label>
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
                                            typeModal: TYPE.JOB_FILTER.homePriority
                                        });
                                    }}
                                >
                                    {un_active_home ? "Đã kích hoạt" : " Kích hoạt"}
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
                                    <h6><Icon type="star" theme={"filled"} /> Gói tìm kiếm nổi bật</h6>
                                    <div>
                                        Tăng số lần người dùng nhìn thấy bài đăng khi tìm kiếm.
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
                        <h5>
                            Quản lý bài đăng {`(${totalItems})`}
                            <Tooltip title="Lọc tìm kiếm" >
                                <Button
                                    onClick={() => this.searchJobAnnouncement()}
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
                            </Tooltip>
                            <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE} >
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
                                            listJobNames &&
                                            listJobNames.map(
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
                                        optionFilterProp="children"
                                        style={{ width: "100%" }}
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
                                        indeterminate={unCheckbox}
                                        onChange={
                                            (event: any) => {
                                                this.handleCheckBox(event.target.checked);
                                                this.setState({ unCheckbox: event.target.checked })
                                            }
                                        }
                                    >
                                        Bất kì
                                </Checkbox>
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
                                </Col>
                            </Row>
                            <Table
                                // @ts-ignore
                                columns={this.columns}
                                loading={loadingTable}
                                dataSource={dataTable}
                                scroll={{ x: 1540 }}
                                bordered
                                rowKey={"job"}
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
            </>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListJobAnnouncements: (body: IJobAnnouncementsFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENTS.GET_JOB_ANNOUNCEMENTS, body, pageIndex, pageSize }),
    getListEmBranches: () =>
        dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
    handleDrawer: (drawerState?: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
    handleModal: (modalState?: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    getJobAnnouncementDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENT_DETAIL.GET_JOB_ANNOUNCEMENT_DETAIL, id }),
    getListJobService: () => dispatch({ type: REDUX_SAGA.JOB_SERVICE.GET_JOB_SERVICE }),
    getListJobSuitableCandidate: (jid?: string, pageIndex?: number, pageSize?: number, profileType?: string) =>
        dispatch({ type: REDUX_SAGA.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE, jid, pageIndex, pageSize, profileType }),
    setListJobSuitableCandidate: (data?: IJobSuitableCandidate) =>
        dispatch({ type: REDUX.JOB_SUITABLE_CANDIDATE.GET_JOB_SUITABLE_CANDIDATE, data })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listJobAnnouncements: state.JobAnnouncements.items,
    listJobNames: state.JobNames.items,
    listEmBranches: state.EmBranches.items,
    listJobService: state.JobService,
    jobAnnouncementDetail: state.JobAnnouncementDetail,
    modalState: state.MutilBox.modalState,
    drawerState: state.MutilBox.drawerState,
    totalItems: state.JobAnnouncements.totalItems,
    jobSuitableCandidates: state.JobSuitableCandidates,
    jobDetail: state.JobAnnouncementDetail
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsList);