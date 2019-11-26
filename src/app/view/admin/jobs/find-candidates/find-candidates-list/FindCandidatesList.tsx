import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { Button, Table, Icon, Select, Row, Col, Modal, Avatar, Drawer } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../common/utils/convertTime';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { TYPE } from '../../../../../../common/const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IRegion } from '../../../../../../redux/models/regions';
import { IFindCandidate, IFindCandidateFilter } from '../../../../../../redux/models/find-candidates';
let { Option } = Select;

let ImageRender = (props: any) => {
    if (props.src && props.src !== "") {
        return <Avatar src={props.src} alt={props.alt} style={{ width: "60px", height: "60px" }} icon="user" />
    } else {
        return <div style={{ width: "60px", height: "60px", padding: "20px 0px" }}>
            <Icon type="area-chart" />
        </div>
    }
};

interface FindCandidatesListProps extends StateProps, DispatchProps {
    match?: any;
    getListFindCandidates: Function;
    getTypeManagement: Function;
    getAnnoucements: Function;
    getAnnoucementDetail: Function;
};

interface FindCandidatesListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    target?: string;
    avatarUrlID?: string;
    jobId?: string;
    show_modal?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    type_management?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    birthday?: number;
    adminID?: string;
    hidden?: boolean;
    list_find_candidates?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body: IFindCandidateFilter;
    open_drawer: boolean;
};

class FindCandidatesList extends PureComponent<FindCandidatesListProps, FindCandidatesListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            state: null,
            employerID: null,
            avatarUrlID: null,
            jobId: null,
            show_modal: false,
            loading: false,
            pendingJob: null,
            message: null,
            type_management: [],
            value_type: null,
            announcementTypeID: null,
            birthday: null,
            adminID: null,
            hidden: false,
            list_find_candidates: [],
            id: null,
            loading_table: false,
            body: {
                gender: null,
                birthYearStart: null,
                birthYearEnd: null,
                regionID: null,
                lookingForJob: null,
                profileVerified: null,
                completeProfile: null,
                jobNameIDs: [],
                skillIDs: [],
                languageIDs: [],
                unlocked: null,
            },
            open_drawer: false
        };
    }

    EditJob = (
        <div>
            <Link to={`/admin/em-branches/fix/${localStorage.getItem("id_em_branches")}`}>
                <Icon style={{ padding: "5px 10px" }} type="edit" theme="twoTone" />
            </Link>
        </div>
    );

    deleteAnnoun = async () => {
        /* tslint:disable */
        Swal.fire(
            "Worksvn thông báo",
            "Bạn chắc chắn muốn xóa bài đăng này",
            "warning",
        )
    };

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
            title: 'Ảnh',
            width: 30,
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'lookingForJob',
            key: 'lookingForJob',
            width: 90,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            className: 'action',
            key: 'name',
            width: 100,
        },
        {
            title: 'Đại chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 320,
        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'region',
            className: 'action',
            key: 'region',
            width: 100,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            className: 'action',
            key: 'birthday',
            width: 100,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            width: 100,
            render: () => this.EditJob
        },
    ];

    options = [
        {
            value: 'HOME',
            label: 'Trang chủ ',
            children: [
                {
                    value: 'TOP',
                    label: 'Tuyển gấp',
                },
                {
                    value: 'IN_DAY',
                    label: 'Trong ngày',
                }
            ],
        },
        {
            value: 'SEARCH',
            label: 'Tìm kiếm',
            children: [
                {
                    value: 'HIGHLIGHT',
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
        if (nextProps.type_management !== prevState.type_management) {
            return {
                type_management: nextProps.type_management,
                value_type: "Tất cả",
                announcementTypeID: null
            }
        }

        if (nextProps.list_find_candidates !== prevState.list_find_candidates) {
            let { pageIndex, pageSize } = prevState;
            let data_table = [];
            nextProps.list_find_candidates.forEach((item: IFindCandidate, index: number) => {
                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    avatarUrl: <ImageRender src={item.avatarUrl} alt="Ảnh đại diện" />,
                    name: (item.lastName ? item.lastName : "") + " " + (item.firstName ? item.firstName : ""),
                    lookingForJob: item.lookingForJob ? "Đang tìm việc" : "Đã có việc",
                    address: item.address ? item.address : "",
                    region: item.region ? item.region.name : "",
                    birthday: timeConverter(item.birthday, 1000),
                });
            })
            return {
                list_find_candidates: nextProps.type_management,
                data_table,
                loading_table: false,
            }
        } return null;
    };

    async componentDidMount() {
        await this.searchFindCandidate();
    };

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchFindCandidate();
    };

    searchFindCandidate = async () => {
        let { body, pageIndex, pageSize } = this.state;
        this.props.getListFindCandidates(body, pageIndex, pageSize);
    };

    onCloseDrawer = () => {
        this.setState({ open_drawer: false })
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { list_regions } = this.props;
        let value: any = event;
        list_regions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } })
        switch (event) {
            case TYPE.TRUE:
                value = true;
                break;
            case TYPE.FALSE:
                value = false;
                break;
            default:
                break;
        };

        body[param] = value;
        this.setState({ body });
    };

    onChangeCreatedDate = (event) => {
        this.setState({ birthday: momentToUnix(event) });
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

    render() {
        let {
            data_table,
            show_modal,
            loading_table,
            open_drawer
        } = this.state;

        let {
            totalItems,
            list_regions,

        } = this.props
        return (
            <Fragment>
                <div className="common-content">
                    <Modal
                        visible={show_modal}
                        title="XEM TRƯỚC BÀI ĐĂNG"
                        onCancel={this.onToggleModal}
                        style={{ top: "5vh" }}
                        footer={[
                            <Button
                                key="back"
                                type="danger"
                                onClick={this.onToggleModal}
                            >
                                Thoát
                        </Button>
                        ]}
                    >
                    </Modal>

                    <h5>
                        Tìm kiếm ứng viên
                        <Button
                            onClick={() => this.searchFindCandidate()}
                            type="primary"
                            style={{
                                float: "right",
                                margin: "0px 5px"
                            }}
                        >
                            <Icon type="filter" />
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => this.searchFindCandidate()}
                            type="primary"
                            style={{
                                float: "right",
                                margin: "0px 5px"
                            }}
                        >
                            <Link to='/admin/em-branches/create' >
                                <Icon type="plus" />
                                Tạo bài đăng mới
                            </Link>
                        </Button>
                        <Button
                            onClick={() => { this.setState({ open_drawer: true }) }}
                            type="primary"
                            style={{
                                float: "right",
                                margin: "0px 5px"
                            }}
                        >
                            <Icon type="search" />
                            Bộ lọc nâng cao
                        </Button>
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
                                <IptLetterP value={"Trạng thái tìm việc"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.lookingForJob)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đang tìm việc</Option>
                                    <Option value={TYPE.FALSE}>Đã có việc</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
                                <IptLetterP value={"Đã xác minh hồ sơ"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.profileVerified)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đã xác minh</Option>
                                    <Option value={TYPE.FALSE}>Chưa xác minh</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
                                <IptLetterP value={"Giới tính"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.gender)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.MALE}>Nam </Option>
                                    <Option value={TYPE.FEMALE}>Nữ</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
                                <IptLetterP value={"Tỉnh thành"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    {
                                        list_regions && list_regions.length >= 1 ?
                                            list_regions.map((item: IRegion, index: number) =>
                                                <Option key={index} value={item.name}>{item.name}</Option>
                                            ) : null
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Drawer
                            title="Tìm kiếm nâng cao"
                            placement={"right"}
                            width={"60vw"}
                            closable={false}
                            onClose={this.onCloseDrawer}
                            visible={open_drawer}
                        >
                            <Row>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={12} md={6} lg={8} xl={6} xxl={6} >
                                    <IptLetterP value={"Tên việc đăng tuyển"} />
                                    <Select
                                        showSearch
                                        defaultValue="Tất cả"
                                        style={{ width: "100%" }}
                                        onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                    >
                                        <Option value={null}>Tất cả</Option>
                                        {
                                            list_regions && list_regions.length >= 1 ?
                                                list_regions.map((item: IRegion, index: number) =>
                                                    <Option key={index} value={item.name}>{item.name}</Option>
                                                ) : null
                                        }
                                    </Select>
                                </Col>
                            </Row>

                        </Drawer>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 800 }}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                    }, // click row
                                    onMouseEnter: (event) => {
                                        localStorage.setItem('id_em_branches', record.key)
                                    }, // mouse enter row
                                };
                            }}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListFindCandidates: (body: IFindCandidateFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.FIND_CANDIDATES.GET_FIND_CANDIDATES, body, pageIndex, pageSize }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_find_candidates: state.FindCandidates.items,
    totalItems: state.FindCandidates.totalItems,
    list_regions: state.Regions.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FindCandidatesList);