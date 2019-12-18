import React from 'react'
import { Button, Result, Tooltip, Modal, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../common/const/actions';
import { TYPE } from '../../../../../common/const/type';
import { IAppState } from '../../../../../redux/store/reducer';
import { IMapState, IModalState, IDrawerState } from '../../../../../redux/models/mutil-box';
// import './AdminAccount.scss';
// import Loading from '../../../layout/loading/Loading';
import { IAdminAccount } from '../../../../../redux/models/admin-account';
import AdminProfile from '../../../layout/admin-profile/AdminProfile';
import { InputTitle } from '../../../layout/input-tittle/InputTitle';
import { _requestToServer } from '../../../../../services/exec';
import { POST } from '../../../../../common/const/method';
import { RE_PASSWORD } from '../../../../../services/api/public.api';
import { OAUTH2_HOST } from '../../../../../environment/dev';
import DrawerConfig from '../../../layout/config/DrawerConfig';
import { IRating } from '../../../../../redux/models/ratings';
import RatingItem from '../../../layout/rating-item/RatingItem';

interface IAdminAccountState {
    title?: string;
    type_cpn?: string;
    id?: string;
    body?: IAdminAccount;
    visible?: boolean;
    process?: boolean;
    loading?: boolean;
    fail?: boolean;
    admin_account?: IAdminAccount;
    loading_rate?: boolean;
    show_pw?: boolean;
    show_rpw?: boolean;
    show_npw?: boolean;
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
            type_cpn: TYPE.CREATE,
            visible: false,
            process: false,
            loading: false,
            fail: false,
            loading_rate: false,
            show_pw: false,
            show_rpw: false,
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
            const myParam = urlParams.get('cpw');

            if (myParam === 'true') {
                nextProps.handleModal({ open_modal: true })

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

        await this.props.handleDrawer({ open_drawer: true });
    }

    render() {
        let { body, loading, fail, show_pw, show_rpw, show_npw, pw, rpw, npw } = this.state;
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
                            children="Hủy"
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
                            type={modalState.type_modal === TYPE.DELETE ? "danger" : "primary"}
                            icon={modalState.type_modal === TYPE.DELETE ? "delete" : "check"}
                            loading={loading}
                            children={modalState.type_modal === TYPE.DELETE ? "Xóa" : "Xác nhận"}
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
                                    suffix={<Icon type={show_pw ? "eye-invisible" : "eye"} onClick={() => this.setState({ show_pw: !show_pw })} />}
                                    onChange={(event: any) => this.setState({ pw: event.target.value })}
                                    type={show_pw ? "text" : "password"}
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
                                    suffix={<Icon type={show_npw ? "eye-invisible" : "eye"} onClick={() => this.setState({ show_npw: !show_npw })} />}
                                    onChange={(event: any) => this.setState({ npw: event.target.value })}
                                    type={show_npw ? "text" : "password"}
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
                                    suffix={<Icon type={show_rpw ? "eye-invisible" : "eye"} onClick={() => this.setState({ show_rpw: !show_rpw })} />}
                                    onChange={(event: any) => this.setState({ rpw: event.target.value })}
                                    type={show_rpw ? "text" : "password"}
                                />
                            }
                        />
                    </div>}
                />
                <DrawerConfig
                    title={"Đánh giá " + (total_rating && total_rating > 0 ? `(${total_rating})` : "")}
                    width={500}
                >
                    {list_ratings && list_ratings.map((item?: IRating, index?: number) => <RatingItem key={index} item={item} />)}
                </DrawerConfig>
                <div className='common-content'>
                    <h5>
                        Tình trạng hồ sơ
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
                                onClick={() => this.props.handleDrawer({ open_drawer: true })}
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