import React from 'react'
import { Button, Result, Tooltip, Modal, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../const/actions';
import { TYPE } from '../../../../../const/type';
import { IAppState } from '../../../../../redux/store/reducer';
import { IMapState, IModalState, IDrawerState } from '../../../../../models/mutil-box';
// import './AdminAccount.scss';
// import Loading from '../../../layout/loading/Loading';
import { IAdminAccount } from '../../../../../models/admin-account';
import AdminProfile from '../../../layout/admin-profile/AdminProfile';
import { InputTitle } from '../../../layout/input-tittle/InputTitle';
import { _requestToServer } from '../../../../../services/exec';
import { POST } from '../../../../../const/method';
import { RE_PASSWORD } from '../../../../../services/api/public.api';
import { OAUTH2_HOST } from '../../../../../environment/dev';
import DrawerConfig from '../../../layout/config/DrawerConfig';
import { IRating } from '../../../../../models/ratings';
import RatingItem from '../../../layout/rating-item/RatingItem';
import { NotUpdate } from '../../../layout/common/Common';

interface IAdminAccountState {
    title?: string;
    typeCpn?: string;
    id?: string;
    body?: IAdminAccount;
    visible?: boolean;
    process?: boolean;
    loading?: boolean;
    fail?: boolean;
    admin_account?: IAdminAccount;
    loading_rate?: boolean;
    showPw?: boolean;
    showRpw?: boolean;
    showNpw?: boolean;
    pw?: string;
    rpw?: string;
    npw?: string;
    search?: boolean;
}

interface IAdminAccountProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    location?: any;
    getAccountAdmin: Function;
    getJobService: Function;
    getListRating: (pageIndex?: number, pageSize?: number) => any,
    handleMap: (mapState?: IMapState) => any;
    handleModal: (modalState?: IModalState) => any;
    handleDrawer: (modalState?: IDrawerState) => any;
}

class AdminAccount extends React.Component<IAdminAccountProps, IAdminAccountState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            body: null,
            typeCpn: TYPE.CREATE,
            visible: false,
            process: false,
            loading: false,
            fail: false,
            loading_rate: false,
            showPw: false,
            showRpw: false,
            pw: null,
            rpw: null,
            npw: null,
            search: null,
        }
    }

    async componentDidMount() {
        await this.props.getAccountAdmin();
        await this.props.getListRating();
    };

    static getDerivedStateFromProps(nextProps: IAdminAccountProps, prevState: IAdminAccountState) {
        if (nextProps.admin_account && nextProps.admin_account !== prevState.admin_account) {
            if (nextProps.admin_account.lat && nextProps.admin_account.lon) {
                nextProps.handleMap({
                    location: nextProps.admin_account.address,
                    marker: {
                        lat: nextProps.admin_account.lat,
                        lng: nextProps.admin_account.lon,
                    }
                })
            }

            localStorage.setItem('logoUrl', nextProps.admin_account.logoUrl);
            return {
                admin_account: nextProps.admin_account,
                body: nextProps.admin_account
            }
        }

        if (nextProps.location.search && nextProps.location.search !== prevState.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const respw = urlParams.get('cpw');
            const viewrate = urlParams.get('viewrate');


            if (respw === 'true') {
                nextProps.handleModal({ open_modal: true })

                return {
                    search: nextProps.location.search
                }
            }

            if (viewrate === 'true') {
                nextProps.handleDrawer({ openDrawer: true });
                setTimeout(() => {
                    nextProps.getListRating();
                }, 700);

                return {
                    search: nextProps.location.search
                }
            }

            return null
        }

        return null
    }

    createRequest = async () => {
        let { pw, npw } = this.state;
        await this.setState({ loading: true });
        await _requestToServer(
            POST,
            RE_PASSWORD,
            {
                oldPassword: pw,
                newPassword: npw
            },
            undefined,
            undefined,
            OAUTH2_HOST,
            false,
            true
        ).finally(() => {
            this.props.handleModal({ open_modal: false });
            this.setState({ loading: false, pw: null, npw: null, rpw: null })
        })
    }

    openDrawer = async () => {
        setTimeout(() => {
            this.props.getListRating();
        }, 250);

        await this.props.handleDrawer({ openDrawer: true });
    }

    render() {
        let { body, loading, fail, showPw, showRpw, showNpw, pw, rpw, npw } = this.state;
        let { modalState, list_ratings, total_rating } = this.props;
        if (fail) {
            return <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        }

        let exact_pw = pw && pw.length >= 6;
        let exact_npw = npw && npw.length >= 6;
        let exact_rpw = npw && npw.length >= 6 && npw === rpw;

        return (
            <>
                <Modal
                    visible={modalState.open_modal}
                    title={"Đổi mật khẩu"}
                    destroyOnClose={true}
                    onCancel={() => {
                        this.setState({ loading: false, pw: null, rpw: null });
                        this.props.handleModal({ open_modal: false });
                    }}
                    footer={[
                        <Button
                            key="cancel"
                            type="danger"
                            children="Đóng"
                            icon="close"
                            onClick={() => {
                                this.setState({
                                    loading: false,
                                    pw: null,
                                    rpw: null
                                });
                                this.props.handleModal({ open_modal: false })
                            }}
                        />,
                        <Button
                            key="ok"
                            type={modalState.typeModal === TYPE.DELETE ? "danger" : "primary"}
                            icon={modalState.typeModal === TYPE.DELETE ? "delete" : "check"}
                            loading={loading}
                            children={modalState.typeModal === TYPE.DELETE ? "Xóa" : "Xác nhận"}
                            onClick={async () => this.createRequest()}
                            disabled={!(exact_rpw && exact_npw && exact_pw)}
                        />
                    ]}
                    children={<div>
                        <InputTitle
                            style={{ textAlign: "center" }}
                            title="Mật khẩu cũ"
                            children={
                                <Input
                                    placeholder="Nhập mật khẩu cũ"
                                    style={{ marginRight: 20, width: "80%" }}
                                    prefix={<Icon type={exact_pw ? "check" : "lock"} style={{ color: exact_rpw ? "greenyellow" : "gray" }} />}
                                    suffix={<Icon type={showPw ? "eye-invisible" : "eye"} onClick={() => this.setState({ showPw: !showPw })} />}
                                    onChange={(event: any) => this.setState({ pw: event.target.value })}
                                    type={showPw ? "text" : "password"}
                                />
                            }
                        />
                        <InputTitle
                            style={{ textAlign: "center", marginTop: 20 }}
                            type={TYPE.INPUT}
                            title="Mật khẩu mới"
                            children={
                                <Input
                                    placeholder="Chứa ít nhất 6 kí tự và khác mật khẩu cũ"
                                    style={{ marginRight: 20, width: "80%" }}
                                    prefix={<Icon type={exact_npw ? "check" : "lock"} style={{ color: exact_npw ? "greenyellow" : "gray" }} />}
                                    suffix={<Icon type={showNpw ? "eye-invisible" : "eye"} onClick={() => this.setState({ showNpw: !showNpw })} />}
                                    onChange={(event: any) => this.setState({ npw: event.target.value })}
                                    type={showNpw ? "text" : "password"}
                                />
                            }
                        />
                        <InputTitle
                            style={{ textAlign: "center", marginTop: 10 }}
                            type={TYPE.INPUT}
                            title="Nhập lại mật khẩu "
                            children={
                                <Input
                                    placeholder="Chứa ít nhất 6 kí tự"
                                    style={{ marginRight: 20, width: "80%" }}
                                    prefix={<Icon type={exact_rpw ? "check" : "lock"} style={{ color: exact_rpw ? "greenyellow" : "gray" }} />}
                                    suffix={<Icon type={showRpw ? "eye-invisible" : "eye"} onClick={() => this.setState({ showRpw: !showRpw })} />}
                                    onChange={(event: any) => this.setState({ rpw: event.target.value })}
                                    type={showRpw ? "text" : "password"}
                                />
                            }
                        />
                    </div>}
                />
                <DrawerConfig
                    title={"Đánh giá " + (total_rating && total_rating > 0 ? `(${total_rating})` : "")}
                    width={500}
                >
                    <NotUpdate msg={"(Chỉ bạn xem được nội dung này)"} />
                    {list_ratings && list_ratings.length > 0 ? list_ratings.map((item?: IRating, index?: number) => <RatingItem key={index} item={item} />) : <NotUpdate msg={"Chưa có đánh giá"} />}
                </DrawerConfig>
                <div className='common-content'>
                    <h5>
                        Hồ sơ nhà tuyển dụng
                        <Tooltip title="Xem đánh giá" >
                            <Button
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 10px",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px"
                                }}
                                icon={"star"}
                                onClick={() => this.props.handleDrawer({ openDrawer: true })}
                            />
                        </Tooltip>
                        <Tooltip title="Đổi mật khấu" >
                            <Button
                                type="primary"
                                style={{
                                    float: "right",
                                    margin: "0px 10px",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    height: "45px",
                                    width: "45px"
                                }}
                                icon={loading ? "loading" : "key"}
                                onClick={() => this.props.handleModal({ open_modal: true })}
                            />
                        </Tooltip>
                    </h5>
                    <AdminProfile data={body} />
                </div >
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getAccountAdmin: () =>
        dispatch({ type: REDUX_SAGA.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT }),
    handleMap: (mapState?: IMapState) =>
        dispatch({
            type: REDUX.MAP.SET_MAP_STATE,
            mapState
        }),
    handleModal: (modalState?: IMapState) =>
        dispatch({
            type: REDUX.HANDLE_MODAL,
            modalState
        }),
    handleDrawer: (drawState?: IDrawerState) =>
        dispatch({
            type: REDUX.HANDLE_DRAWER,
            drawState
        }),
    getListRating: (pageIndex?: number, pageSize?: number) =>
        dispatch({
            type: REDUX_SAGA.LIST_RATE.GET_LIST_RATE,
            pageIndex,
            pageSize
        }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    modalState: state.MutilBox.modalState,
    admin_account: state.AdminAccount,
    list_ratings: state.Ratings.items,
    total_rating: state.Ratings.totalItems
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount)