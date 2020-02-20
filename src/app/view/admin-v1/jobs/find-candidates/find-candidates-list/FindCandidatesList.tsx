import React from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Select, Row, Col, Avatar, Drawer, Slider, Tooltip } from 'antd';
import { timeConverter } from '../../../../../../utils/convertTime';
import { TYPE } from '../../../../../../const/type';
import { IptLetterP } from './../../../../layout/common/Common';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IRegion } from '../../../../../../models/regions';
import { IFindCandidate, IFindCandidateFilter } from '../../../../../../models/find-candidates';
import findIdWithValue from '../../../../../../utils/findIdWithValue';
import { ISkill } from '../../../../../../models/find-candidates-detail';
import { ILanguage } from '../../../../../../models/languages';
import { IModalState } from '../../../../../../models/mutil-box';
import { IDrawerState } from 'antd/lib/drawer';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import CanProPop from './../../../../layout/can-pro-pop/CanProProp';
//@ts-ignore
import avatar_men from './../../../../../../assets/image/no-avatar.png';
//@ts-ignore
import avatar_women from './../../../../../../assets/image/women-no-avatar.jpg';
import { _requestToServer } from './../../../../../../services/exec';
import { POST, DELETE } from '../../../../../../const/method';
import { SAVED_CANDIDATE_PROFILES } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';

let { Option } = Select;

let ImageRender = (props: { src?: string, gender?: "MALE" | "FEMALE", alt?: string }) => {
    const [err, setErr] = React.useState(false)
    return <Avatar
        shape="square"
        src={!err && props.src ? props.src : (props.gender === "MALE" ? avatar_men : avatar_women)}
        alt={props.alt}
        style={{ width: 50, height: 50 }}
        //@ts-ignore
        onError={() => setErr(true)}
    />
};

interface IFindCandidatesListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    handleModal: Function;
    getListFindCandidates: Function;
    getTypeManagement: Function;
    getAnnoucements: Function;
    getAnnoucementDetail: Function;
};

interface IFindCandidatesListState {
    data_table?: Array<any>;
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
    list_find_candidates?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body?: IFindCandidateFilter;
    open_drawer: boolean;
    type_view?: string;
};

class FindCandidatesList extends React.Component<IFindCandidatesListProps, IFindCandidatesListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            show_modal: false,
            loading: false,
            announcementTypeID: null,
            birthday: null,
            adminID: null,
            hidden: false,
            list_find_candidates: [],
            id: null,
            loading_table: true,
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
            width: 50,
            dataIndex: 'avatarUrl',
            className: 'action',
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
            title: 'Hoàn thiện hồ sơ',
            dataIndex: 'completePercent',
            className: 'action',
            key: 'completePercent',
            width: 100,
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
            width: 300,
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
            title: 'Xác minh',
            dataIndex: 'profileVerified',
            className: 'action',
            key: 'profileVerified',
            width: 100,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            className: 'action',
            dataIndex: 'operation',
            width: 100,
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

    static getDerivedStateFromProps(nextProps?: IFindCandidatesListProps, prevState?: IFindCandidatesListState) {
        if (nextProps.list_find_candidates && nextProps.list_find_candidates !== prevState.list_find_candidates) {
            let { pageIndex, pageSize } = prevState;
            let data_table = [];
            nextProps.list_find_candidates.forEach((item: IFindCandidate, index: number) => {
                let EditToolTip = (id?: string) => (
                    <>
                        <Tooltip placement="top" title={"Xem chi tiết"}>
                            <a
                                href={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon
                                    className='test'
                                    style={{ padding: 5, margin: 2 }}
                                    type="search"
                                />
                            </a>
                        </Tooltip>
                        <Tooltip placement="top" title={item.saved ? "Hủy lưu" : "Lưu lại"}>
                            <Icon
                                className='test'
                                style={{
                                    padding: 5,
                                    margin: 2,
                                    color: item.saved ? 'red' : 'black'
                                }}
                                type="save"
                                onClick={async () => {
                                    await _requestToServer(
                                        item.saved ? DELETE : POST,
                                        item.saved ? SAVED_CANDIDATE_PROFILES + `/saved` : SAVED_CANDIDATE_PROFILES + `/${id}/saved`,
                                        item.saved ? [id] : undefined,
                                        undefined,
                                        undefined,
                                        EMPLOYER_HOST,
                                        false,
                                        true,
                                    ).then((res: any) => {
                                        if (res) {
                                            nextProps.getListFindCandidates(prevState.body, prevState.pageIndex, prevState.pageSize)
                                        }
                                    })
                                }}
                            />
                        </Tooltip>
                    </>
                );

                const Lock = () => (
                    <>
                        <Tooltip placement="top" title={item.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}>
                            <Icon
                                type={item.unlocked ? "unlock" : "lock"}
                                theme={'filled'}
                                style={{ padding: "5px 5px", color: item.unlocked ? "green" : "red" }}
                            />
                        </Tooltip>
                    </>
                );

                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    avatarUrl: <ImageRender src={item.avatarUrl} gender={item.gender} alt="Ảnh đại diện" />,
                    name:
                        <CanProPop
                            id={item.id}
                            background={item.coverUrl}
                            avatar={item.avatarUrl}
                            data={item}
                            children={(item.lastName ? item.lastName : "") + " " + (item.firstName ? item.firstName : "")}
                        />,
                    lookingForJob: item.lookingForJob ? "Đang tìm việc" : "Đã có việc",
                    address: item.address ? item.address : "",
                    region: item.region ? item.region.name : "",
                    birthday: item.birthday === -1 ? "" : timeConverter(item.birthday, 1000),
                    unlocked: Lock(),
                    operation: EditToolTip(item.id),
                    completePercent: item.completePercent + '%',
                    profileVerified: item.profileVerified ? 'Đã xác minh' : ' Chưa xác minh'
                });
            });

            return {
                list_find_candidates: nextProps.list_find_candidates,
                data_table,
                loading_table: false,
            }
        }

        return null
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
        await this.props.getListFindCandidates(body, pageIndex, pageSize);
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

    onCancelAdvancedFind = () => {
        let { body } = this.state;
        body.skillIDs = [];
        body.birthYearStart = null;
        body.birthYearStart = null;
        body.languageIDs = [];
        body.jobNameIDs = [];
        this.setState({
            body,
            open_drawer: false
        })
    }

    advancedFilter = () => {
        let { body } = this.state;

        let {
            list_skills,
            list_languages,
        } = this.props;

        let list_skill_options = list_skills.map((item: ISkill, index: number) => (<Option key={index} value={item.name} children={item.name} />));
        let list_language_options = list_languages.map((item: ILanguage, index: number) => (<Option key={index} value={item.name} children={item.name} />));
        return <>
            <IptLetterP
                value={"Năm sinh"}
            />
            <Slider
                min={1970}
                max={2010}
                range
                style={{
                    marginBottom: 50
                }}
                defaultValue={[1970, 2010]}
                marks={
                    {
                        2010: {
                            style: {
                            },
                            label: <strong>2010</strong>
                        },
                        1980: "80",
                        1990: "90",
                        2000: "2k",
                        1970: {
                            style: {
                            },
                            label: <strong>1970</strong>
                        }
                    }
                }
                onChange={(event: any) => {
                    body.birthYearStart = event[0];
                    body.birthYearEnd = event[1];
                    this.setState({ body });
                }}
            />
            <hr />
            < >
                <IptLetterP value={"Trạng thái hồ sơ"} />
                <Select
                    showSearch
                    defaultValue="Tất cả"
                    style={{ width: "100%" }}
                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.completeProfile)}
                >
                    <Option value={null}>Tất cả</Option>
                    <Option value={TYPE.TRUE}>Hoàn thiện </Option>
                    <Option value={TYPE.FALSE}>Chưa hoàn thiện</Option>
                </Select>
            </>
            <>
                <IptLetterP value={"Trạng thái xác minh"} />
                <Select
                    showSearch
                    defaultValue="Tất cả"
                    style={{ width: "100%" }}
                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.profileVerified)}
                >
                    <Option value={null}>Tất cả</Option>
                    <Option value={TYPE.TRUE}>Đã xác minh </Option>
                    <Option value={TYPE.FALSE}>Chưa xác minh </Option>
                </Select>
            </>
            <>
                <IptLetterP value={"Loại kĩ năng"} />
                <Select
                    mode="multiple"
                    size="default"
                    placeholder="ex: Giao tiếp, Tiếng Anh,..."
                    value={findIdWithValue(list_skills, body.skillIDs, "id", "name")}
                    onChange={
                        (event: any) => {
                            let list_data = findIdWithValue(list_skills, event, "name", "id")
                            body.skillIDs = list_data;
                            this.setState({ body })
                        }
                    }
                    style={{ width: "100%" }}
                >
                    {list_skill_options}
                </Select>
            </>
            <>
                <IptLetterP value={"Loại ngôn ngữ"} />
                <Select
                    mode="multiple"
                    size="default"
                    placeholder="ex: Tiếng Anh, Tiếng Trung,.."
                    value={findIdWithValue(list_languages, body.languageIDs, "id", "name")}
                    onChange={
                        (event: any) => {
                            let list_data = findIdWithValue(list_languages, event, "name", "id")
                            body.languageIDs = list_data;
                            this.setState({ body })
                        }
                    }
                    style={{ width: "100%" }}
                >
                    {list_language_options}
                </Select>
            </>
            <div style={{ padding: "40px 0px 20px ", width: "100%" }}>
                <Button
                    icon="close"
                    type="dashed"
                    style={{
                        float: "left"
                    }}
                    onClick={() => this.onCancelAdvancedFind()}
                >
                    Hủy
             </Button>
                <Button
                    icon="search"
                    type="primary"
                    style={{
                        float: "right"
                    }}
                    onClick={async () => {
                        await this.setState({ open_drawer: false });
                        await setTimeout(() => {
                            this.searchFindCandidate();
                        }, 250);
                    }}
                >
                    Tìm kiếm
            </Button>
            </div>
        </>
    }

    render() {
        let {
            data_table,
            loading_table,
            open_drawer,
            body
        } = this.state;

        let {
            totalItems,
            list_regions,
            list_job_names
        } = this.props;

        let list_job_names_options = list_job_names.map((item: ILanguage, index: number) => (<Option key={index} value={item.name} children={item.name} />));

        return (
            <>
                <Drawer
                    title="Tìm kiếm nâng cao"
                    placement="right"
                    width={"60vw"}
                    closable={true}
                    onClose={() => this.onCancelAdvancedFind()}
                    visible={open_drawer}
                >
                    {this.advancedFilter()}
                </Drawer>
                <div className="common-content">
                    <h5>
                        Tìm kiếm ứng viên {`(${totalItems})`}
                        <Tooltip title="Tìm kiếm" >
                            <Button
                                onClick={() => this.searchFindCandidate()}
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
                        <Tooltip title="Bộ lọc nâng cao" >
                            <Button
                                onClick={() => this.setState({ open_drawer: true })}
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 10px",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px"
                                }}
                                icon={"file-search"}
                            />
                        </Tooltip>
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
                                <IptLetterP value={"Trạng thái mở khóa"} />
                                <Select
                                    showSearch
                                    defaultValue="Tất cả"
                                    style={{ width: "100%" }}
                                    onChange={(event: any) => this.onChangeType(event, TYPE.FIND_CANDIDATES_FILTER.unlocked)}
                                >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={TYPE.TRUE}>Đã mở khóa </Option>
                                    <Option value={TYPE.FALSE}>Chưa mở khóa</Option>
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                                <IptLetterP value={"Loại công việc"} />
                                <Select
                                    mode="multiple"
                                    size="default"
                                    placeholder="ex: Nhân viên văn phòng , Phục vụ ..."
                                    value={findIdWithValue(list_job_names, body.jobNameIDs, "id", "name")}
                                    onChange={
                                        (event: any) => {
                                            let list_data = findIdWithValue(list_job_names, event, "name", "id")
                                            body.jobNameIDs = list_data;
                                            this.setState({ body })
                                        }
                                    }
                                    style={{ width: "100%" }}
                                >
                                    {list_job_names_options}
                                </Select>
                            </Col>
                        </Row>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 1220 }}
                            bordered
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onClick: (event: any) => {
                                    }, // click row
                                    onMouseEnter: (event) => {
                                        localStorage.setItem('id_candidate', record.key)
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
    getListFindCandidates: (body: IFindCandidateFilter, pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.FIND_CANDIDATES.GET_FIND_CANDIDATES, body, pageIndex, pageSize }),
    handleModal: (modalState: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
    handleDrawer: (drawerState: IDrawerState) =>
        dispatch({ type: REDUX.HANDLE_DRAWER, drawerState }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_find_candidates: state.FindCandidates.items,
    totalItems: state.FindCandidates.totalItems,
    list_regions: state.Regions.items,
    list_skills: state.Skills.items,
    list_job_names: state.JobNames.items,
    list_languages: state.Languages.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FindCandidatesList);