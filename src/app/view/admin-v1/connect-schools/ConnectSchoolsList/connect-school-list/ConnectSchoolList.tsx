import React from 'react';
import './ConnectSchoolList.scss';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../common/const/actions';
import { Button, Table, Icon, Select, Row, Col, Avatar, Drawer, Slider, Tooltip, Pagination, Collapse } from 'antd';
import { timeConverter } from '../../../../../../common/utils/convertTime';
import { TYPE } from '../../../../../../common/const/type';
import { IptLetterP } from '../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IRegion } from '../../../../../../redux/models/regions';
import { IConnectSchools, IConnectSchoolsFilter, IConnectSchool } from '../../../../../../redux/models/connect-schools';
import { findIdWithValue } from '../../../../../../common/utils/findIdWithValue';
import { ISkill } from '../../../../../../redux/models/find-candidates-detail';
import { ILanguage } from '../../../../../../redux/models/languages';
import { IModalState } from '../../../../../../redux/models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../common/const/break-cumb';
import CardSchool from '../../../../layout/card-schools/CardSchool';
import Loading from '../../../../layout/loading/Loading';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
let { Option } = Select;
const { Panel } = Collapse;

let ImageRender = (props: any) => {
    if (props.src && props.src !== "") {
        return <Avatar src={props.src} alt={props.alt} style={{ width: "60px", height: "60px" }} icon="user" />
    } else {
        return <div style={{ width: "60px", height: "60px", padding: "20px 0px" }}>
            <Icon type="area-chart" />
        </div>
    }
};

interface IConnectSchoolsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    handleModal: Function;
    handleDrawer: Function;
    getListConnectSchools: Function;
    getTypeManagement: Function;
    getAnnoucements: Function;
    getAnnoucementDetail: Function;
};

interface IConnectSchoolsListState {
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
    body?: IConnectSchoolsFilter;
    open_drawer: boolean;
    type_view?: string;
};

class ConnectSchoolsList extends React.Component<IConnectSchoolsListProps, IConnectSchoolsListState> {
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
            body: {

            },
            open_drawer: false
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

    static getDerivedStateFromProps(nextProps: IConnectSchoolsListProps, prevState: IConnectSchoolsListState) {
        if (nextProps.list_connect_schools && nextProps.list_connect_schools !== prevState.list_connect_schools) {
            let { list_connect_schools } = prevState;
            if (nextProps.list_connect_schools) {
                list_connect_schools = nextProps.list_connect_schools;
            }
            return {
                list_connect_schools,
                loading_table: false,
            }
        } return null;
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

    onCloseDrawer = () => {
        this.setState({ open_drawer: false })
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

    render() {
        let {
            list_connect_schools,
            loading_table,
            pageIndex,
            pageSize,
            open_drawer,
        } = this.state;

        let {
            totalItems,
            list_regions,
        } = this.props;

        return (
            <>
                <DrawerConfig
                    title="Thông tin nhà trường"
                    width={900}
                >
                    <Collapse
                        defaultActiveKey={['1']}
                    // onChange={callback}
                    // expandIconPosition={expandIconPosition}
                    >
                        <Panel header="This is panel header 1" key="1">
                            <div>
                                em Ipsum is that it has a more-or-less normal distrib
                                ution of letters, as opposed to using 'Content here, co
                                ntent here', making it look like readable English. Many desktop publis
                                hing packages and web page editors now use Lorem Ipsum as their default mo
                                del text, and a search for 'lorem ipsum' will unc
                                over many web sites still in their infancy. Various versions ha
                                ve evolved over the years, sometimes by accident, sometime
                            </div>
                        </Panel>
                        <Panel header="This is panel header 2" key="2" >
                            <div>
                                em Ipsum is that it has a more-or-less normal distrib
                                ution of letters, as opposed to using 'Content here, co
                                ntent here', making it look like readable English. Many desktop publis
                                hing packages and web page editors now use Lorem Ipsum as their default mo
                                del text, and a search for 'lorem ipsum' will unc
                                over many web sites still in their infancy. Various versions ha
                                ve evolved over the years, sometimes by accident, sometime
                            </div>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" >
                            <div>
                                em Ipsum is that it has a more-or-less normal distrib
                                ution of letters, as opposed to using 'Content here, co
                                ntent here', making it look like readable English. Many desktop publis
                                hing packages and web page editors now use Lorem Ipsum as their default mo
                                del text, and a search for 'lorem ipsum' will unc
                                over many web sites still in their infancy. Various versions ha
                                ve evolved over the years, sometimes by accident, sometime
                            </div>
                        </Panel>
                    </Collapse>
                </DrawerConfig>
                <div className="common-content">
                    <h5>
                        Tìm kiếm ứng viên
                        <Button
                            onClick={() => this.searchConnectSchools()}
                            type="primary"
                            style={{
                                float: "right",
                                margin: "0px 5px"
                            }}
                        >
                            <Icon type={loading_table ? "loading" : "filter"} />
                            Tìm kiếm
                        </Button>
                    </h5>
                    <div className="table-operations">
                        <Row >
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
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
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
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
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Tỉnh thành"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.regionID)}
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
                                <IptLetterP value={"Trạng thái tìm việc"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.lookingForJob)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.MALE}>Nam </Option>
                                    <Option value={TYPE.FEMALE}>Nữ</Option>
                                </Select>
                            </Col>
                        </Row>
                        <div className="school-content">
                            {!loading_table ? (list_connect_schools && list_connect_schools.length > 0 ? list_connect_schools.map(
                                (item: IConnectSchool, index: number) => <div onClick={() => this.props.handleDrawer()}><CardSchool key={index} {...item} /></div>
                            ) : null) : <Loading />}
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
    getListConnectSchools: (body: IConnectSchoolsFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL, body, pageIndex, pageSize }),
    handleModal: (modalState: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    handleDrawer: (drawerState: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_connect_schools: state.ConnectSchools.items,
    totalItems: state.ConnectSchools.totalItems,
    list_regions: state.Regions.items,
    list_skills: state.Skills.items,
    list_job_names: state.JobNames.items,
    list_languages: state.Languages.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectSchoolsList);