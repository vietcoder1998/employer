import React, { PureComponent,  } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Modal, Tooltip } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../../utils/convertTime';
import './EmBranchesList.scss';
import { TYPE } from '../../../../../../const/type';
import { Link } from 'react-router-dom';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IEmBranch, IEmBranchesFilter } from '../../../../../../models/em-branches';
import { IRegion } from '../../../../../../models/regions';
import { IModalState } from '../../../../../../models/mutil-box';
import { _requestToServer } from '../../../../../../services/exec';
import { DELETE } from '../../../../../../const/method';
import { EM_BRANCHES_API } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
let { Option } = Select;

interface EmBranchesListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    handleModal: Function;
    getListEmBranchs: Function;
    getTypeManagement: Function;
    getAnnoucements: Function;
    getAnnoucementDetail: Function;
};

interface EmBranchesListState {
    dataTable?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    target?: string;
    branchNameID?: string;
    jobId?: string;
    showModal?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    typeMng?: Array<any>;
    valueType?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    listEmBranches?: Array<any>;
    id?: string;
    loadingTable?: boolean;
    body: IEmBranchesFilter;
};

class EmBranchesList extends PureComponent<EmBranchesListProps, EmBranchesListState> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            pageIndex: 0,
            pageSize: 10,
            state: null,
            employerID: null,
            branchNameID: null,
            jobId: null,
            showModal: false,
            loading: false,
            pendingJob: null,
            message: null,
            typeMng: [],
            valueType: null,
            announcementTypeID: null,
            createdDate: null,
            adminID: null,
            hidden: false,
            listEmBranches: [],
            id: null,
            loadingTable: true,
            body: {
                regionID: null,
                headquarters: null,
            }
        };
    }

    editToolAction = () => {
        let { id } = this.state;
        return (
            <>
                <Tooltip
                    title="Xem chi tiết (sửa)"
                >
                    <Icon
                        className="f-ic"
                        style={{ padding: 5, margin: 2 }}
                        type="edit"
                        theme="twoTone"
                        onClick={() =>
                            this.props.history.push(
                                routeLink.EM_BRANCHES + routePath.FIX + `/${id}`
                            )
                        }
                    />
                </Tooltip>
                <Tooltip
                    title="Xóa chi nhánh"
                >
                    <Icon
                        className="f-ic"
                        style={{ padding: 5, margin: 2 }}
                        type="delete"
                        theme="twoTone"
                        twoToneColor="red"
                        onClick={
                            () => this.deleteAnnoun()
                        }
                    />
                </Tooltip>
            </>
        )
    };

    deleteAnnoun = async () => {
        this.props.handleModal({ msg: "Bạn chắc chắn muốn xóa chi nhánh này ?", typeModal: TYPE.DELETE });
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
            fixed: 'left',
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
            width: 80,
            render: () => this.editToolAction()
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
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.typeMng !== prevState.typeMng) {
            return {
                typeMng: nextProps.typeMng,
                valueType: "Tất cả",
                announcementTypeID: null
            }
        }

        if (nextProps.listEmBranches !== prevState.listEmBranches) {
            let { pageIndex, pageSize } = prevState;
            let dataTable = [];
            nextProps.listEmBranches.forEach((item: IEmBranch, index: number) => {
                dataTable.push({
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
                listEmBranches: nextProps.typeMng,
                dataTable,
                loadingTable: false,
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
        await this.setState({ pageIndex: event.current - 1, loadingTable: true, pageSize: event.pageSize });
        await this.searchEmBranch();
    };

    searchEmBranch = async () => {
        let { body, pageIndex, pageSize } = this.state;
        this.props.getListEmBranchs(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { listRegions } = this.props;
        let value: any = event;
        listRegions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } })
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

    createRequest = async () => {
        let { modalState } = this.props;
        this.setState({ loading: true })
        switch (modalState.typeModal) {
            case TYPE.DELETE:
                await _requestToServer(
                    DELETE,
                    EM_BRANCHES_API,
                    [localStorage.getItem('id_em_branches')],
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false
                ).then((res) => {
                    if (res) {
                        this.setState({ loading: false });
                        this.searchEmBranch();
                        this.props.handleModal();
                    }
                })
                break;

            default:
                break;
        }
    }

    render() {
        let {
            dataTable,
            loadingTable,
            loading
        } = this.state;

        let {
            totalItems,
            listRegions,
            modalState,
        } = this.props
        return (
            <>
                <div className="common-content">
                    <Modal
                        visible={modalState.open_modal}
                        title={"Workvn thông báo"}
                        destroyOnClose={true}
                        onOk={this.createRequest}
                        onCancel={() => {
                            this.setState({ loading: false });
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

                    <h5>
                        Quản lý chi nhánh {`(${totalItems})`}
                        <Tooltip title="Lọc tìm kiếm" >
                            <Button
                                onClick={() => this.searchEmBranch()}
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "5px 10px",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px"
                                }}
                                icon={loadingTable ? "loading" : "filter"}
                            />
                        </Tooltip>
                        <Link to={routeLink.EM_BRANCHES + routePath.CREATE} >
                            <Tooltip title="Tạo chi nhánh mới" >
                                <Button
                                    type="primary"
                                    style={{
                                        float: "right",
                                        margin: "5px 10px",
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
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tỉnh thành"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.EM_BRANCHES.regionID)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    {
                                        listRegions && listRegions.length >= 1 ?
                                            listRegions.map((item: IRegion, index: number) =>
                                                <Option key={index} value={item.name}>{item.name}</Option>
                                            ) : null
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loadingTable}
                            dataSource={dataTable}
                            scroll={{ x: 1260 }}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onMouseEnter: (event: any) => {
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
    getListEmBranchs: (body: any, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES, body, pageIndex, pageSize }),
    handleModal: (modalState: IModalState) =>
        dispatch({
            type: REDUX.HANDLE_MODAL,
            modalState
        })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listEmBranches: state.EmBranches.items,
    totalItems: state.EmBranches.totalItems,
    listRegions: state.Regions.items,
    modalState: state.MutilBox.modalState
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmBranchesList);