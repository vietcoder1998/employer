import React from 'react'
import { Icon, Button, Avatar, Tabs, Progress, Tooltip, Modal, Steps, Result, Rate } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../../common/const/actions';
import { TYPE } from '../../../../../../common/const/type';
import { _requestToServer } from '../../../../../../services/exec';
import { FIND_CANDIDATE_DETAIL, SAVED_CANDIDATE_PROFILES } from '../../../../../../services/api/private.api';
import { POST, PUT, DELETE } from '../../../../../../common/const/method';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IMapState, IDrawerState } from '../../../../../../redux/models/mutil-box';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { IFindCandidateDetail } from '../../../../../../redux/models/find-candidates-detail';
import CandidateProfile from '../../../../layout/candidate-profile/CandidateProfile';
import { VerifiedProfile } from '../../../../layout/verified-profile/VerifiedProfile';
import './FindCandidatesDetail.scss';
import { routeLink, routePath } from '../../../../../../common/const/break-cumb';
import Loading from '../../../../layout/loading/Loading';
import DrawerConfig from '../../../../layout/config/DrawerConfig';
import { IptLetterP } from '../../../../layout/common/Common';
import TextArea from 'antd/lib/input/TextArea';
const { TabPane } = Tabs;
const { Step } = Steps;

interface IFindCandidatesDetailState {
    title?: string;
    type_cpn?: string;
    id?: string;
    body?: IFindCandidateDetail;
    visible?: boolean;
    process?: boolean;
    loading?: boolean;
    fail?: boolean;
    rating_user?: {
        attitudeRating?: number,
        skillRating?: number,
        jobAccomplishmentRating?: number,
        comment: string,
    }
}

interface IFindCandidatesDetailProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getFindCandidateDetail: Function;
    getJobService: Function;
    handleModal: Function;
    handleDrawer: (drawerState?: IDrawerState) => any;
}

class FindCandidatesDetail extends React.Component<IFindCandidatesDetailProps, IFindCandidatesDetailState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            body: null,
            type_cpn: TYPE.CREATE,
            visible: false,
            process: false,
            loading: true,
            fail: false,
            rating_user: {
                attitudeRating: 0,
                skillRating: 0,
                jobAccomplishmentRating: 0,
                comment: null,
            }
        }
    }

    move = true;
    static getDerivedStateFromProps(nextProps: IFindCandidatesDetailProps, prevState: IFindCandidatesDetailState) {
        if (
            nextProps.match.params.id &&
            nextProps.match.params.id !== prevState.id
        ) {
            let { id } = nextProps.match.params;
            nextProps.getFindCandidateDetail(id);
            return {
                id,
            }
        }

        if (
            nextProps.find_candidates_detail &&
            nextProps.find_candidates_detail !== prevState.body
        ) {

            let body = nextProps.find_candidates_detail;
            let process = body.unlocked;
            return {
                body,
                process,
                loading: false,
                fail: false
            }
        }

        return null
    }


    async componentDidMount() {
        let { id } = this.props.match.params
        await this.props.getFindCandidateDetail(id);
        this.move = true;
        // @ts-ignore
        document.addEventListener("scroll", ((event: any) => {
            if (window.scrollY > 150 && window.scrollY < window.innerHeight - 50) {
                this.setState({ visible: true })
            } else {
                this.setState({ visible: false })
            }
        }))
    };

    createRequest = async (type: string) => {
        let { id, body } = this.state;
        await this.setState({ loading: true })
        switch (type) {
            case TYPE.UNLOCK:
                await _requestToServer(
                    PUT,
                    FIND_CANDIDATE_DETAIL + `/${id}/unlocked`,
                    null,
                    null,
                    undefined,
                    EMPLOYER_HOST,
                    false,
                    true,
                ).then((res: any) => {
                    if (res) {
                        this.props.getFindCandidateDetail(id);
                    }
                });
                setTimeout(() => {
                    this.props.handleModal();
                }, 1000);
                break;

            case TYPE.SAVE:
                await _requestToServer(
                    body && body.saved ? DELETE : POST,
                    SAVED_CANDIDATE_PROFILES + (body && body.saved ? '/saved' : `/${id}/saved`),
                    body && body.saved ? [id] : undefined,
                    undefined,
                    undefined,
                    EMPLOYER_HOST,
                    false,
                    true,
                ).then((res: any) => {
                    if (res) {
                        this.props.getFindCandidateDetail(id);
                        this.setState({ loading: false });
                    }
                }).catch(
                    () => this.catchErr()
                )
                break;
            default:
                break;
        }
    }

    catchErr() {
        return this.setState({ fail: true })
    }

    turnBack = () => {
        setTimeout(() => {
            this.props.history.push(routeLink.FIND_CANDIDATES + routePath.LIST);
        }, 500);
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", () => {
            this.move = false;
        })
    }

    getRating = async () => {
        let { id } = this.state;
        setTimeout(() => {
            _requestToServer(
                FIND_CANDIDATE_DETAIL + `/${id}/rating`,
                undefined,
                undefined,
                undefined,
                undefined,
                EMPLOYER_HOST
            ).then((res: any) => {
                if (res) {
                    this.setState({ rating_user: res.data })
                }
            })
        }, 250);

    };

    render() {
        let { body, visible, loading, fail, rating_user } = this.state;
        let { unlock_turn, modalState } = this.props;

        if (fail) {
            return <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        }

        return (
            <>
                <div
                    className="top-dropdown test"
                    style={{
                        top: visible && body && !body.unlocked ? "0px" : "-110px"
                    }}
                >
                    <div className="quick-info">
                        <Avatar
                            src={body && body.avatarUrl ? body.avatarUrl : ""}
                            style={{
                                width: 40,
                                height: 40
                            }}
                            icon="user"
                        />
                        <ul className="name-h">
                            <li>
                                <h6>
                                    {body ? body.lastName + " " + body.firstName : ""}
                                </h6>
                            </li>
                            <li>
                                {body && body.educations && body.educations.length > 0 ? body.educations[0].school : ""}
                            </li>
                        </ul>
                        <button
                            className="unlock-btn"
                            prefix={"check"}
                            style={{
                                float: "right"
                            }}
                            onClick={() => this.props.handleModal()}
                        >
                            <Icon type="unlock" />
                            Mở khóa {unlock_turn ? `(${unlock_turn})` : null}
                        </button>
                    </div>
                </div>
                <Modal
                    title="Worksvn thông báo"
                    visible={modalState.open_modal}
                    onCancel={() => this.props.handleModal()}
                    destroyOnClose={true}
                    footer={[
                        <Button
                            key="exit"
                            icon="close"
                            children="Hủy"
                            onClick={() => this.props.handleModal()} />,
                        <Button
                            key="confirm"
                            type="primary"
                            icon={loading ? "loading" : "check"}
                            children="Chấp nhận"
                            onClick={() => this.createRequest(TYPE.UNLOCK)} />
                    ]}
                >
                    Bạn muốn mở khóa cho ứng viên :
                        <Steps>
                        <Step status="finish" title="Ứng viên" icon={<Icon type="user" />} />
                        <Step status="finish" title="Thông tin" icon={<Icon type="solution" />} />
                        <Step status="process" title="Trả phí" icon={<Icon type="loading" />} />
                        <Step status={body && body.unlocked ? "finish" : "wait"} title="Thành công" icon={<Icon type="smile-o" />} />
                    </Steps>
                </Modal>
                <DrawerConfig
                    width={500}
                    title={"Đánh giá"}
                >
                    <IptLetterP
                        value="Thái độ với công việc"
                    >
                        <Rate value={rating_user.skillRating} />
                    </IptLetterP>
                    <IptLetterP
                        value="Kĩ năng công việc"
                    >
                        <Rate value={rating_user.skillRating} />
                    </IptLetterP>
                    <IptLetterP
                        value="Trách nghiệm với công việc"
                    >
                        <Rate value={rating_user.skillRating} />
                    </IptLetterP>
                    <IptLetterP
                        value="Nhận xét"
                    >
                        <TextArea placeholder={"ex: Ứng viên rất có tiềm năng..."} rows={4} />
                    </IptLetterP>
                </DrawerConfig>
                <div className='common-content'>
                    <h5>
                        Tình trạng hồ sơ
                        <Tooltip
                            title={"Đánh giá ứng viên"}
                            children={
                                <Icon
                                    type={"edit"}
                                    style={{ marginLeft: 15 }}
                                    onClick={() => {
                                        this.getRating()
                                        this.props.handleDrawer({ open_drawer: true });
                                    }}
                                />
                            }
                        />
                        <Tooltip
                            placement="topRight"
                            title={body && body.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}
                            children={
                                <Icon
                                    type={body &&
                                        body.unlocked ? "unlock" : "lock"
                                    }
                                    style={{ float: "right", padding: 5 }}
                                />
                            }
                        />
                        <Tooltip
                            placement="top"
                            title={body && body.saved ? "Đã lưu" : "Chưa lưu"}
                            children={
                                <Icon
                                    type="save"
                                    style={{ color: body && body.saved ? "green" : "red", float: "right", padding: 5 }}
                                    onClick={() => this.createRequest(TYPE.SAVE)}
                                />
                            }
                        />
                    </h5>
                    <Progress status="active" percent={body && body.completePercent ? body.completePercent : 0} size="small" />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Hồ sơ cá nhân" key="1">
                            <CandidateProfile data={body} />
                        </TabPane>
                        <TabPane tab="Hồ sơ xác thực" key="2">
                            <VerifiedProfile data={body} />
                        </TabPane>
                    </Tabs>
                    <div className="find-candidate-create-content">
                        <Button
                            type="danger"
                            prefix={"check"}
                            icon="left"
                            onClick={() => this.turnBack()}
                        >
                            {"Quay lại"}
                        </Button>
                        <Button
                            type="primary"
                            prefix={"check"}
                            style={{
                                float: "right"
                            }}
                            icon="unlock"
                            disabled={body && body.unlocked}
                            onClick={() => this.props.handleModal()}
                        >
                            Mở khóa {unlock_turn ? `(${unlock_turn})` : null}
                        </Button>
                        <Button
                            type={body && body.saved ? "danger" : "primary"}
                            prefix={"check"}
                            style={{
                                marginRight: 10,
                                float: "right"
                            }}
                            icon={loading ? "loading" : "save"}
                            onClick={() => this.createRequest(TYPE.SAVE)}
                        >
                            {body && body.saved ? "Hủy lưu" : "Lưu"}
                        </Button>
                    </div>
                </div >
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getFindCandidateDetail: (id: string) =>
        dispatch({ type: REDUX_SAGA.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL, id }),
    handleMap: (mapState?: IMapState) =>
        dispatch({
            type: REDUX.MAP.SET_MAP_STATE,
            mapState
        }),
    handleDrawer: (drawerState?: IDrawerState) =>
        dispatch({
            type: REDUX.HANDLE_DRAWER,
            drawerState
        }),
    getJobService: () => dispatch({
        type: REDUX.JOB_SERVICE,
    }),
    handleModal: (modalState?: IMapState) =>
        dispatch({
            type: REDUX.HANDLE_MODAL,
            modalState,
        }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    find_candidates_detail: state.FindCandidateDetail,
    unlock_turn: state.JobService.unlockProfileQuantity,
    modalState: state.MutilBox.modalState
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FindCandidatesDetail)