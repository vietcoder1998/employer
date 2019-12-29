import React from 'react';
import './ConnectedSchoolList.scss';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../const/actions';
import { Button, Select, Row, Col, Tooltip, Pagination, Collapse, Empty, Icon, Input } from 'antd';
// import { timeConverter } from '../../../../../../utils/convertTime';
import { TYPE } from '../../../../../const/type';
import { IptLetter, IptLetterP, NotUpdate } from '../../../layout/common/Common';
import { IAppState } from '../../../../../redux/store/reducer';
import { IRegion } from '../../../../../models/regions';
import { IConnectSchoolsFilter, IConnectSchool } from '../../../../../models/connect-schools';
import { IModalState, IMapState, IDrawerState } from '../../../../../models/mutil-box';
// import { routeLink, routePath } from '../../../../../../const/break-cumb';
import CardSchool from '../../../layout/card-schools/CardSchool';
import Loading from '../../../layout/loading/Loading';
import DrawerConfig from '../../../layout/config/DrawerConfig';
import MapContainter from '../../../layout/map/Map';
import { IConnectSchoolDetail } from '../../../../../models/connect-school-detail';
import TextArea from 'antd/lib/input/TextArea';
import { timeConverter } from '../../../../../utils/convertTime';
import { _requestToServer } from '../../../../../services/exec';
import { POST, PUT } from '../../../../../const/method';
import { CONNECT_SCHOOL } from '../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../environment/dev';
import { routeLink, routePath } from '../../../../../const/break-cumb';
let { Option } = Select;
const { Panel } = Collapse;
const typeReturn = (type?: string) => {
    let result = <NotUpdate msg="Chưa phản hồi" />
    switch (type) {
        case TYPE.PENDING:
            result = <span><Icon type="loading" />Đang chờ</span>
            break;
        case TYPE.ACCEPTED:
            result = <span><Icon type="check" />Đã chấp nhận</span>
            break;
        case TYPE.REJECTED:
            result = <span><Icon type="close" />Đã từ chối</span>
            break;
        default:
            break;
    }

    return result;
}

interface IConnectedSchoolsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    location?: any;
    handleModal: (modalState?: IModalState) => any;
    handleDrawer: (drawerState?: IDrawerState) => any;
    handleMapState: (mapState?: IMapState) => any;
    getListConnectSchools: (body?: IConnectSchoolsFilter, pageIndex?: number, pageSize?: number) => any;
    getConnectSchoolDetail: (id?: string) => any;
    setConnectSchoolDetail: () => any;
};

interface IConnectedSchoolsListState {
    data_table?: Array<IConnectSchool>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    show_modal?: boolean;
    loading?: boolean;
    type_management?: Array<any>;
    announcementTypeID?: number;
    birthday?: number;
    adminID?: string;
    hidden?: boolean;
    list_connect_schools?: Array<IConnectSchool>;
    id?: string;
    loading_table?: boolean;
    open_drawer: boolean;
    type_view?: string;
    dataSchool?: IConnectSchool;
    connect_schools_detail?: IConnectSchoolDetail,
    candidate_msg?: string;
    school_msg?: string;
    body?: IConnectSchoolsFilter;
    search?: any;
};

class ConnectedSchoolsList extends React.Component<IConnectedSchoolsListProps, IConnectedSchoolsListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 6,
            show_modal: false,
            loading: false,
            announcementTypeID: null,
            birthday: null,
            adminID: null,
            hidden: false,
            list_connect_schools: [],
            id: null,
            loading_table: true,
            candidate_msg: null,
            school_msg: null,
            open_drawer: false,
            connect_schools_detail: {},
            dataSchool: {},
            body: {}
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
            title: 'Ảnh',
            width: 30,
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
        },
        {
            title: 'Mở khóa',
            dataIndex: 'unlocked',
            key: 'unlocked',
            className: "action",
            width: 90,
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
            title: 'Địa chỉ',
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
            dataIndex: 'operation',
            width: 80,
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

    static getDerivedStateFromProps(nextProps?: IConnectedSchoolsListProps, prevState?: IConnectedSchoolsListState) {
        if (nextProps.list_connect_schools && nextProps.list_connect_schools !== prevState.list_connect_schools) {
            let { list_connect_schools } = prevState;
            if (nextProps.list_connect_schools) {
                list_connect_schools = nextProps.list_connect_schools;
            }
            return {
                list_connect_schools,
                loading_table: false,
            }
        }

        if (nextProps.connect_schools_detail && nextProps.connect_schools_detail !== prevState.connect_schools_detail) {
            let { connect_schools_detail } = nextProps;
            let candidate_msg = null;
            let school_msg = null;

            if (connect_schools_detail.owner === "EMPLOYER") {
                candidate_msg = connect_schools_detail.requestMessage;
                school_msg = connect_schools_detail.replyMessage;
            } else {
                candidate_msg = connect_schools_detail.replyMessage;
                school_msg = connect_schools_detail.requestMessage;
            }

            setTimeout(() => {
                nextProps.handleMapState({ marker: { lat: connect_schools_detail.lat, lng: connect_schools_detail.lon } })
            }, 500);

            return {
                connect_schools_detail: nextProps.connect_schools_detail,
                loading_table: false,
                candidate_msg,
                school_msg,
                dataSchool: nextProps.connect_schools_detail
            }
        }

        if (nextProps.location.search && nextProps.location.search !== prevState.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                nextProps.handleDrawer();
                setTimeout(() => {
                    nextProps.getConnectSchoolDetail(id);
                }, 700);

                return {
                    search: nextProps.location.search
                }
            }

            return null
        }

        return null
    };

    async componentDidMount() {
        await this.searchConnectSchools();
    };

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event - 1, });
        await this.searchConnectSchools(event - 1, "pageIndex");
    };

    setPageSize = async (event: number) => {
        await this.setState({ pageSize: 10 * event });
        await this.searchConnectSchools(event * 10, "pageSize");
    }

    searchConnectSchools = async (event?: number, type?: string) => {
        let { body, pageIndex, pageSize } = this.state;
        if (type === "pageIndex") {
            pageIndex = event;
        }

        if (type === "pageSize") {
            pageSize = event;
        }
        await this.setState({ loading_table: true })
        await this.props.getListConnectSchools(body, pageIndex, pageSize);
    };

    onChangeType = (event: any, param?: string) => {
        let { body } = this.state;
        let { list_regions } = this.props;
        let value: any = event;
        list_regions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } });
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

    onSetDataSchool = async (id?: string) => {
        let { list_connect_schools } = this.props;
        let filter_arr = list_connect_schools.filter((item: IConnectSchool) => item.id === id);
        let dataSchool = filter_arr[0];
        setTimeout(() => {

        }, 500);
        this.props.history.push(routeLink.CONNECT_SCHOOLS + routePath.LIST + `?id=${dataSchool.id}`)
    }

    createRequest = async (type?: string) => {
        let { candidate_msg, dataSchool } = this.state;
        let METHOD = PUT;
        let API = CONNECT_SCHOOL + `/${dataSchool.id}/request`;
        let body = {};

        await this.setState({ loading: true });
        switch (type) {
            case TYPE.ACCEPTED:
                if (!dataSchool.owner) {
                    METHOD = POST;
                    body = { requestMessage: candidate_msg }
                }

                if (dataSchool.owner === TYPE.SCHOOL) {
                    API += `/reply/${TYPE.ACCEPTED}`;
                    body = { replyMessage: candidate_msg }
                }

                if (dataSchool.owner === TYPE.EMPLOYER) {
                    body = { requestMessage: candidate_msg }
                }

                break;
            case TYPE.REJECTED:
                if (dataSchool.owner === TYPE.EMPLOYER) {
                    API += `/reply/${TYPE.REJECTED}`;
                    body = { replyMessage: candidate_msg }
                }
        }

        await _requestToServer(
            METHOD,
            API,
            body,
            undefined,
            undefined,
            EMPLOYER_HOST,
            true
        ).then(
            (res: any) => {
                if (res)
                    this.props.handleDrawer();
                setTimeout(() => {
                    this.searchConnectSchools();
                }, 250);
            }
        )

        this.setState({ loading: false })
    }

    render() {
        let {
            list_connect_schools,
            loading_table,
            pageIndex,
            pageSize,
            candidate_msg,
            school_msg,
            dataSchool,
            loading,
            body
        } = this.state;

        let {
            totalItems,
            list_regions,
        } = this.props;

        return (
            <>
                <DrawerConfig
                    title="Đã gửi lời mời"
                    width={"60vw"}
                >
                    {
                        dataSchool ? (
                            <Collapse
                                defaultActiveKey={['1', '2', '3']}
                                bordered={false}
                                style={{ marginBottom: 40 }}
                            >
                                < Panel header="Thông tin tóm gọn" key="1">
                                    <Row>
                                        <Col md={24} lg={12} xl={12} xxl={12}>
                                            <ul>
                                                <li>
                                                    <IptLetter value="Tên trường: " children={dataSchool && dataSchool.name} />
                                                </li>
                                                <li>
                                                    <IptLetter value="Tên rút gọn: " children={dataSchool && dataSchool.shortName} />
                                                </li>
                                                <li>
                                                    <IptLetter value="Địa chỉ: " children={dataSchool && dataSchool.address} />
                                                </li>
                                                <li>
                                                    <IptLetter value="Trạng thái: " children={dataSchool && typeReturn(dataSchool.state)} />
                                                </li>
                                                <li>
                                                    <IptLetter
                                                        value="Ngày tạo lời mời: "
                                                        children={
                                                            dataSchool &&
                                                                dataSchool.createdDate !== -1 ?
                                                                timeConverter(dataSchool.createdDate, 100, "HH:mm DD:MM:YY") : <NotUpdate msg="Chưa có" />
                                                        } />
                                                </li>
                                                <li>
                                                    <IptLetter
                                                        value="Ngày phản hồi: "
                                                        children={
                                                            dataSchool &&
                                                                dataSchool.createdDate !== -1 ?
                                                                timeConverter(dataSchool.createdDate, 100, "HH:mm DD:MM:YY") : <NotUpdate msg="Chưa có" />
                                                        } />
                                                </li>
                                                <li>
                                                    <IptLetter
                                                        value="Phản hồi cuối: "
                                                        children={
                                                            dataSchool &&
                                                                dataSchool.lastModified !== -1 ?
                                                                timeConverter(dataSchool.lastModified, 100, "HH:mm DD:MM:YY") : <NotUpdate msg="Chưa có" />
                                                        } />
                                                </li>
                                                <li>
                                                    <IptLetter
                                                        value="Người gửi yêu cầu : "
                                                        children={
                                                            dataSchool && dataSchool.owner ?
                                                                (dataSchool.owner === TYPE.EMPLOYER ? "Bạn" : `Trường ${dataSchool.shortName}`) : <NotUpdate msg="Chưa có" />
                                                        } />
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col md={24} lg={12} xl={12} xxl={12}>
                                            <MapContainter style={{ pointerEvent: "none", height: 300, minWidth: 300 }} disabled={true} />
                                        </Col>
                                    </Row>
                                </Panel>
                                <Panel header={"Phản hồi nhà trường"} key="2" >
                                    <TextArea
                                        value={school_msg}
                                        placeholder="Chưa có yêu cầu"
                                        rows={3}
                                        disabled={true}
                                    />
                                </Panel>
                                <Panel header="Phản hồi từ phía bạn" key="3" >
                                    <TextArea
                                        value={candidate_msg}
                                        placeholder="Chưa có yêu cầu"
                                        rows={3}

                                        onChange={(event: any) => {
                                            this.setState({ candidate_msg: event.target.value })
                                        }}
                                    />
                                </Panel>
                            </Collapse>) : <Loading />
                    }

                    <div style={{ margin: "20px 0px", width: "100%" }}>
                        <Button
                            icon="left"
                            children={"Thoát"}
                            style={{ float: "left" }}
                        />
                        <Button
                            icon={loading ? "loading" : "check"}
                            type={"primary"}
                            children={dataSchool.owner === TYPE.EMPLOYER ? "Cập nhật" : "Tạo phản hồi"}
                            style={{
                                margin: "10px",
                                float: "right",
                                display: dataSchool.state === TYPE.REJECTED ? "none" : "block"
                            }}
                            onClick={() => this.createRequest(TYPE.ACCEPTED)}
                        />
                        <Button
                            icon={loading ? "loading" : "stop"}
                            children={"Hủy phản hồi"}
                            type={"danger"}
                            style={{
                                marginRight: "10px",
                                float: "right",
                                display: dataSchool.state === TYPE.ACCEPTED ? "block" : "none"
                            }}
                            onClick={() => this.createRequest(TYPE.REJECTED)}
                        />
                    </div>
                </DrawerConfig>
                <div className="common-content">
                    <h5>
                        Đã gửi lời mời tới trường
                        <Tooltip title="Tìm kiếm trường học" >
                            <Button
                                onClick={() => this.searchConnectSchools()}
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
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Trạng thái kết nối"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.CONNECT_SCHOOL.state)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.PENDING}>Đang gửi yêu cầu</Option>
                                    <Option value={TYPE.ACCEPTED}>Đã chấp nhận</Option>
                                    <Option value={TYPE.REJECTED}>Đã từ chối</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Bên gửi"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.CONNECT_SCHOOL.owner)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.EMPLOYER}>Nhà tuyển dụng </Option>
                                    <Option value={TYPE.SCHOOL}>Nhà trường</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tỉnh thành"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.CONNECT_SCHOOL.regionID)}
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
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Yêu cầu kết nối"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.CONNECT_SCHOOL.hasRequest)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đã gửi </Option>
                                    <Option value={TYPE.FALSE}>Chưa gửi</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tên rút gọn"} />
                                <Input
                                    placeholder="Tất cả"
                                    style={{ width: "100%" }}
                                    value={body.shortName}
                                    onChange={(event: any) => this.onChangeType(event.target.value, TYPE.CONNECT_SCHOOL.shortName)}
                                    onPressEnter={(event: any) => this.searchConnectSchools()}
                                    suffix={
                                        body.shortName &&
                                            body.shortName.length > 0 ?
                                            <Icon
                                                type={"close-circle"}
                                                theme={"filled"}
                                                onClick={
                                                    () => this.onChangeType(null, TYPE.CONNECT_SCHOOL.shortName)
                                                }
                                            /> : <Icon type={"search"} />
                                    }
                                />

                            </Col>
                        </Row>
                        <div className="school-content">
                            {!loading_table ? (list_connect_schools && list_connect_schools.length > 0 ? list_connect_schools.map(
                                (item: IConnectSchool, index: number) =>
                                    <div
                                        key={index}
                                    >
                                        <CardSchool key={index} item={item} openDrawer={this.onSetDataSchool} />
                                    </div>
                            ) : <Empty />) : <Loading />}
                        </div>
                        <div style={{ textAlign: "center", margin: " 40px 20px", }}>
                            <Pagination
                                showQuickJumper
                                showSizeChanger
                                current={pageIndex + 1}
                                pageSize={pageSize}
                                total={totalItems}
                                onShowSizeChange={(event: any) => this.setPageSize(event)}
                                onChange={(event: any) => this.setPageIndex(event)}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListConnectSchools: (body?: IConnectSchoolsFilter, pageIndex?: number, pageSize?: number) =>
        dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL, body, pageIndex, pageSize }),
    getConnectSchoolDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL, id }),
    handleModal: (modalState?: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    handleDrawer: (drawerState?: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
    handleMapState: (mapState?: IMapState) =>
        dispatch({ type: REDUX.MAP.SET_MAP_STATE, mapState }),
    setConnectSchoolDetail: () =>
        dispatch({ type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_connect_schools: state.ConnectSchools.items,
    connect_schools_detail: state.ConnectSchoolsDetail,
    totalItems: state.ConnectSchools.totalItems,
    list_regions: state.Regions.items,
    list_skills: state.Skills.items,
    list_job_names: state.JobNames.items,
    list_languages: state.Languages.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSchoolsList);