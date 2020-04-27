import React, { PureComponent, } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { Button, Table, Icon, Modal, Avatar, Tooltip, Popconfirm } from 'antd';
import { timeConverter } from '../../../../../../utils/convertTime';
import { IAppState } from '../../../../../../redux/store/reducer';
import { ISavedCandidateProfile } from '../../../../../../models/saved-candidate-profiles';
import { DELETE } from '../../../../../../const/method';
import { _requestToServer } from '../../../../../../services/exec';
import { SAVED_CANDIDATE_PROFILES } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import { Link } from 'react-router-dom';
// import { TYPE } from '../../../../../../const/type';
import CanProPop from '../../../../layout/can-pro-pop/CanProProp';
//@ts-ignore
import avatar_men from './../../../../../../assets/image/no-avatar.png';
//@ts-ignore
import avatar_women from './../../../../../../assets/image/women-no-avatar.jpg';

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

interface SavedCandidateProfilesListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListSavedCandidateProfiles: Function;
    getAnnoucementDetail: Function;
};

interface SavedCandidateProfilesListState {
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
};

class SavedCandidateProfilesList extends PureComponent<SavedCandidateProfilesListProps, SavedCandidateProfilesListState> {
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
        let { id } = this.state;
        return <>
            <Tooltip
                title={"Xem chi tiết"}
            >
                <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`} target="_blank">
                    <Icon
                        className="f-ic"
                        type="search"
                        twoToneColor="blue"
                    />
                </Link>
            </Tooltip>
            <Popconfirm
                placement="topRight"
                title={"Xóa khỏi danh sách"}
                onConfirm={(event: any) => this.createRequest()}
                okText="Xóa"
                cancelText="Hủy"
            >
                <Icon
                    className="f-ic"
                    type="delete"
                    theme="twoTone"
                    twoToneColor="red"
                />
            </Popconfirm>
            {/* <Popconfirm
                placement="topRight"
                title={"Chặn người dùng này"}
                onConfirm={(event: any) => this.createRequest()}
                okText="Chặn"
                cancelText="Hủy"
            >
                <Icon style={{ padding: 5 }} type="stop" theme="twoTone" twoToneColor="red" />
            </Popconfirm> */}
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

        {
            title: 'Ảnh',
            width: 30,
            className: 'action',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            fixed: 'left',
        },
        {
            title: 'Mở khóa',
            className: 'action',
            dataIndex: 'unlocked',
            key: 'unlocked',
            width: 80,
        },
        {
            title: 'Ngày lưu',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'lookingForJob',
            key: 'lookingForJob',
            width: 100,
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
            width: 270,
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
            width: 80,
            render: () => this.editToolAction()
        },
    ];

    onToggleModal = () => {
        let { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.listFindCandidates && nextProps.listFindCandidates !== prevState.listFindCandidates) {
            let { pageIndex, pageSize } = prevState;
            let dataTable = [];
            nextProps.listFindCandidates.forEach((item: ISavedCandidateProfile, index: number) => {
                const Lock = () => (
                    <>
                        <Tooltip placement="top" title={item.candidate.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}>
                            <Icon
                                type={item.candidate.unlocked ? "unlock" : "lock"}
                                style={{ padding: "5px 5px", color: item.candidate.unlocked ? "green" : "red" }}
                                theme={"filled"}
                            />
                        </Tooltip>
                    </>
                );

                dataTable.push({
                    key: item.candidate.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    avatarUrl: <ImageRender src={item.candidate.avatarUrl} gender={item.candidate.gender} alt="Ảnh đại diện" />,
                    unlocked: <Lock />,
                    name:
                        item && item.candidate ?
                            <CanProPop
                                id={item.candidate.id}
                                background={item.candidate.coverUrl}
                                avatar={item.candidate.avatarUrl}
                                unlocked={item.candidate.unlocked}
                                email={item.candidate.email}
                                gender={item.candidate.gender}
                                phone={item.candidate.phone}
                                children={
                                    (item.candidate.lastName ? item.candidate.lastName : "") + " " + (item.candidate.firstName ? item.candidate.firstName : "")
                                } /> : null
                    ,
                    lookingForJob: item.candidate.lookingForJob ? "Đang tìm việc" : "Đã có việc",
                    address: item.candidate.address ? item.candidate.address : "",
                    region: item.candidate.region ? item.candidate.region.name : "",
                    birthday: item.candidate.birthday !== -1 ? timeConverter(item.candidate.birthday, 1000) : null,
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
        let { pageIndex, pageSize } = this.state;
        await this.props.getListSavedCandidateProfiles(pageIndex, pageSize);
    };

    createRequest = async (type?: string) => {
        let { id } = this.state;
        await _requestToServer(
            DELETE,
            SAVED_CANDIDATE_PROFILES + '/saved',
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
                    </h5>
                    <div className="table-operations">
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loadingTable}
                            dataSource={dataTable}
                            scroll={{ x: 980 }}
                            bordered
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
    getListSavedCandidateProfiles: (pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES, pageIndex, pageSize }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listFindCandidates: state.SavedCandidateProfiles.items,
    totalItems: state.SavedCandidateProfiles.totalItems,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SavedCandidateProfilesList);