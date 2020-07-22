import React, { PureComponent, } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { Button, Table, Icon, Modal, Avatar, Tooltip, Popconfirm } from 'antd';
import { timeConverter } from '../../../../../../utils/convertTime';
import { IAppState } from '../../../../../../redux/store/reducer';
import { ISavedCandidateProfile } from '../../../../../../models/saved-candidate-profiles';
import { DELETE } from '../../../../../../const/method';
import { _requestToServer } from '../../../../../../services/exec';
import { SAVED_PROFILE } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
// import { Link } from 'react-router-dom';
// import { TYPE } from '../../../../../../const/type';
import CanProPop from '../../../../layout/can-pro-pop/CanProProp';
//@ts-ignore
import avatar_men from './../../../../../../assets/image/no-avatar.png';
//@ts-ignore
import avatar_women from './../../../../../../assets/image/women-no-avatar.jpg';
import { TYPE } from '../../../../../../const/type';
// import { IptLetter } from '../../../../layout/common/Common';
// import CandidateProfile from '../../../../layout/candidate-profile/CandidateProfile';

// const { Option } = Select;

let ImageRender = (props: { src?: string, gender?: "MALE" | "FEMALE", alt?: string }) => {
    const [err, setErr] = React.useState(false)
    return <Avatar
        shape="square"
        src={!err && props.src && props.src !== '' ? props.src : (props.gender === "MALE" ? avatar_men : avatar_women)}
        alt={props.alt}
        style={{ width: 50, height: 50 }}
        //@ts-ignore
        onError={() => setErr(true)}
    />
};

interface IProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListSavedCandidateProfiles: Function;
    getAnnoucementDetail: Function;
    
};

interface IStates {
    dataTable?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    showModal?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    typeMng?: Array<any>;
    valueType?: string;
    announcementTypeID?: number;
    adminID?: string;
    listFindCandidates?: Array<any>;
    id?: string;
    loadingTable?: boolean;
    body: any;
    profileType?: string;
};

class SavedCandidateProfilesList extends PureComponent<IProps, IStates> {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            pageIndex: 0,
            pageSize: 10,
            showModal: false,
            loading: false,
            pendingJob: null,
            valueType: null,
            announcementTypeID: null,
            adminID: null,
            listFindCandidates: [],
            id: null,
            loadingTable: true,
            profileType: TYPE.STUDENT,
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
        };
    }

    editToolAction = () => {
        let { id, profileType } = this.state;
        return <>
            <div style={{display:'flex'}}>
            <Tooltip
                title={"Xem chi tiết"}
            >
                {/* <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}?type=${profileType}`} target="_blank"> */}
                   <div onClick={() => window.open(routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}?type=${profileType}`)} >
                    <Icon
                        className="f-ic edit"
                        type="search"
                        // twoToneColor="black"
                        theme="outlined"
                    />
                    </div>
                {/* </Link> */}
            </Tooltip>

            <Tooltip placement="topRight" title={"Xóa ứng viên"} >
                <Popconfirm
                    placement="topRight"
                    title={"Xóa khỏi danh sách"}
                    onConfirm={(event: any) => this.createRequest()}
                    okText="Xóa"
                    cancelText="Hủy"
                    
                >
                    <div >
                    <Icon
                        className="f-ic delete"
                        type="delete"
                        theme="outlined"
                        // twoToneColor="red"
                    />
                    </div>
                </Popconfirm>
                {/* <Icon
                        className="f-ic delete"
                        type="delete"
                        onClick={() => this.props.handleModal({ msg: "Bạn chắc chắn muốn  xóa bài đăng này ?", typeModal: TYPE.DELETE })}
                    /> */}
            </Tooltip>
            {/* <Popconfirm
                placement="topRight"
                title={"Chặn người dùng này"}
                onConfirm={(event: any) => this.createRequest()}
                okText="Chặn"
                cancelText="Hủy"
            >
                <Icon style={{ padding: 5 }} type="stop" theme="twoTone" twoToneColor="red" />
            </Popconfirm> */}
            </div>
        </>
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

        // {
        //     title: 'Ảnh',
        //     width: 30,
        //     className: 'action',
        //     dataIndex: 'avatarUrl',
        //     key: 'avatarUrl',
        //     fixed: 'left',
        // },
        {
            title: 'Ứng viên',
            dataIndex: 'name',
            className: 'action',
            key: 'name',
            width: 150,
            render: ({ item }) => this.renderCandidate(item)

        },
        {
            title: 'Mở khóa',
            className: 'action',
            dataIndex: 'unlocked',
            key: 'unlocked',
            width: 80,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            className: 'action',
            key: 'birthday',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'lookingForJob',
            key: 'lookingForJob',
            width: 110,
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 'auto',
        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'region',
            className: 'action',
            key: 'region',
            width: 100,
        },

        {
            title: 'Ngày lưu',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 100,
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

    renderCandidate = (item) => {

        return (
            <div>
                <ImageRender
                    src={item.student ?
                        item.student.avatarUrl : ""} gender={item.student ? item.student.gender : null} alt="Ảnh đại diện" />
            {/* item && item[type] ? */}
           
                <CanProPop
                    id={item.student.id}
                    background={item.student.coverUrl}
                    avatar={item.student.avatarUrl}
                    unlocked={item.student.unlocked}
                    email={item.student.email}
                    gender={item.student.gender}
                    phone={item.student.phone}
                    // profileType={profileType}
                    children={
                        (item.student.lastName ? item.student.lastName : "") + " " + (item.student.firstName ? item.student.firstName : "")
                    }
                    
                /> 
            </div>
        )
    }

    onToggleModal = () => {
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.listFindCandidates && nextProps.listFindCandidates !== prevState.listFindCandidates) {
            let { pageIndex, pageSize, profileType } = prevState;
            let dataTable = [];
            let type = profileType === TYPE.STUDENT ? "student" : "candidate"

            nextProps.listFindCandidates.forEach((item: ISavedCandidateProfile, index: number) => {
                const Lock = () => (
                    <>
                        <Tooltip
                            placement="top" title={item[type] && item[type].unlocked ? "Đã mở khóa" : "Chưa mở khóa"}>
                            <Icon
                                type={item[type] && item[type].unlocked ? "unlock" : "lock"}
                                style={{ padding: "5px 5px", color: item[type] && item[type].unlocked ? "green" : "red" }}
                                theme={"filled"}
                            />
                        </Tooltip>
                    </>
                );

                dataTable.push({
                    key: item[type] ? item[type].id : null,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    avatarUrl:
                        <ImageRender
                            src={item[type] ?
                                item[type].avatarUrl : ""} gender={item[type] ? item[type].gender : null} alt="Ảnh đại diện" />,
                    unlocked: <Lock />,
                    // name:
                    //     item && item[type] ?
                    //         <CanProPop
                    //             id={item[type].id}
                    //             background={item[type].coverUrl}
                    //             avatar={item[type].avatarUrl}
                    //             unlocked={item[type].unlocked}
                    //             email={item[type].email}
                    //             gender={item[type].gender}
                    //             phone={item[type].phone}
                    //             profileType={profileType}
                    //             children={
                    //                 (item[type].lastName ? item[type].lastName : "") + " " + (item[type].firstName ? item[type].firstName : "")
                    //             } 

                    //             /> : null
                    name: item && item[type] ? { item } : null,
                    lookingForJob: item[type] && item[type].lookingForJob ? "Đang tìm việc" : "Đã có việc",
                    address: item[type] ? item[type].address : "",
                    region: item[type] && item[type].region ? item[type].region.name : "",
                    birthday: item[type] && item[type].birthday !== -1 ? timeConverter(item[type].birthday, 1000) : null,
                    createdDate: timeConverter(item.createdDate, 1000),
                });
            })
            return {
                listFindCandidates: nextProps.listFindCandidates,
                dataTable,
                loadingTable: false,
            }
        } return null;
    };

    async componentDidMount() {
        await this.searchSavedCandidateProfiles();
    };

    handleId = (event) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loadingTable: true, pageSize: event.pageSize });
        await this.searchSavedCandidateProfiles();
    };

    searchSavedCandidateProfiles = async () => {
        let { pageIndex, pageSize, profileType } = this.state;
        await this.props.getListSavedCandidateProfiles(pageIndex, pageSize, profileType);
    };

    createRequest = async (type?: string) => {
        let { id, profileType } = this.state;
        await _requestToServer(
            DELETE,
            SAVED_PROFILE(
                profileType === TYPE.STUDENT
                    ? "students" : "candidates"
            ) + '/saved',
            [id],
            undefined,
            undefined,
            EMPLOYER_HOST,
            true,
            false,
        ).then(
            (res: any) => {
                if (res) { this.searchSavedCandidateProfiles() }
            }
        )
    }

    render() {
        let {
            dataTable,
            showModal,
            loadingTable,
        } = this.state;

        let {
            totalItems,
        } = this.props
        return (
            <>
                <div className="common-content">
                    <Modal
                        visible={showModal}
                        title="XEM TRƯỚC BÀI ĐĂNG"
                        onCancel={this.onToggleModal}
                        style={{ top: "5vh" }}
                        footer={[
                            <Button
                                type={"danger"}
                                onClick={this.onToggleModal}
                            >
                                Đóng
                        </Button>
                        ]}
                    >
                    </Modal>
                    <h5>
                        Danh sách ứng viên đã lưu {`(${totalItems})`}
                        {/* <Tooltip title="Lọc tìm kiếm" >
                            <Button
                                onClick={() => this.searchSavedCandidateProfiles()}
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
                    {/* <Row>
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                            <IptLetter value={"Loại hồ sơ"} />
                            <Select
                                showSearch
                                defaultValue="Sinh viên"
                                style={{ width: "100%" }}
                                onChange={(event: any) => this.setState({ profileType: event })}
                            >
                                <Option value={TYPE.STUDENT}>Sinh viên</Option>
                                <Option value={TYPE.CANDIDATE}>Ứng viên</Option>
                            </Select>
                        </Col>
                    </Row> */}
                    <div className="table-operations" style={{ textAlign: 'center' }}>
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loadingTable}
                            dataSource={dataTable}
                            scroll={{ x: 980 }}
                            bordered
                            rowKey={"saveCandidate"}
                            pagination={{ total: totalItems, showSizeChanger: true }}
                            size="middle"
                            onChange={this.setPageIndex}
                            onRow={(record: any, rowIndex: any) => {
                                return {
                                    onClick: (event: any) => {
                                    }, // click row
                                    onMouseEnter: () => {
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
    getListSavedCandidateProfiles: (
        pageIndex: number,
        pageSize: number,
        profileType?: string
    ) =>
        dispatch({ type: REDUX_SAGA.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES, pageIndex, pageSize, profileType }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listFindCandidates: state.SavedCandidateProfiles.items,
    totalItems: state.SavedCandidateProfiles.totalItems,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SavedCandidateProfilesList);