import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../common/const/actions';
import { Button, Table, Icon, Select, Row, Col, Modal, Rate, Tabs, List, Avatar, Skeleton, Checkbox, Input, Divider, Affix } from 'antd';
import { timeConverter, momentToUnix } from '../../../../../common/utils/convertTime';
import { TYPE } from '../../../../../common/const/type';
import { IptLetter } from '../../../layout/common/Common';
import { ModalConfig } from '../../../layout/modal-config/ModalConfig';
import { _requestToServer } from '../../../../../services/exec';
import { DELETE } from '../../../../../common/const/method';
import { ANNOU_COMMENTS } from '../../../../../services/api/private.api';
import { IAnnouCommentsBody, IAnnouComment } from '../../../../../redux/models/annou-comments';
import { routeLink, routePath } from '../../../../../common/const/break-cumb';
import './AnnouncementsList.scss';
import FirstCard from '../card-option/first-card/FirstCard';
import MutilCard from '../card-option/mutil-card/MutilCard';
import AffixRight from '../card-option/affix-right/AffixRight';
import ReadCard from '../card-option/read-card/ReadCard';

let { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

let ImageRender = (props: any) => {
    if (props.src && props.src !== "") {
        return <img src={props.src} alt={props.alt} style={{ width: "60px", height: "60px" }} />
    } else {
        return <div style={{ width: "60px", height: "60px", padding: "20px 0px" }}>
            <Icon type="area-chart" />
        </div>
    }
};

interface IAnnouncementsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListAnnouTypes: Function;
    getListAnnouncements: Function;
    getAnnouncementDetail: Function;
    getListAnnouComment: Function;
}

interface JobMmgtable {
    table_columns: {
        key?: string;
        index: number;
        title: string;
        admin: string;
        modifyAdmin: string;
        createdDate: string;
        lastModified: string;
        imageUrl: any;
        hidden: string;
        announcementType: string;
        render: JSX.Element;
    }
};

interface IAnnouncementsListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    target?: string;
    jobNameID?: string;
    jobId?: string;
    show_modal?: boolean;
    pendingJob?: any;
    message?: string;
    list_annou_types?: Array<any>;
    value_type?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    hidden?: boolean;
    list_announcements?: Array<any>;
    id?: string;
    loading_table?: boolean;
    open_config_modal?: boolean;
    initLoading?: boolean;
    loading?: boolean;
    data?: Array<any>;
    list?: Array<any>;
    loadingMore?: boolean;
    count?: number;
    body?: IAnnouCommentsBody;
    pageIndexAC?: number;
    pageSizeAC?: number;
    tabKey: number;
    list_remove: Array<string | number>;
    tab_key: string;
    comment: string | null;
};

class AnnouncementsList extends PureComponent<IAnnouncementsListProps, IAnnouncementsListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            target: undefined,
            list_annou_types: [],
            announcementTypeID: undefined,
            createdDate: undefined,
            adminID: undefined,
            hidden: undefined,
            list_announcements: [],
            id: "",
            loading_table: true,
            initLoading: false,
            loading: false,
            data: [],
            loadingMore: false,
            count: 5,
            pageIndex: 0,
            pageSize: 10,
            pageIndexAC: 0,
            pageSizeAC: 5,
            body: {
                rating: null,
                userID: null,
                userType: null,
                createdDate: null,
                lastModified: null
            },
            tabKey: 1,
            list_remove: [],
            tab_key: "1",
            comment: null,
        }
    };

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (nextProps.list_announcements && nextProps.list_announcements !== prevState.list_announcements) {
            return {
                list_announcements: nextProps.list_annou_types,
                loading_table: false,
            };
        }
        return null;
    };

    async componentDidMount() {
        await this.props.getListAnnouTypes();
        await this.searchAnnouncement();
    };

    handleId = (event: any) => {
        if (event.key) {
            this.setState({ id: event.key })
        }
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.searchAnnouncement();
    };

    searchAnnouncement = async () => {
        let {
            pageIndex,
            pageSize,
            createdDate,
            adminID,
            announcementTypeID,
            hidden,
            target,
        } = this.state;

        await this.props.getListAnnouncements(
            pageIndex,
            pageSize,
            {
                createdDate,
                adminID,
                announcementTypeID,
                hidden,
                target
            }
        );
    };

    onChangeTarget = (event: any) => {
        this.setState({ target: event });
        this.props.getListAnnouTypes({ target: event });
    };

    onChangeJobName = (event: any) => {
        this.setState({ jobNameID: event })
    };

    onChangeType = (event: any) => {
        let { list_annou_types } = this.state;
        if (event === null) {
            this.setState({ announcementTypeID: undefined, value_type: undefined })
        } else if (list_annou_types) {
            list_annou_types.forEach(item => {
                if (item.id === event) {
                    this.setState({ value_type: item.name, announcementTypeID: item.id })
                }
            })
        }
    };

    onChangeCreatedDate = (event: any) => {
        this.setState({ createdDate: momentToUnix(event) })
    };

    onChangeHidden = (event: any) => {
        let { hidden } = this.state;
        switch (event) {
            case 0:
                hidden = true;
                break;
            case -1:
                hidden = false;
                break;
            default:
                hidden = undefined;
                break;
        }
        this.setState({ hidden })
    };

    toggleModalConfig = () => {
        let { open_config_modal } = this.state;
        let id = localStorage.getItem("id_mgm");
        if (!open_config_modal) {
            this.props.getAnnouncementDetail(id);
        }

        this.setState({ open_config_modal: !open_config_modal });
    };

    removeComment = async () => {
        let id = localStorage.getItem("id_mgm");
        let { list_remove } = this.state;
        await _requestToServer(
            DELETE, ANNOU_COMMENTS + `/${id}/comments`, list_remove
        )
    }


    onClickCheckBox = (event: boolean, id: string | number) => {
        let { list_remove } = this.state;
        if (event) {
            list_remove.push(id);
        } else {
            list_remove.forEach((item: string | number, index: number) => {
                if (item === id) {
                    list_remove.splice(index, 1);
                }
            })
        };

        this.setState({ list_remove });
    };

    render() {
        let {
            data_table,
            show_modal,
            value_type,
            loading_table,
            open_config_modal,
            initLoading,
            loadingMore,
            tab_key,
            list_remove
        } = this.state;

        let {
            annoucement_detail,
            totalItems,
            list_annou_comment,
            list_announcements
        } = this.props;
        return (
            <div>
                <Row>
                    <Col md={1} lg={3} xl={3} xxl={4}></Col>
                    <Col md={22} lg={18} xl={18} xxl={16}>
                        <div className="annou-list">
                            <Divider children={"Nổi bật"} orientation="left" />
                            <Row>
                                <Col md={12} lg={12} xl={12} xxl={6}>
                                    <FirstCard item={list_announcements[0]} />
                                </Col>
                                <Col md={12} lg={12} xl={12} xxl={6}>
                                    <Row>
                                        <Col md={24} lg={12} xl={12} xxl={6}>
                                            <MutilCard item={list_announcements[1]} />
                                        </Col>
                                        <Col md={24} lg={12} xl={12} xxl={6}>
                                            <MutilCard item={list_announcements[2]} />
                                        </Col>
                                        <Col md={24} lg={12} xl={12} xxl={6}>
                                            <MutilCard item={list_announcements[3]} />
                                        </Col>
                                        <Col md={24} lg={12} xl={12} xxl={6}>
                                            <MutilCard item={list_announcements[4]} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider children={"Danh sách"} orientation="left" />
                            <Row >
                                <Col md={18} lg={18} xl={18} xxl={18}>
                                    <ReadCard />
                                    <ReadCard />
                                    <ReadCard />
                                    <ReadCard />
                                    <ReadCard />
                                </Col>
                                <Col md={6} lg={6} xl={6} xxl={6}>
                                    <Affix>
                                        <AffixRight />
                                    </Affix>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={1} lg={3} xl={3} xxl={4}></Col>
                </Row>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListAnnouTypes: (data: any) => dispatch({ type: REDUX_SAGA.ANNOU_TYPES.GET_ANNOU_TYPES, data }),
    getListAnnouncements: (pageIndex: number, pageSize: number, body: any) => dispatch({
        type: REDUX_SAGA.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
        pageIndex,
        pageSize,
        body
    }),
    getAnnouncementDetail: (id: string) =>
        dispatch({ type: REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL, id }),
    getListAnnouComment: (
        pageIndex: number,
        pageSize: number,
        id: string | number,
        body: IAnnouCommentsBody
    ) =>
        dispatch({ type: REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENTS, pageIndex, pageSize, id, body })
});

const mapStateToProps = (state: any, ownProps: any) => ({
    list_annou_types: state.AnnouTypes.items,
    list_announcements: state.Announcements.items,
    annoucement_detail: state.AnnouncementDetail,
    totalItems: state.Announcements.totalItems,
    list_annou_comment: state.AnnouComments.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsList);