import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { Button, Table, Icon, Modal, Avatar, Tooltip, Popconfirm } from 'antd';
import { timeConverter } from '../../../../../../common/utils/convertTime';
import { IAppState } from '../../../../../../redux/store/reducer';
import { ISavedCandidateProfile } from '../../../../../../redux/models/saved-candidate-profiles';
import { DELETE } from '../../../../../../common/const/method';
import { _requestToServer } from '../../../../../../services/exec';
import { SAVED_CANDIDATE_PROFILES } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { routeLink, routePath } from '../../../../../../common/const/break-cumb';
import { Link } from 'react-router-dom';
// import { TYPE } from '../../../../../../common/const/type';

let ImageRender = (props: any) => {
    if (props.src && props.src !== "") {
        return <Avatar shape="square" src={props.src} alt={props.alt} style={{ width: "60px", height: "60px" }} icon="user" />
    } else {
        return <div style={{ width: "60px", height: "60px", padding: "20px 0px" }}>
            <Icon type="area-chart" />
        </div>
    }
};

interface SavedCandidateProfilesListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListSavedCandidateProfiles: Function;
    getAnnoucementDetail: Function;
};

interface SavedCandidateProfilesListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    show_modal?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    type_management?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    adminID?: string;
    list_find_candidates?: Array<any>;
    id?: string;
    loading_table?: boolean;
    body: any;
};

class SavedCandidateProfilesList extends PureComponent<SavedCandidateProfilesListProps, SavedCandidateProfilesListState> {
    constructor(props) {
        super(props);
        this.state = {
            data_table: [],
            pageIndex: 0,
            pageSize: 10,
            show_modal: false,
            loading: false,
            pendingJob: null,
            value_type: null,
            announcementTypeID: null,
            adminID: null,
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
                        style={{ padding: "5px 10px", color: "" }}
                        type="search"
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
                <Icon style={{ padding: "5px 10px" }} type="delete" theme="twoTone" twoToneColor="red" />
            </Popconfirm>
            {/* <Popconfirm
                placement="topRight"
                title={"Chặn người dùng này"}
                onConfirm={(event: any) => this.createRequest()}
                okText="Chặn"
                cancelText="Hủy"
            >
                <Icon style={{ padding: "5px 10px" }} type="stop" theme="twoTone" twoToneColor="red" />
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
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
        },
        {
            title: 'Trạng thái',
            className: 'action',
            dataIndex: 'unlocked',
            key: 'unlocked',
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
            title: 'Đại chỉ',
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
            width: 100,
            render: () => this.editToolAction()
        },
    ];

    onToggleModal = () => {
        let { show_modal } = this.state;
        this.setState({ show_modal: !show_modal });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.list_find_candidates && nextProps.list_find_candidates !== prevState.list_find_candidates) {
            let { pageIndex, pageSize } = prevState;
            let data_table = [];
            nextProps.list_find_candidates.forEach((item: ISavedCandidateProfile, index: number) => {
                const Lock = () => (
                    <>
                        <Tooltip placement="top" title={item.candidate.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}>
                            <Icon
                                type={item.candidate.unlocked ? "unlock" : "lock"}
                                style={{ padding: "5px 5px", color: item.candidate.unlocked ? "green" : "red" }}
                            />
                        </Tooltip>
                    </>
                );

                data_table.push({
                    key: item.candidate.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    avatarUrl: <ImageRender src={item.candidate.avatarUrl} alt="Ảnh đại diện" />,
                    unlocked: <Lock />,
                    name: (item.candidate.lastName ? item.candidate.lastName : "") + " " + (item.candidate.firstName ? item.candidate.firstName : ""),
                    lookingForJob: item.candidate.lookingForJob ? "Đang tìm việc" : "Đã có việc",
                    address: item.candidate.address ? item.candidate.address : "",
                    region: item.candidate.region ? item.candidate.region.name : "",
                    birthday: item.candidate.birthday !== -1 ? timeConverter(item.candidate.birthday, 1000) : null,
                    createdDate: timeConverter(item.createdDate, 1000),
                });
            })
            return {
                list_find_candidates: nextProps.list_find_candidates,
                data_table,
                loading_table: false,
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
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchSavedCandidateProfiles();
    };

    searchSavedCandidateProfiles = async () => {
        let { pageIndex, pageSize } = this.state;
        await this.props.getListSavedCandidateProfiles(pageIndex, pageSize);
    };

    createRequest = async (type?: string) => {
        let { id } = this.state;
        // let method = null;
        // switch (type) {
        //     case TYPE.DELETE:

        //         break;
        //     case TYPE.BAN:

        //         break;

        //     default:
        //         break;
        // }
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
            data_table,
            show_modal,
            loading_table,
        } = this.state;

        let {
            totalItems,
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
                        Danh sách ứng viên đã lưu
                    </h5>
                    <div className="table-operations">
                        <Table
                            // @ts-ignore
                            columns={this.columns}
                            loading={loading_table}
                            dataSource={data_table}
                            scroll={{ x: 1050 }}
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
            </Fragment>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListSavedCandidateProfiles: (pageIndex: number, pageSize: number) =>
        dispatch({ type: REDUX_SAGA.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES, pageIndex, pageSize }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_find_candidates: state.SavedCandidateProfiles.items,
    totalItems: state.SavedCandidateProfiles.totalItems,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SavedCandidateProfilesList);