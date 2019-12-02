import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../common/const/actions';
import { Button, Table, Icon, Select, Row, Col, Cascader, Checkbox, Tooltip, Radio, Modal } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../common/utils/convertTime';
import './JobAnnouncementsList.scss';
import { TYPE } from '../../../../../../common/const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IJobAnnouncementsFilter, IJobAnnouncement } from '../../../../../../redux/models/job-announcements';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../redux/models/job-names';
import { IEmBranch } from '../../../../../../redux/models/em-branches';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IJobAnnouncementDetail } from '../../../../../../redux/models/job-annoucement-detail';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, DELETE } from '../../../../../../common/const/method';
import { JOB_PRIORITY_HOME, JOB_ANNOUNCEMENTS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IModalState } from '../../../../../../redux/models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';

let { Option } = Select;
let CheckboxGroup = Checkbox.Group;
const plainOptions = ['Đang chờ', 'Từ chối', 'Chấp nhận'];

interface JobAnnouncementsListProps extends StateProps, DispatchProps {
    match?: any;
    getListJobAnnouncements: Function;
    getListEmBranches: Function;
    getTypeManagement: Function;
    getJobAnnouncementDetail: Function;
    getListJobService: Function;
    handleDrawer: Function;
    handleModal: Function;
};

interface JobAnnouncementsListState {
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
    list_em_branches?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    list_job_announcements?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body?: IJobAnnouncementsFilter;
    un_checkbox?: boolean;
    list_check?: Array<any>;
    state_check_box?: Array<string>;
    open_drawer?: boolean;
    homePriority?: string;
    searchPriority?: string;
    homeExpired: boolean;
    searchExpired: boolean;
    job_announcement_detail: IJobAnnouncementDetail;
    type_modal: string;
};


class JobAnnouncementsList extends PureComponent<JobAnnouncementsListProps, JobAnnouncementsListState> {
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
            list_em_branches: [],
            value_type: null,
            announcementTypeID: null,
            createdDate: null,
            adminID: null,
            hidden: false,
            list_job_announcements: [],
            id: null,
            loading_table: true,
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

            un_checkbox: false,
            list_check: [],
            homePriority: null,
            searchPriority: null,
            homeExpired: false,
            searchExpired: false,
            job_announcement_detail: null,
            type_modal: null,
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
            key: 'jobTitle',
        },

        {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            key: 'jobName',
            width: 200,
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
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            className: 'action',
            key: 'priority',
            width: 160,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            dataIndex: 'operation',
            width: 180,
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.list_job_announcements &&
            nextProps.list_job_announcements !== prevState.list_job_announcements
        ) {
            let { pageIndex, pageSize } = prevState;
            let data_table = [];
            let viewCount = (count?: string | number, type?: "link" | "default" | "ghost" | "primary" | "dashed" | "danger") => (<div>
                <Link to={`/v1/admin/job-management/fix/${localStorage.getItem("id_job_announcement")}`} >
                    <Button type={type} disabled={count === 0}>
                        <Icon type="team" />{count}
                    </Button>
                </Link>
            </div>);

            let EditToolTip = (hidden?: boolean) => (
                <>
                    <Tooltip placement="topLeft" title={hidden ? "Hiện bài đăng" : "Ẩn bài đăng"}>
                        <Icon
                            type={hidden ? "eye-invisible" : "eye"}
                            style={{ padding: "5px 5px", color: hidden ? "black" : "gray" }}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title={"Xem chi tiết(sửa)"}>
                        <Icon
                            style={{ padding: "5px 5px" }}
                            type="edit"
                            theme="twoTone"
                            twoToneColor="green"
                            onClick={() => nextProps.history.push(`/v1/admin/jobs/job-announcements/fix/${localStorage.getItem("id_job_announcement")}`)}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title={"Đăng bài tương tự"}>
                        <Icon style={{ padding: "5px 10px" }} type="copy" theme="twoTone" onClick={() => {
                            nextProps.history.push(`/v1/admin/jobs/job-announcements/copy/${localStorage.getItem("id_job_announcement")}`)
                        }} />
                    </Tooltip>
                    <Tooltip placement="topRight" title={"Xóa bài đăng"}>
                        <Icon
                            style={{ padding: "5px 5px" }}
                            type="delete"
                            theme="twoTone"
                            twoToneColor="red"
                            onClick={() => nextProps.handleModal({ msg: "Bạn muốn xóa bài đăng này", type_modal: TYPE.DELETE })}
                        />
                    </Tooltip>
                    <Tooltip placement="topRight" title={"Kích hoạt gói dịch vụ"}>
                        <Icon
                            style={{ padding: "5px 5px" }}
                            type="dollar"
                            theme="twoTone"
                            twoToneColor="yellow"
                            onClick={async () => {
                                await nextProps.handleDrawer();
                                await setTimeout(() => nextProps.getJobAnnouncementDetail(localStorage.getItem("id_job_announcement")), 250);
                            }} />
                    </Tooltip>
                </>
            )

            nextProps.list_job_announcements.forEach((item: IJobAnnouncement, index: number) => {
                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    title: item.jobTitle,
                    jobName: item.jobName.name ? item.jobName.name : "",
                    jobType: item.jobType,
                    employerBranchName: item.employerBranchName ? item.employerBranchName : "",
                    createdDate: timeConverter(item.createdDate, 1000),
                    expirationDate: timeConverter(item.expirationDate, 1000),
                    acceptedApplied: viewCount(item.acceptedApplied, "primary"),
                    rejectedApplied: viewCount(item.rejectedApplied, "danger"),
                    pendingApplied: viewCount(item.pendingApplied, "default"),
                    hidden: `${!item.hidden ? "Hiện" : "Ẩn"}, ${!item.expired ? "Còn hạn" : "Hết hạn"}`,
                    priority: `${item.priority.homePriority ?  item.priority.homePriority : "" }${item.priority.searchPriority}`,
                    operation: EditToolTip(item.hidden)
                });
            })

            return {
                list_job_announcements: nextProps.list_job_announcements,
                data_table,
                loading_table: false,
            }
        }

        if (
            nextProps.job_announcement_detail &&
            nextProps.job_announcement_detail !== prevState.job_announcement_detail
        ) {
            let { job_announcement_detail } = nextProps;
            return {
                homePriority: job_announcement_detail.priority.homePriority,
                searchPriority: job_announcement_detail.priority.searchPriority,
                homeExpired: job_announcement_detail.priority.homeExpired,
                searchExpired: job_announcement_detail.priority.searchExpired,
                job_announcement_detail
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
    }

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchJobAnnouncement();
    };

    searchJobAnnouncement = async () => {
        let { body, pageIndex, pageSize } = this.state;
        await this.props.getListJobAnnouncements(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { list_em_branches } = this.props;
        let value: any = event;
        switch (param) {
            case TYPE.JOB_FILTER.jobNameIDs:
                value = [value];
                break;
            case TYPE.JOB_FILTER.jobLocationFilter:
                if (value) {
                    let data = list_em_branches.filter((item: IEmBranch, index: number) => { return item.id === event });
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
        let { homePriority, searchPriority } = this.state;
        let { modalState } = this.props;
        await this.setState({ loading: true });
        switch (modalState.type_modal) {
            case TYPE.JOB_FILTER.homePriority:
                await _requestToServer(
                    POST,
                    JOB_PRIORITY_HOME + `/${localStorage.getItem('id_job_announcement')}/priority/home`,
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
                });

                await this.setState({
                    loading: false
                });
                break;

            case TYPE.JOB_FILTER.searchPriority:
                await _requestToServer(
                    POST,
                    JOB_PRIORITY_HOME + `/${localStorage.getItem('id_job_announcement')}/priority/search`,
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
                });
                await this.setState({
                    loading: false
                });
                break;

            case TYPE.DELETE:
                await _requestToServer(
                    DELETE,
                    JOB_ANNOUNCEMENTS + `/${localStorage.getItem('id_job_announcement')}`,
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
                })
                await this.setState({
                    loading: false
                });
                break;
            default:
                break;
        };
    }

    requeryData = async () => {
        await this.searchJobAnnouncement();
        await this.props.getListJobService();
        await this.props.getJobAnnouncementDetail(localStorage.getItem('id_job_announcement'));
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
            searchPriority,
            homeExpired,
            searchExpired,
            body,
            loading,
        } = this.state;

        let {
            job_announcement_detail,
            totalItems,
            list_job_names,
            list_em_branches,
            list_job_service,
            modalState
        } = this.props;

        let homeExpiration = job_announcement_detail.priority.homeExpiration;
        let searchExpiration = job_announcement_detail.priority.searchExpiration;
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
                            type={modalState.type_modal === TYPE.DELETE ? "danger" : "primary"}
                            icon={modalState.type_modal === TYPE.DELETE ? "delete" : "check"}
                            loading={loading}
                            children={modalState.type_modal === TYPE.DELETE ? "Xóa" : "Xác nhận"}
                            onClick={async () => this.createRequest()}
                        />
                    ]}
                    children={modalState.msg}
                />
                <>
                    <DrawerConfig
                        title={"Kích hoạt gói dịch vụ tuyển dụng"}
                        width={800}
                    >
                        <h6>Các gói của bạn</h6>
                        <>
                            <label className='top'>Gói tuyển dụng gấp: {list_job_service.homeTopQuantiy}</label>
                            <label className='in_day'>Gói tuyển dụng trong ngày: {list_job_service.homeInDayQuantity}</label>
                            <label className='high_light'>Gói tìm kiếm nổi bật:  {list_job_service.searchHighLightQuantity}</label>
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
                                        this.props.handleModal(modalState = {
                                            msg: "Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?",
                                            type_modal: TYPE.JOB_FILTER.homePriority
                                        });
                                    }}
                                >
                                    Kích hoạt
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
                                        this.props.handleModal("Bạn muốn kích hoạt gói dịch vụ cho bài đăng này ?", TYPE.JOB_FILTER.searchPriority);
                                    }}
                                >
                                    Kích hoạt
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
                            Quản lí bài đăng
                        <Button
                                onClick={() => this.searchJobAnnouncement()}
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 5px"
                                }}
                            >
                                <Icon type={loading_table ? "loading" : "filter" }/>
                                Tìm kiếm
                        </Button>
                            <Button
                                onClick={() => this.searchJobAnnouncement()}
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 5px"
                                }}
                            >
                                <Link to='/v1/admin/jobs/job-announcements/create' >
                                    <Icon type="plus" />
                                    Tạo bài đăng mới
                            </Link>
                            </Button>
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
                                        {
                                            list_job_names &&
                                            list_job_names.map(
                                                (item: IJobName, index: number) => <Option key={index} value={item.id}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                    <IptLetterP value={"Chi nhánh tuyển dụng"} />
                                    <Select
                                        showSearch
                                        placeholder="Tất cả"
                                        optionFilterProp="children"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.jobLocationFilter)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_em_branches &&
                                            list_em_branches.map(
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
                                    <IptLetterP value={"Trạng thái gói dịch vụ"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        placeholder="Tất cả"
                                        optionFilterProp="children"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.JOB_FILTER.expired)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        <Option value={TYPE.TRUE}>Còn hạn</Option>
                                        <Option value={TYPE.FALSE}>Hết hạn</Option>
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
                                scroll={{ x: 1700 }}
                                bordered
                                pagination={{ total: totalItems, showSizeChanger: true }}
                                size="middle"
                                onChange={this.setPageIndex}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {
                                        }, // click row
                                        onMouseEnter: (event) => {
                                            localStorage.setItem('id_job_announcement', record.key)
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
    handleDrawer: (drawerState: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
    handleModal: (modalState: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    getJobAnnouncementDetail: (id: string | number) =>
        dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENT_DETAIL.GET_JOB_ANNOUNCEMENT_DETAIL, id }),
    getListJobService: () => dispatch({ type: REDUX_SAGA.JOB_SERVICE.GET_JOB_SERVICE }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_job_announcements: state.JobAnnouncements.items,
    list_job_names: state.JobNames.items,
    list_em_branches: state.EmBranches.items,
    list_job_service: state.JobService,
    job_announcement_detail: state.JobAnnouncementDetail,
    modalState: state.MutilBox.modalState,
    drawerState: state.MutilBox.drawerState,
    totalItems: state.JobAnnouncements.totalItems
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsList);