import React from 'react';
import './ConnectSchoolList.scss';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../const/actions';
import { Button, Select, Row, Col, Pagination, Collapse, Empty, Icon, Input, Tabs, Drawer } from 'antd';
// import { timeConverter } from '../../../../../../utils/convertTime';
import { TYPE } from '../../../../../const/type';
import { IptLetter, IptLetterP, NotUpdate } from '../../../layout/common/Common';
import { IAppState } from '../../../../../redux/store/reducer';
import { IRegion } from '../../../../../models/regions';
import { IConnectSchoolsFilter, IConnectSchool } from '../../../../../models/connect-schools';
import { IModalState, IMapState, IDrawerState } from '../../../../../models/mutil-box';
import CardSchool from '../../../layout/card-schools/CardSchool';
import Loading from '../../../layout/loading/Loading';
import MapContainter from '../../../layout/map/Map';
import { IConnectSchoolDetail } from '../../../../../models/connect-school-detail';
import TextArea from 'antd/lib/input/TextArea';
import { timeConverter } from '../../../../../utils/convertTime';
import { _requestToServer } from '../../../../../services/exec';
import { POST, PUT } from '../../../../../const/method';
import { CONNECT_SCHOOL } from '../../../../../services/api/private.api';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../const/break-cumb';

let { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const strForSearch = str => {
    return str
        ? str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : str;
};

const typeReturn = (type?: string) => {
    let result = <NotUpdate msg="Chưa phản hồi" />
    switch (type) {
        case TYPE.PENDING:
            result = <span style={{ color: "orange" }} >Đang chờ</span>
            break;
        case TYPE.ACCEPTED:
            result = <span style={{ color: "green" }}>Chấp nhận</span>
            break;
        case TYPE.REJECTED:
            result = <span style={{ color: "red" }}>Đã từ chối</span>
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
    setConnectSchoolDetail: (data: any) => any;
};

interface IConnectedSchoolsListState {
    dataTable?: Array<IConnectSchool>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    showModal?: boolean;
    loading?: boolean;
    typeMng?: Array<any>;
    announcementTypeID?: number;
    birthday?: number;
    adminID?: string;
    hidden?: boolean;
    listConnectSchools?: Array<IConnectSchool>;
    id?: string;
    loadingTable?: boolean;
    openDrawer: boolean;
    typeView?: string;
    dataSchool?: IConnectSchool;
    connectSchoolsDetail?: IConnectSchoolDetail,
    requestMessage?: string;
    replyMessage?: string;
    body?: IConnectSchoolsFilter;
    search?: any;
    tabActive?: string;
};

class ConnectedSchoolsList extends React.Component<IConnectedSchoolsListProps, IConnectedSchoolsListState> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            pageIndex: 0,
            pageSize: 10,
            showModal: false,
            loading: false,
            announcementTypeID: null,
            birthday: null,
            adminID: null,
            hidden: false,
            listConnectSchools: [],
            id: null,
            loadingTable: true,
            requestMessage: null,
            replyMessage: null,
            openDrawer: false,
            connectSchoolsDetail: {},
            dataSchool: {},
            body: {
                hasRequest: true,
                state: TYPE.ACCEPTED,
                name: null,
                shortName: null,
                regionID: null,
                schoolTypeID: null,
                jobNameIDs: [],
                owner: null,
            }
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
            className: 'action',
            fixed: 'left',
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
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    static getDerivedStateFromProps(nextProps?: IConnectedSchoolsListProps, prevState?: IConnectedSchoolsListState) {
        if (nextProps.listConnectSchools && nextProps.listConnectSchools !== prevState.listConnectSchools) {
            let { listConnectSchools } = prevState;
            if (nextProps.listConnectSchools) {
                listConnectSchools = nextProps.listConnectSchools;
            }
            return {
                listConnectSchools,
                loadingTable: false,
            }
        }

        if (nextProps.connectSchoolsDetail && nextProps.connectSchoolsDetail !== prevState.connectSchoolsDetail) {
            let { connectSchoolsDetail } = nextProps;

            setTimeout(() => {
                nextProps.handleMapState({ marker: { lat: connectSchoolsDetail.lat, lng: connectSchoolsDetail.lon } })
            }, 500);

            return {
                connectSchoolsDetail: nextProps.connectSchoolsDetail,
                // loadingTable: false,
                requestMessage: nextProps.connectSchoolsDetail.requestMessage,
                replyMessage: nextProps.connectSchoolsDetail.replyMessage,
                dataSchool: nextProps.connectSchoolsDetail
            }
        }

        if (nextProps.location.search && nextProps.location.search !== prevState.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                nextProps.handleDrawer();
                // setTimeout(() => {
                //     nextProps.getConnectSchoolDetail(id);
                // }, 700);

                return {
                    search: nextProps.location.search
                }
            }

            return null
        }

        return null
    };

    async componentDidMount() {
        // this.setState({loadingTable: true})
        console.log("componentDidMount ConnectedSchoolsList")
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
        await this.setState({ loadingTable: true });
        setTimeout(() => {
            this.props.getListConnectSchools(body, pageIndex, pageSize);
        }, 500);

    };

    onChangeType = (event?: any, param?: string) => {
        let { body } = this.state;
        let { listRegions } = this.props;
        let value: any = event;
        listRegions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } });

        if (param) {
            body[param] = value;
        } else {
            switch (event) {
                case TYPE.RECEIVE_RQ:
                    body.hasRequest = true;
                    body.state = TYPE.PENDING;
                    body.owner = TYPE.SCHOOL;
                    this.setState({ tabActive: TYPE.RECEIVE_RQ })
                    break;
                case TYPE.SEND_RQ:
                    body.hasRequest = true;
                    body.state = TYPE.PENDING;
                    body.owner = TYPE.EMPLOYER;
                    this.setState({ tabActive: TYPE.SEND_RQ })
                    break;
                case TYPE.ACCEPTED:
                    body.hasRequest = true;
                    body.owner = null;
                    body.state = TYPE.ACCEPTED;
                    this.setState({ tabActive: TYPE.ACCEPTED })
                    break;
                case TYPE.REJECTED:
                    body.owner = null;
                    body.hasRequest = null;
                    body.state = TYPE.REJECTED;
                    this.setState({ tabActive: TYPE.REJECTED })
                    break;
                default:
                    body.hasRequest = false;
                    body.state = null;
                    body.owner = null;
                    this.setState({ tabActive: TYPE.UNCONNECTED })
                    break;
            };
        }

        this.setState({ body });
        this.searchConnectSchools();
    };

    onSetDataSchool = async (id?: string) => {
        let { listConnectSchools } = this.props;
        // console.log(listConnectSchools)

        let filter_arr = listConnectSchools.filter((item) => item.school.id === id);
        // let filter_arr = listConnectSchools.filter((item: IConnectSchool) => item.id === id);
        let dataSchool = filter_arr[0];

        console.log(dataSchool)

        this.props.handleDrawer({ openDrawer: true });
        await this.setState({ loading: true });

        setTimeout(() => {
            if (dataSchool.state) {
                this.props.getConnectSchoolDetail(id);
            } else {
                this.props.setConnectSchoolDetail(dataSchool);
            }
        }, 500);
        await this.setState({ loading: false });
    }

    createRequest = async (id) => {
        // let { dataSchool } = this.state;
        // let METHOD = PUT;
        let API = CONNECT_SCHOOL + `/${id}/request`;
        let body = {};

        await this.setState({ loading: true });
        // switch (type) {
        //     case TYPE.ACCEPTED:
        //         if (!dataSchool.owner) {
        //             METHOD = POST;
        //             body = { requestMessage: requestMessage }
        //         }

        //         if (dataSchool.owner === TYPE.SCHOOL) {
        //             API += `/reply/${TYPE.ACCEPTED}`;
        //             body = { replyMessage: requestMessage }
        //         }

        //         if (dataSchool.owner === TYPE.EMPLOYER) {
        //             body = { requestMessage: requestMessage }
        //         }

        //         break;
        //     case TYPE.REJECTED:
        //         if (dataSchool.owner === TYPE.EMPLOYER) {
        //             API += `/reply/${TYPE.REJECTED}`;
        //             body = { replyMessage: requestMessage }
        //         }
        // }

        await _requestToServer(
            POST,
            API,
            body,
            undefined,
            undefined,
            undefined,
            true
        ).then(
            (res: any) => {
                // if (res)
                //     this.props.handleDrawer();
                setTimeout(() => {
                    this.searchConnectSchools();
                }, 250);
            }
        )

        this.setState({ loading: false })
    }

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
    render() {
        let {
            listConnectSchools,
            loadingTable,
            pageIndex,
            pageSize,
            requestMessage,
            replyMessage,
            dataSchool,
            loading,
            body,
            tabActive
        } = this.state;

        let {
            totalItems,
            listRegions,
            openDrawer
        } = this.props;

        return (
            <>
                <Drawer
                    title="THÔNG TIN KẾT NỐI"
                    width={'60vw'}
                    onClose={() => this.props.handleDrawer({ openDrawer: false })}
                    destroyOnClose={true}
                    visible={openDrawer}
                    
                    
                >
                    {
                        dataSchool && !loading ? (
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
                                                    <IptLetter value="Tên trường: " children={
                                                        <Link to={routeLink.CONNECT_SCHOOLS + `/school/${dataSchool.id}`} target='_blank'>
                                                            {dataSchool && dataSchool.name}
                                                        </Link>

                                                    } />
                                                </li>
                                                <li>
                                                    <IptLetter value="Tên rút gọn: " children={
                                                        <Link to={routeLink.CONNECT_SCHOOLS + `/school/${dataSchool.id}`} target='_blank'>
                                                            {dataSchool && dataSchool.shortName}
                                                        </Link>
                                                    } />
                                                </li>
                                                <li>
                                                    <IptLetter value="Địa chỉ: " children={dataSchool && dataSchool.address} />
                                                </li>
                                                <li>
                                                    <IptLetter value="Trạng thái: " children={dataSchool && typeReturn(dataSchool.state)} />
                                                </li>
                                                <div style={{ display: !body.state ? "none" : undefined }}>
                                                    <li>
                                                        <IptLetter
                                                            value="Ngày tạo lời mời: "
                                                            children={
                                                                dataSchool &&
                                                                    dataSchool.createdDate !== -1 ?
                                                                    timeConverter(dataSchool.createdDate, 1000, "HH:mm - DD/MM/YYYY") : <NotUpdate msg="Chưa có" />
                                                            } />
                                                    </li>
                                                    <li>
                                                        <IptLetter
                                                            value="Ngày phản hồi: "
                                                            children={
                                                                dataSchool &&
                                                                    dataSchool.createdDate !== -1 ?
                                                                    timeConverter(dataSchool.createdDate, 1000, "HH:mm - DD/MM/YYYY") : <NotUpdate msg="Chưa có" />
                                                            } />
                                                    </li>
                                                    <li>
                                                        <IptLetter
                                                            value="Phản hồi cuối: "
                                                            children={
                                                                dataSchool &&
                                                                    dataSchool.lastModified !== -1 ?
                                                                    timeConverter(dataSchool.lastModified, 1000, "HH:mm - DD/MM/YYYY") : <NotUpdate msg="Chưa có" />
                                                            } />
                                                    </li>
                                                    <li>
                                                        <IptLetter
                                                            value="Phía gửi yêu cầu : "
                                                            children={
                                                                dataSchool && dataSchool.owner ?
                                                                    (dataSchool.owner === TYPE.EMPLOYER ? "Bạn" :
                                                                        <Link to={routeLink.CONNECT_SCHOOLS + `/school/${dataSchool.id}`} target='_blank'>
                                                                            {dataSchool && dataSchool.shortName}
                                                                        </Link>) : <NotUpdate msg="Chưa có" />
                                                            } />
                                                    </li>
                                                </div>
                                            </ul>
                                        </Col>
                                        <Col md={24} lg={12} xl={12} xxl={12}>
                                            <MapContainter style={{ pointerEvent: "none", height: 300, minWidth: 300 }} disabled={true} />
                                        </Col>
                                    </Row>
                                </Panel>
                                <Panel
                                    header={dataSchool.owner !== TYPE.SCHOOL ? "Phản hồi nhà trường" : "Lời mời từ nhà trường"}
                                    key="2" style={{ display: !body.state || tabActive === TYPE.UNCONNECTED || tabActive === TYPE.SEND_RQ ? "none" : undefined }}
                                >
                                    <TextArea
                                        value={replyMessage}
                                        placeholder="Chưa có yêu cầu"
                                        rows={5}
                                    />
                                </Panel>
                                <Panel header={dataSchool.owner === TYPE.SCHOOL ? "Phản hồi từ phía bạn" : "Lời mời từ phía bạn"} key="3" >
                                    <TextArea
                                        value={requestMessage}
                                        placeholder="Chưa có yêu cầu"
                                        rows={5}
                                        onChange={(event: any) => {
                                            this.setState({ requestMessage: event.target.value })
                                        }}
                                    />
                                </Panel>
                            </Collapse>) : <Loading />
                    }

                    <div style={{ margin: "20px 0px", width: "100%" }}>
                        <Button
                            type={"danger"}
                            children={"Đóng"}
                            style={{ float: "left" }}
                            onClick={() => this.props.handleDrawer()}
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
                    </div>
                </Drawer>
                <div className="common-content">
                    <h5>
                        Danh sách trường học
                        {/* <Tooltip title="Tìm kiếm trường học" >
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
                                icon={loadingTable ? "loading" : "filter"}
                            />
                        </Tooltip> */}
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tỉnh thành"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.CONNECT_SCHOOL.regionID)}
                                    filterOption={this.searchWithUnicode}
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
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tên rút gọn"} />
                                <Input
                                    placeholder="Tất cả"
                                    style={{ width: "100%" }}
                                    value={body.shortName}
                                    onChange={(event: any) => this.onChangeType(event.target.value, TYPE.CONNECT_SCHOOL.shortName)}
                                    onPressEnter={(event: any) => this.searchConnectSchools()}
                                    filterOption={this.searchWithUnicode}
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
                        <Row>
                            <Tabs onChange={(event) => this.onChangeType(event)}>
                                <TabPane tab="Đã kết nối" key={TYPE.ACCEPTED} />
                                {/* <TabPane tab="Đã từ chối" key={TYPE.REJECTED} />
                                <TabPane tab="Yêu cầu kết nối" key={TYPE.RECEIVE_RQ} /> */}
                                <TabPane tab="Đã gửi yêu cầu" key={TYPE.SEND_RQ} />
                                <TabPane tab="Chưa kết nối" key={"none"} />
                            </Tabs>
                            {!loadingTable ? (listConnectSchools && listConnectSchools.length > 0 ?
                                listConnectSchools.map(
                                    (item, index: number) =>
                                        <Col
                                            xxl={6}
                                            xl={8}
                                            md={8}
                                            lg={8}
                                            key={index}
                                        >
                                            <CardSchool key={index} item={item.school} openDrawer={this.onSetDataSchool} state={item.state} createRequest={this.createRequest} loading={this.state.loading}/>
                                            {/* <CardSchool key={index} item={item.school} /> */}
                                        </Col>
                                )
                                : <Empty description="Không có trường phù hợp" />) : <Loading />}
                        </Row>
                        <Row style={{ textAlign: "center", margin: " 40px 20px", }}>
                            <Pagination
                                showQuickJumper
                                showSizeChanger
                                current={pageIndex + 1}
                                pageSize={pageSize}
                                total={totalItems}
                                onShowSizeChange={(event: any) => this.setPageSize(event)}
                                onChange={(event: any) => this.setPageIndex(event)}
                            />
                        </Row>
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
    setConnectSchoolDetail: (data: IConnectSchoolDetail) =>
        dispatch({ type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL, data })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listConnectSchools: state.ConnectSchools.items,
    connectSchoolsDetail: state.ConnectSchoolsDetail,
    totalItems: state.ConnectSchools.totalItems,
    listRegions: state.Regions.items,
    listSkills: state.Skills.items,
    listJobNames: state.JobNames.items,
    listLanguages: state.Languages.items,
    openDrawer: state.MutilBox.drawerState.openDrawer
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSchoolsList);