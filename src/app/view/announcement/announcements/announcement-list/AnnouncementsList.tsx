import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../const/actions';
import { Row, Col, Divider, Affix, Icon } from 'antd';
// import { timeConverter, momentToUnix } from '../../../../../utils/convertTime';
// import { TYPE } from '../../../../../const/type';
// import { IptLetter } from '../../../layout/common/Common';
// import { _requestToServer } from '../../../../../services/exec';
// import { ANNOU_COMMENTS } from '../../../../../services/api/private.api';
import { IAnnouCommentsBody } from '../../../../../models/annou-comments';
// import { routeLink, routePath } from '../../../../../const/break-cumb';
import './AnnouncementsList.scss';
import FirstCard from '../card-option/first-card/FirstCard';
import MutilCard from '../card-option/mutil-card/MutilCard';
import AffixRight from '../card-option/affix-right/AffixRight';
import ReadCard from '../card-option/read-card/ReadCard';
import { IAnnouncement } from '../../../../../models/announcements';
import { IAppState } from '../../../../../redux/store/reducer';

interface IAnnouncementsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    location?: any;
    getListAnnouTypes: Function;
    getListAnnouncements: Function;
    getListAnnouComment: Function;
}

interface IAnnouncementsListState {
    pageIndex?: number;
    pageSize?: number;
    employerID?: string;
    target?: string;
    jobNameID?: string;
    jobId?: string;
    listAnnouTypes?: Array<any>;
    valueType?: string;
    announcementTypeID?: number;
    createdDate?: number;
    adminID?: string;
    listAnnouncements?: Array<any>;
    loading?: boolean;
    data?: Array<any>;
    loadingMore?: boolean;
    count?: number;
    body?: IAnnouCommentsBody;
    hidden: boolean;
    search?: string;
};

class AnnouncementsList extends PureComponent<IAnnouncementsListProps, IAnnouncementsListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            target: undefined,
            listAnnouTypes: [],
            announcementTypeID: undefined,
            createdDate: undefined,
            adminID: undefined,
            listAnnouncements: [],
            loading: true,
            pageIndex: 0,
            pageSize: 10,
            body: {
                rating: null,
                userID: null,
                userType: null,
                createdDate: null,
                lastModified: null
            },
            hidden: null,
        }
    };

    load_more = true;

    static getDerivedStateFromProps(nextProps: IAnnouncementsListProps, prevState: IAnnouncementsListState) {
        if (nextProps.location.search && nextProps.location.search !== prevState.search) {
            let {
                createdDate,
                adminID,
                hidden,
                target
            } = prevState;

            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('type');
            nextProps.getListAnnouncements(
                0,
                10,
                {
                    createdDate,
                    adminID,
                    announcementTypeID: myParam !== "ALL" ? myParam : null,
                    hidden,
                    target
                }
            )

            return {
                createdDate,
                adminID,
                announcementTypeID: myParam !== "ALL" ? myParam : null,
                hidden,
                target,
                search: nextProps.location.search,
            }
        }

        if (
            nextProps.listAnnouncements &&
            nextProps.listAnnouncements !== prevState.listAnnouncements
        ) {
            return {
                listAnnouncements: nextProps.listAnnouTypes,
                loadingMore: false,
                loading: false

            };
        }
        return {
            loading: false
        };
    };

    async componentDidMount() {
        await this.props.getListAnnouTypes();
        await this.searchAnnouncement();
        window.addEventListener("scroll", (event: any) => {
            let element = document.querySelector("div.announcements-list");
            if (element) {
                if (window.innerHeight + window.scrollY >= document.querySelector("div.announcements-list").clientHeight) {
                    if (this.load_more) {
                        this.setState({ loadingMore: true });
                        let { pageSize, pageIndex } = this.state;
                        pageSize = pageSize + 5;

                        if (pageSize < 51) {
                            this.setState({ pageSize, pageIndex });
                            this.searchAnnouncement();
                        }
                    }
                }
            }
        })
    };

    componentWillUnmount() {
        this.load_more = false;
        window.removeEventListener("scroll", () => {
        })
    }

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

    render() {
        let {
            loading,
            loadingMore
        } = this.state;

        let {
            listAnnouncements
        } = this.props;

        return (
            <div>
                <Row>
                    <Col sm={0} md={1} lg={3} xl={3} xxl={4}></Col>
                    <Col sm={24} md={22} lg={18} xl={18} xxl={16}>
                        <div className="annou-list">
                            <Row>
                                <Divider children={"Nổi bật"} orientation="left" />
                                <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                                    <FirstCard item={listAnnouncements[0]} loading={loading} />
                                </Col>
                                <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                                    <Row>
                                        <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <MutilCard item={listAnnouncements[1]} loading={loading} />
                                        </Col>
                                        <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <MutilCard item={listAnnouncements[2]} loading={loading} />
                                        </Col>
                                        <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <MutilCard item={listAnnouncements[3]} loading={loading} />
                                        </Col>
                                        <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <MutilCard item={listAnnouncements[4]} loading={loading} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row >
                                <Divider children={"Danh sách"} orientation="left" />
                                <Col md={16} lg={16} xl={16} xxl={18}>
                                    {listAnnouncements && listAnnouncements.length > 5 && listAnnouncements.map((item: IAnnouncement, index: number) => {
                                        if (index >= 0 && index <= 50) {
                                            return <ReadCard key={index} item={item} />
                                        }
                                        return ""
                                    })}
                                </Col>
                                <Col md={8} lg={8} xl={8} xxl={6}>
                                    <Affix offsetTop={35}>
                                        <AffixRight
                                            listData={
                                                listAnnouncements.filter((item: IAnnouncement, index: number) => index >= 0 && index <= 4)
                                            }
                                        />
                                    </Affix>
                                </Col>
                            </Row>
                        </div>
                        {
                            loadingMore ? <div className='a_c'><Icon type='loading' /></div> : ''
                        }
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
    getAnnouncementDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL, id }),
    getListAnnouComment: (
        pageIndex: number,
        pageSize: number,
        id?: string | number,
        body?: IAnnouCommentsBody
    ) =>
        dispatch({ type: REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENTS, pageIndex, pageSize, id, body })
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listAnnouTypes: state.AnnouTypes.items,
    listAnnouncements: state.Announcements.items,
    annoucement_detail: state.AnnouncementDetail,
    totalItems: state.Announcements.totalItems,
    listAnnouComment: state.AnnouComments.items,
    loading_data: state.MutilBox.loading
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsList);