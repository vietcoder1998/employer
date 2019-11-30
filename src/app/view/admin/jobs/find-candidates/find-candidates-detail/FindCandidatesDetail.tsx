import React from 'react'
import { Icon, Divider, Row, Col, Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA, REDUX } from '../../../../../../common/const/actions';
import { Link } from 'react-router-dom';
import { TYPE } from '../../../../../../common/const/type';
import { _requestToServer } from '../../../../../../services/exec';
import { FIND_CANDIDATE_DETAIL } from '../../../../../../services/api/private.api';
import { POST } from '../../../../../../common/const/method';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IMapState } from '../../../../../../redux/models/mutil-box';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IFindCandidateDetail } from '../../../../../../redux/models/find-candidates-detail';
import CandidateProfile from '../../../../layout/candidate-profile/CandidateProfile';

interface IFindCandidatesDetailState {
    title?: string;
    type_cpn?: string;
    id?: string;
    body?: IFindCandidateDetail;
}

interface IFindCandidatesDetailProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getFindCandidateDetail: Function;
}

class FindCandidatesDetail extends React.Component<IFindCandidatesDetailProps, IFindCandidatesDetailState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            body: null,
            type_cpn: TYPE.CREATE
        }
    }
    static getDerivedStateFromProps(nextProps: IFindCandidatesDetailProps, prevState: IFindCandidatesDetailState) {
        if (
            nextProps.match.params.id &&
            nextProps.match.params.id !== prevState.id
        ) {
            let { body } = prevState;
            let { id } = nextProps.match.params;
            nextProps.getFindCandidateDetail(nextProps.match.params.id);
            return {
                id
            }
        }

        if (
            nextProps.find_candidates_detail &&
            nextProps.find_candidates_detail !== prevState.body
        ) {
            let body = nextProps.find_candidates_detail;
            return {
                body
            }
        }

        return null
    }

    async componentDidMount() {
        let { id } = this.props.match.params
        await this.props.getFindCandidateDetail(id)
    };

    createRequest = async () => {
        let { body, type_cpn } = this.state;
        let { mapState } = this.props;

        switch (type_cpn) {
            case TYPE.CREATE:
                await _requestToServer(
                    POST,
                    FIND_CANDIDATE_DETAIL,
                    body,
                    null,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false,
                ).then((res: any) => {
                    if (res) {
                        this.props.history.push('/admin/jobs/em-branches/list');
                    }
                })
                break;
            default:
                break;
        }
    }
    render() {
        let { type_cpn } = this.state;

        return (
            <div className='common-content'>
                <h5>
                    Tạo bài viết mới
                </h5>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                    <Col xs={0} sm={22} md={20} lg={18} xl={18} xxl={16}>
                        <>
                            <>
                                <CandidateProfile  />
                            </>
                            <div className="find-candidate-create-content">
                                <Button
                                    type="primary"
                                    prefix={"check"}
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                >
                                    {type_cpn === TYPE.CREATE ? "Tạo mới" : "Lưu lại"}
                                    <Icon type="right" />
                                </Button>
                                <Button
                                    type="danger"
                                    prefix={"check"}
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                >
                                    <Link to='/admin/job-management/list'>
                                        <Icon type="close" />
                                        {type_cpn === TYPE.CREATE ? "Hủy bài" : "Hủy sửa"}
                                    </Link>
                                </Button>
                            </div>
                        </>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                </Row>
            </div >
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getFindCandidateDetail: (id: string) =>
        dispatch({ type: REDUX_SAGA.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, id }),
    handleMap: (mapState: IMapState) =>
        dispatch({
            type: REDUX.MAP.SET_MAP_STATE,
            mapState
        })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    find_candidates_detail: state.FindCandidateDetail
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FindCandidatesDetail)