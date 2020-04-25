import React from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { Button, Table, Icon, Tooltip, Modal } from 'antd';
import { timeConverter } from '../../../../../../utils/convertTime';
import { IAppState } from '../../../../../../redux/store/reducer';
// import { IRegion } from '../../../../../../models/regions';
import { IEventSchool, IEventSchoolFilter } from '../../../../../../models/event-schools';
// import { ILanguage } from '../../../../../../models/languages';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
// import { _requestToServer } from '../../../../../../services/exec';
import EventDetail from './EventDetail';

let ImageRender = (src?: string) => {
    return <img src={src}
        alt='banner event'
        style={{ width: 200, height: 80, margin: 0 }}
    />
};

interface IEventSchoolsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    handleModal: Function;
    getListEventSchools: Function;
    getEventSchoolDetail: Function;
};

interface IEventSchoolsListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    openModal?: boolean;
    loading?: boolean;
    type_management?: Array<any>;
    announcementTypeID?: number;
    hidden?: boolean;
    listEventSchools?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body?: IEventSchoolFilter;
    open_drawer: boolean;
    type_view?: string;
};

class EventSchoolsList extends React.Component<IEventSchoolsListProps, IEventSchoolsListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            openModal: false,
            loading: false,
            announcementTypeID: null,
            hidden: false,
            listEventSchools: [],
            id: null,
            loading_table: true,
            body: {
                schoolID: null,
                createdDate: null,
                startedDate: null,
                finishedDate: null,
                started: null,
                finished: null
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
            title: 'Banner',
            width: 150,
            dataIndex: 'bannerUrl',
            className: 'action',
            key: 'bannerUrl',
            render: (data) => ImageRender(data)
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'name',
            className: 'action',
            key: 'name',
            width: 100,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 100,
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'finishedDate',
            className: 'action',
            key: 'finishedDate',
            width: 100,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Nơi tổ chức',
            dataIndex: 'schoolName',
            className: 'action',
            key: 'schoolName',
            width: 100,
        },
       
        {
            title: 'Nơi tổ chức',
            dataIndex: 'schoolName',
            className: 'action',
            key: 'schoolName',
            width: 100,
        },
        {
            title: 'Thao tác',
            key: 'data',
            fixed: 'right',
            className: 'action',
            dataIndex: 'data',
            render: (data) => this.EditToolTip(data),
            width: 120,
        },
    ];

    onToggleModal = () => {
        let { openModal } = this.state;
        this.setState({ openModal: !openModal });
    };

    EditToolTip = (item?: IEventSchool) => {
        return <>
            <Tooltip placement="top" title={"Xem chi tiết"}>
                <Icon
                    className='test'
                    onClick={async () => {
                        this.props.getEventSchoolDetail(item.id);
                        this.onToggleModal();
                    }}
                    style={{ padding: 5, margin: 2 }}
                    type="search"
                />
            </Tooltip>
            <Tooltip placement="top" title={"Xem công việc"}>
                <a
                    href={routeLink.EVENT + routePath.JOBS + `/list?id=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon
                        className='test'
                        style={{ padding: 5, margin: 2, color: "green" }}
                        type="plus"
                    />
                </a>
            </Tooltip>
            {/* <Tooltip placement="top" title={"Sửa Banner"}>
                <Icon
                    type={"file-image"}
                    className='test'
                    style={{
                        padding: 5,
                        margin: 2,
                    }}
                />
            </Tooltip> */}
        </>
    }

    static getDerivedStateFromProps(nextProps?: IEventSchoolsListProps, prevState?: IEventSchoolsListState) {
        if (nextProps.listEventSchools && nextProps.listEventSchools !== prevState.listEventSchools) {
            let data_table = [];
            nextProps.listEventSchools.forEach((item: IEventSchool, index: number) => {
                data_table.push({
                    id: item.school ? item.school.id : null,
                    bannerUrl: item.bannerUrl,
                    schoolName: item.school && item.school.name ? item.school.name : '',
                    address: item.school && item.school.address ? item.school.address : '',
                    name: item.name ? item.name : '',
                    startedDate: item.startedDate ? timeConverter(item.createdDate) : "",
                    finishedDate: item.finishedDate  ? timeConverter(item.finishedDate) : "",
                    data: item
                });
            });

            return {
                listEventSchools: nextProps.listEventSchools,
                data_table,
                loading_table: false,
            }
        }

        return null
    };

    async componentDidMount() {
        await this.searchEventSchool();
    };

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchEventSchool();
    };

    searchEventSchool = async () => {
        let { body, pageIndex, pageSize } = this.state;
        await this.props.getListEventSchools(body, pageIndex, pageSize);
    };

    onCloseDrawer = () => {
        this.setState({ open_drawer: false })
    };

    // onChangeType = (event: any, param?: string) => {
    //     let { body } = this.state;
    //     let { list_regions } = this.props;
    //     let value: any = event;
    //     list_regions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } });
    //     switch (event) {
    //         case TYPE.TRUE:
    //             value = true;
    //             break;
    //         case TYPE.FALSE:
    //             value = false;
    //             break;
    //         default:
    //             break;
    //     };

    //     body[param] = value;
    //     this.setState({ body });
    // };

    render() {
        let {
            data_table,
            loading_table,
            openModal
        } = this.state;

        let {
            totalItems,
            eventDetail
            // list_job_names
        } = this.props;

        // let list_job_names_options = list_job_names.map((item: ILanguage, index: number) => (<Option key={index} value={item.name} children={item.name} />));

        return (
            <>
                <Modal
                    visible={openModal}
                    onCancel={this.onToggleModal}
                    title={eventDetail.name}
                    onOk={this.onToggleModal}
                >
                    <EventDetail {...eventDetail} />
                </Modal>
                <div className="common-content">
                    <h5>
                        Danh sách sự kiện {`(${totalItems})`}
                        <Tooltip title="Tìm kiếm" >
                            <Button
                                onClick={() => this.searchEventSchool()}
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
                        {/* <Row >
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
                        </Row> */}
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 430 }}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onClick: (event: any) => {

                                    }, // click row
                                    onMouseEnter: (event) => {

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
    getListEventSchools: (body: IEventSchoolFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_LIST_EVENT_SCHOOLS, body, pageIndex, pageSize }),
    getEventSchoolDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.EVENT_SCHOOLS.GET_EVENT_DETAIL, id }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listEventSchools: state.EventSchools.items,
    eventDetail: state.EventDetail,
    totalItems: state.EventSchools.totalItems,
    // list_regions: state.Regions.items,
    // list_skills: state.Skills.items,
    // list_job_names: state.JobNames.items,
    // list_languages: state.Languages.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventSchoolsList);