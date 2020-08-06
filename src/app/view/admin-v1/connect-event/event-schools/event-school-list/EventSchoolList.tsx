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
import CropImage from '../../../../layout/crop-image/CropImage';
import { _requestToServer } from '../../../../../../services/exec';
import { PUT, GET } from '../../../../../../const/method';
import { EVENT_SCHOOLS } from '../../../../../../services/api/private.api';
import { sendFileHeader } from '../../../../../../services/auth';
// import { Link } from 'react-router-dom';


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
    dataTable?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    eid?: string;
    openModal?: boolean;
    loading?: boolean;
    typeMng?: Array<any>;
    announcementTypeID?: number;
    hidden?: boolean;
    listEventSchools?: Array<any>;
    id?: string;
    loadingTable?: boolean;
    body?: IEventSchoolFilter;
    openDrawer: boolean;
    typeView?: string;
    modalType?: "BANNER" | "DETAIL";
    newBanner?: any;
    bannerUrlEmployer?: string;
    loadingUploadBanner?: boolean
};

class EventSchoolsList extends React.Component<IEventSchoolsListProps, IEventSchoolsListState> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            pageIndex: 0,
            pageSize: 10,
            openModal: false,
            loading: false,
            announcementTypeID: null,
            hidden: false,
            listEventSchools: [],
            id: null,
            loadingTable: true,
            modalType: null,
            body: {
                schoolID: null,
                createdDate: null,
                startedDate: null,
                finishedDate: null,
                started: null,
                finished: null
            },
            openDrawer: false,
            eid: null,
            newBanner: null,
            bannerUrlEmployer: null,
            loadingUploadBanner: false
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
            width: 140,
            render: ({ item }) => this.renderName(item)
        },
        {
            title: 'Ngày bắt đầu / kết thúc',
            dataIndex: 'startedDate',
            className: 'action',
            key: 'startedDate',
            width: 120,
            render: ({ item }) => this.renderDate(item)
        },
        {
            title: 'Nơi tổ chức / Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: ({ item }) => this.renderAddress(item)
        },
        {
            title: 'Thao tác',
            className: 'action',
            dataIndex: 'data',
            key: 'data',
            render: (data) => this.EditToolTip(data),
            width: 80,
            fixed: 'right',
        },
    ];

    onToggleModal = () => {
        let { openModal } = this.state;
        this.setState({ openModal: !openModal });
    };

    EditToolTip = (item?: IEventSchool) => {
        return <>

            <Tooltip placement="top" title={"Xem bài đăng"}>
                <div 
                onClick={()=> window.open(routeLink.EVENT + routePath.JOBS + `/list?eid=${item.id}`)}
                >
                    {/* <Link
                        to={routeLink.EVENT + routePath.JOBS + `/list?eid=${item.id}`}
                    > */}
                        <Icon
                            className="f-ic copy"
                            // style={{ color: "black" }}
                            type="snippets"
                            theme="outlined"
                        />
                    {/* </Link> */}
                </div>
            </Tooltip>

            {/* <Tooltip placement="top" title={"Sửa Banner"}>
                <Icon
                    type={"tool"}
                    className="f-ic"
                    style={{

                        color: 'blue'
                    }}
                    onClick={() => this.setState({ modalType: "BANNER", openModal: true })}
                />
            </Tooltip> */}
            {/* <Tooltip title="Tạo bài đăng mới" >
                <Link to={routeLink.EVENT + routePath.JOBS + routePath.CREATE + `?eid=${item.id}`} >
                    <Icon
                        type={"plus"}
                        className="f-ic"
                        style={{
                            color: "green"
                        }}
                    />
                </Link>
            </Tooltip> */}
        </>
    }
    renderName = (item) => {
        return (<div>
            <a className="titleJob" style={{ fontWeight: "bold", fontSize: '1.12em', color: '#1890ff' }} onClick={
                async () => {
                    this.props.getEventSchoolDetail(item.id);
                    this.reloadDetailEvent(item.id)
                    this.onToggleModal();
                }
            } target="_blank">{item.name ? item.name : ""}</a>
        </div>)
    }
    reloadDetailEvent(id) {
        this.setState({ bannerUrlEmployer: null })
        _requestToServer(
            GET,
            EVENT_SCHOOLS + `/${id}/banner`,
            undefined,
            undefined,
            sendFileHeader,
            undefined,
            false,
            false
        ).then(data => {
            // console.log(data)
            this.setState({ bannerUrlEmployer: data.data && data.data.bannerUrl })
        })
        this.setState({ modalType: "DETAIL" })
    }
    renderDate = (item) => {
        return (<div>
            <div>{item.startedDate !== -1 ? timeConverter(item.createdDate, 1000) : ""}</div>
            <div>{item.finishedDate !== -1 ? timeConverter(item.finishedDate, 1000) : ""}</div>
        </div>)
    }
    renderAddress = (item) => {
        return (<div>
            <div style={{ fontWeight: 600 }}>{item.school && item.school.name ? item.school.name : ''}</div>
            <div style={{ fontStyle: 'italic' }}>{item.school && item.school.address ? item.school.address : ''}</div>
        </div>)
    }
    static getDerivedStateFromProps(nextProps?: IEventSchoolsListProps, prevState?: IEventSchoolsListState) {
        if (nextProps.listEventSchools && nextProps.listEventSchools !== prevState.listEventSchools) {
            let dataTable = [];
            nextProps.listEventSchools.forEach((item: IEventSchool, index: number) => {
                dataTable.push({
                    id: item.school ? item.school.id : null,
                    index: index + 1,
                    bannerUrl: item.bannerUrl,
                    address: { item },
                    name: { item },
                    startedDate: { item },
                    data: item,
                    eid: item.id
                });
            });

            return {
                listEventSchools: nextProps.listEventSchools,
                dataTable,
                loadingTable: false,
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
        await this.setState({ pageIndex: event.current - 1, loadingTable: true, pageSize: event.pageSize });
        await this.searchEventSchool();
    };

    searchEventSchool = async () => {
        let { body, pageIndex, pageSize } = this.state;
        await this.props.getListEventSchools(body, pageIndex, pageSize);
    };

    onCloseDrawer = () => {
        this.setState({ openDrawer: false })
    };

    // onChangeType = (event: any, param?: string) => {
    //     let { body } = this.state;
    //     let { listRegions } = this.props;
    //     let value: any = event;
    //     listRegions.forEach((item: IRegion) => { if (item.name === event) { value = item.id } });
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

    uploadToServer = (event) => {
        console.log(event);
        this.setState({ newBanner: event.blobFile })
        // this.forceUpdate()
    }

    uploadBanner = () => {
        let { newBanner, eid } = this.state;
        let formData = new FormData();
        this.setState({ loadingUploadBanner: true })
        formData.append("banner", newBanner, "banner.jpg");

        _requestToServer(
            PUT,
            EVENT_SCHOOLS + `/${eid}/banner`,
            formData,
            undefined,
            sendFileHeader,
            undefined,
            false,
            true
        ).finally(() => {
            this.setState({ loadingUploadBanner: false })
            this.reloadDetailEvent(eid)
        })

        // this.onToggleModal();
    }

    render() {
        let {
            dataTable,
            loadingTable,
            openModal,
            modalType,
            newBanner
        } = this.state;

        let {
            totalItems,
            eventDetail
            // listJobNames
        } = this.props;

        // let listJobNames_options = listJobNames.map((item: ILanguage, index: number) => (<Option key={index} value={item.name} children={item.name} />));

        return (
            <>
                <Modal
                    visible={openModal}
                    onCancel={() => {
                        this.onToggleModal()
                        this.setState({ newBanner: null })
                    }}
                    title={modalType === "BANNER" ? "CẬP NHẬT BANNER" : <div style={{ textTransform: "uppercase" }}>{eventDetail.name}</div>}
                    width={'50vw'}
                    bodyStyle={{ padding: 10 }}
                    footer={[
                        modalType !== "BANNER" ? <Button
                            key={"ok"}
                            onClick={
                                () => this.setState({ modalType: 'BANNER' })
                            }
                            type={"primary"}
                            icon={"upload"}
                            children={
                                "Tải lên banner"
                            }
                        /> : undefined,
                        <Button
                            key={"close"}
                            onClick={this.onToggleModal}
                            type={"danger"}
                            children={"Đóng"}
                        />,
                        modalType === "BANNER" && newBanner ? <Button
                            key={"ok"}
                            onClick={
                                () => modalType === "BANNER" ? this.uploadBanner() : this.onToggleModal()
                            }
                            type={"primary"}
                            icon={this.state.loadingUploadBanner ? 'loading' : "tool"}
                            children={
                                "Cập nhật banner"
                            }
                        /> : undefined
                    ]}
                >
                    {modalType === "BANNER" ?
                        <CropImage uploadToServer={this.uploadToServer} />
                        : <EventDetail {...eventDetail} bannerUrlEmployer={this.state.bannerUrlEmployer} />}

                </Modal>
                <div className="common-content">
                    <h5 style={{ marginBottom: 10 }}>
                        Việc làm của nhà trường  {`(${totalItems})`}
                        {/* <Tooltip title="Lọc tìm kiếm" >
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
                                icon={loadingTable ? "loading" : "filter"}
                            />
                        </Tooltip> */}
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
                                        listRegions && listRegions.length >= 1 ?
                                            listRegions.map((item: IRegion, index: number) =>
                                                <Option key={index} value={item.name}>{item.name}</Option>
                                            ) : null
                                    }
                                </Select>
                            </Col>
                        </Row> */}
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loadingTable}
                            dataSource={dataTable}
                            scroll={{ x: 880 }}
                            rowKey={"event-school"}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onClick: (event: any) => {
                                        this.setState({ eid: record.eid })

                                    }, // click row
                                    onMouseEnter: () => {
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
    // listRegions: state.Regions.items,
    // listSkills: state.Skills.items,
    // listJobNames: state.JobNames.items,
    // listLanguages: state.Languages.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventSchoolsList);