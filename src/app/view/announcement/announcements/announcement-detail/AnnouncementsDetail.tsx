import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA, } from '../../../../../common/const/actions';
import { Button, Icon, Row, Col, Affix, BackTop } from 'antd';
// import { TYPE } from '../../../../../common/const/type';
// import { IptLetter } from '../../../layout/common/Common';
import { _requestToServer } from '../../../../../services/exec';
// import { DELETE } from '../../../../../common/const/method';
// import { ANNOU_COMMENTS } from '../../../../../services/api/private.api';
import { IAnnouCommentsBody, IAnnouComment } from '../../../../../redux/models/annou-comments';
// import { routeLink, routePath } from '../../../../../common/const/break-cumb';
import './AnnouncementsDetail.scss';
import HeaderAnnou from '../card-option/header-annou/HeaderAnnou';
import ContentAnnou from '../card-option/content-annou/ContentAnnou';
import CommentAnnou from '../card-option/comment-annou/CommentAnnou';
import { IAppState } from '../../../../../redux/store/reducer';
import { DELETE, POST } from '../../../../../common/const/method';
import { ANNOUNCEMENT_DETAIL } from '../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../environment/dev';
import { NotUpdate } from '../../../layout/common/Common';
// import { NotUpdate } from '../../../layout/common/Common';

interface IAnnouncementsDetailProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListAnnouncements: Function;
    getAnnouncementDetail: Function;
    getAnnouCommentDetail: Function;
    getListAnnouComment: Function;
}

interface IAnnouncementsDetailState {
    pageIndex?: number;
    pageSize?: number;
    jobNameID?: string;
    message?: string
    list_announcements?: Array<any>;
    id?: string;
    loading?: boolean;
    my_cmt?: IAnnouComment;
    list_comment?: Array<IAnnouComment>;
};

class AnnouncementsDetail extends PureComponent<IAnnouncementsDetailProps, IAnnouncementsDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            list_announcements: [],
            list_comment: [],
            id: "",
            loading: true,
            pageIndex: 0,
            pageSize: 10,
            message: null,
            my_cmt: null,
        }
    };

    static getDerivedStateFromProps(nextProps: IAnnouncementsDetailProps, prevState: IAnnouncementsDetailState) {
        if (nextProps.match.params.id && nextProps.match.params.id !== prevState.id) {
            let id = nextProps.match.params.id;
            nextProps.getAnnouncementDetail(id);
            nextProps.getListAnnouComment(0, 0, id, undefined);
            // nextProps.getAnnouCommentDetail(id);

            return {
                id,
            }
        }

        return {
            loading: false
        };
    };

    getMoreCm = async () => {
        let { pageSize, id, pageIndex } = this.state;
        await this.setState({ pageSize: pageSize + 5 });
        await this.props.getListAnnouComment(pageIndex, pageSize, id);
    }

    onComment = async (body) => {
        let { id, pageIndex, pageSize } = this.state;

        await _requestToServer(
            POST,
            ANNOUNCEMENT_DETAIL + `/${id}/comments`,
            body,
            undefined,
            undefined,
            EMPLOYER_HOST
        ).then(
            (res?: any) => {
                if (res) {
                    this.props.getListAnnouComment(pageIndex, pageSize, id);
                }
            }
        )
    }

    onRemoveComment = async () => {
        let { id, pageIndex, pageSize } = this.state;
        let { comment } = this.props;
        await _requestToServer(
            DELETE,
            ANNOUNCEMENT_DETAIL + `/${id}/comments`,
            [comment.id],
            undefined,
            undefined,
            EMPLOYER_HOST
        ).then(
            (res?: any) => {
                if (res) {
                    this.props.getListAnnouComment(pageIndex, pageSize, id);
                }
            }
        )
    }

    render() {
        let {
            loading,
        } = this.state;

        let {
            annoucement_detail,
            list_annou_comment,
            comment,
            totalCmt
        } = this.props;

        let firstName = annoucement_detail ? annoucement_detail.admin.firstName : null;
        let lastName = annoucement_detail ? annoucement_detail.admin.lastName : null;

        return (
            <div>
                <Row>
                    <Col xs={0} sm={0} md={1} lg={2} xl={2} xxl={4}></Col>
                    <Col xs={24} sm={24} md={22} lg={20} xl={20} xxl={16}>
                        <div className="annou-list">
                            <Row>
                                <Col xs={0} sm={1} md={1} lg={2} xl={3} xxl={4}>
                                    <Affix offsetTop={200}>
                                        <div className='affix-annou-card hidden-only-phone' >
                                            <div className='affix-annou-card-content'>
                                                <div>
                                                    <Icon
                                                        type={"message"}
                                                        style={{ fontSize: 22, marginTop: 15 }}
                                                        onClick={() => {
                                                            let elmnt = document.getElementById("comment");
                                                            elmnt.scrollIntoView({ block: "center" });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Icon
                                                        type={"facebook"}
                                                        style={{ fontSize: 22, marginTop: 15 }} />
                                                </div>
                                                <div>
                                                    <Icon type={"star"} style={{ fontSize: 22, marginTop: 15 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </Affix>
                                </Col>
                                <Col xs={0} sm={23} md={15} lg={17} xl={16} xxl={16}>
                                    <HeaderAnnou
                                        averageRating={annoucement_detail.averageRating}
                                        loading={loading}
                                        name={
                                           lastName ? lastName: <NotUpdate msg='loading...' /> + " " + firstName ? firstName : <NotUpdate msg='' />
                                        }
                                        avatarUrl={
                                            annoucement_detail.admin.avatarUrl
                                        }
                                        createdDate={annoucement_detail.createdDate}
                                    />
                                    <ContentAnnou
                                        loading={loading}
                                        title={annoucement_detail.title}
                                        content={annoucement_detail.content}
                                    />
                                    <hr id="comment" />
                                    <CommentAnnou
                                        totalCmt={totalCmt}
                                        loading={loading}
                                        list_annou_comment={list_annou_comment}
                                        onComment={this.onComment}
                                        onRemoveComment={this.onRemoveComment}
                                        commentDetail={comment}
                                    />
                                    {
                                        totalCmt > 0 && totalCmt < list_annou_comment.length ?
                                            <div className='a_c'>
                                                <Button style={{ width: "100%" }} onClick={this.getMoreCm}>
                                                    Tải thêm ...
                                                </Button>
                                            </div> : ''
                                    }
                                </Col>
                                <Col xs={0} sm={1} md={6} lg={5} xl={5} xxl={4}>

                                </Col>
                            </Row>
                            <Row >
                                <Col md={12} lg={8} xl={8} xxl={6}>

                                </Col>
                                <Col md={12} lg={8} xl={8} xxl={6}>

                                </Col>
                                <Col md={12} lg={8} xl={8} xxl={6}>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={2} xl={2} xxl={4}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListAnnouncements: (pageIndex: number, pageSize: number, body: any) =>
        dispatch({
            type: REDUX_SAGA.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
            pageIndex,
            pageSize,
            body
        }),
    getAnnouncementDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL, id }),
    getAnnouCommentDetail: (id?: string) =>
        dispatch({ type: REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENT_DETAIL, id }),
    getListAnnouComment: (
        pageIndex: number,
        pageSize: number,
        id?: string | number,
        body?: IAnnouCommentsBody
    ) =>
        dispatch({ type: REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENTS, pageIndex, pageSize, id, body }),

});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_annou_types: state.AnnouTypes.items,
    annoucement_detail: state.AnnouncementDetail,
    list_annou_comment: state.AnnouComments.items,
    totalCmt: state.AnnouComments.totalItems,
    comment: state.AnnouCommentDetail
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsDetail);