import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { Button, Table, Icon, Select, Row, Col, Modal } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../common/utils/convertTime';
import './EmBranchesList.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { TYPE } from '../../../../../../common/const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IEmBranch, IEmBranchesFilter } from '../../../../../../redux/models/em-branches';
import { IRegion } from '../../../../../../redux/models/regions';
let { Option } = Select;

interface EmBranchesListProps extends StateProps, DispatchProps {
    match?: any;
    getListEmBranchs: Function;
    getTypeManagement: Function;
    getAnnoucements: Function;
    getAnnoucementDetail: Function;
};

interface EmBranchesListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    target?: string;
    branchNameID?: string;
    jobId?: string;
    show_modal?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    type_management?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    list_em_branches?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body: IEmBranchesFilter;
};

class EmBranchesList extends PureComponent<EmBranchesListProps, EmBranchesListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            state: null,
            employerID: null,
            branchNameID: null,
            jobId: null,
            show_modal: false,
            loading: false,
            pendingJob: null,
            message: null,
            type_management: [],
            value_type: null,
            announcementTypeID: null,
            createdDate: null,
            adminID: null,
            hidden: false,
            list_em_branches: [],
            id: null,
            loading_table: false,
            body: {
                regionID: null,
                headquarters: null,
            }
        };
    }

    editToolAction = (
        <div>
            <Icon style={{ padding: "5px 10px" }} type="delete" theme="twoTone" twoToneColor="red" onClick={() => this.deleteAnnoun()} />
            <Link to={`/admin/em-branches/fix/${localStorage.getItem("id_em_branches")}`}>
                <Icon style={{ padding: "5px 10px" }} type="edit" theme="twoTone" />
            </Link>
            <Icon key="delete" style={{ padding: "5px 10px" }} type="eye" onClick={() => this.onToggleModal()} />
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
            title: 'Tên chi nhánh',
            width: 180,
            dataIndex: 'branchName',
            key: 'branchName',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 250,
        },
        {
            title: 'Chi nhánh chính',
            dataIndex: 'headquarters',
            className: 'action',
            key: 'headquarters',
            width: 100,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'contactPhone',
            className: 'action',
            key: 'contactPhone',
            width: 120,
        },
        {
            title: 'Thư điện tử',
            dataIndex: 'contactEmail',
            className: 'action',
            key: 'contactEmail',
            width: 120,
        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'region',
            className: 'action',
            key: 'region',
            width: 100,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 100,
        },
        {
            title: 'Số lượng bài đăng',
            dataIndex: 'totalJob',
            className: 'action',
            key: 'totalJob',
            width: 80,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            width: 160,
            render: () => this.editToolAction
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

        if (nextProps.list_em_branches !== prevState.list_em_branches) {
            let { pageIndex, pageSize } = prevState;
            let data_table = [];
            nextProps.list_em_branches.forEach((item: IEmBranch, index: number) => {
                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    branchName: item.branchName ? item.branchName : "",
                    headquarters: item.headquarters ? "Có" : "Không",
                    address: item.address ? item.address : "",
                    contactPhone: item.contactPhone ? item.contactPhone : "",
                    contactEmail: item.contactEmail ? item.contactEmail : "",
                    region: item.region ? item.region.name : "",
                    createdDate: timeConverter(item.createdDate, 1000),
                    totalJob: item.totalJob ? item.totalJob : "",
                });
            })
            return {
                list_em_branches: nextProps.type_management,
                data_table,
                loading_table: false,
            }
        } return null;
    };

    async componentDidMount() {
        await this.searchEmBranch();
    };

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchEmBranch();
    };

    searchEmBranch = async () => {
        let { body, pageIndex, pageSize } = this.state;
        this.props.getListEmBranchs(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { list_regions } = this.props;
        let value: any = event;
        list_regions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } })
        switch (event) {
            case TYPE.EXIST:
                value = true;
                break;
            case TYPE.NON_EXIST:
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

    render() {
        let {
            data_table,
            show_modal,
            loading_table,
        } = this.state;

        let {
            totalItems,
            list_regions
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
                        Quản lí chi nhánh
                        <Button
                            onClick={() => this.searchEmBranch()}
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
                            onClick={() => this.searchEmBranch()}
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
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
                                <IptLetterP value={"Cơ sở chính"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.headquarters)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.EXIST}>Cơ sở chính</Option>
                                    <Option value={TYPE.NON_EXIST}>Cơ sở phụ</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={5} xl={6} xxl={6} >
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
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 1300 }}
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
    getListEmBranchs: (body: any, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES, body, pageIndex, pageSize }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_em_branches: state.EmBranches.items,
    totalItems: state.EmBranches.totalItems,
    list_regions: state.Regions.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmBranchesList);