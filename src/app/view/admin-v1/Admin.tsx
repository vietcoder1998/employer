import React, { PureComponent } from 'react'
import { Layout, Icon, Avatar, Breadcrumb, BackTop, Row, Col, Badge, Popover, Tooltip } from 'antd';
import MenuNavigation from './menu-navigation/MenuNavigation';
import './Admin.scss';
import { connect } from 'react-redux';
import clearStorage from '../../../services/clearStorage';
import { breakCumb, routeLink, routePath } from '../../../const/break-cumb';

import Jobs from './jobs/Jobs';
import ConvernientService from './convernient-service/ConvernientService';
import NotFoundAdmin from './not-found-admin/NotFoundAdmin';
import Profile from './profile/Profile';
import MoreInfo from './more-info/MoreInfo ';
import Dashboard from './dashboard/index';

import Loading from '../layout/loading/Loading';
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
import NotiItem from '../layout/notification-item/NotiItem';

import { IAppState } from '../../../redux/store/reducer';
import { REDUX_SAGA } from '../../../const/actions';
import { DropdownConfig, OptionConfig } from '../layout/config/DropdownConfig';
import { TYPE } from '../../../const/type';
import { Link } from 'react-router-dom';
import { INoti } from '../../../models/notis';
import { NotUpdate } from '../layout/common/Common';
import Notitication from './notification/Notification';
import ClearCache from 'react-clear-cache';
import ConnectEvent from './connect-event/ConnectEvent';
import Swal from 'sweetalert2';
import { _requestToServer } from '../../../services/exec'
import { GET, POST } from '../../../const/method';
import { PUBLIC_HOST, EMPLOYER_HOST } from '../../../environment/dev';
import {timeConverter} from '../../../utils/convertTime'
const Switch = require("react-router-dom").Switch;
const { Content, Header } = Layout;


interface IAdminState {
    to_logout: boolean;
    location?: string;
    dataBreakcumb?: Array<string>,
    loading?: boolean,
    pathname?: string,
    listNoti?: Array<INoti>,
    pageSize?: number,
    pageIndex?: number,
    loadingNoti?: boolean;
    resInfoEvent?: any;
    joinSucess?: boolean
}

interface IAdminProps extends StateProps, DispatchProps {
    match?: Readonly<any>;
    location?: any;
    history?: any
    handleLoading?: Function;
    getListRegions?: Function;
    getListJobNames?: Function;
    getListSkills?: Function;
    getListJobService?: Function;
    getListLanguages?: Function;
    getListNoti?: Function;
    getAdminProfile?: Function;
}

class Admin extends PureComponent<IAdminProps, IAdminState> {
    constructor(props) {
        super(props);
        this.state = {
            to_logout: false,
            location: "/",
            dataBreakcumb: [],
            loading: true,
            pageSize: 10,
            pageIndex: 0,
            loadingNoti: false,
            resInfoEvent: null,
            joinSucess: false
        };
    };

    async componentDidMount() {
        let { pageSize, pageIndex } = this.state;

        await this.props.getAdminProfile();
        await this.props.getListRegions();
        await this.props.getListJobNames();
        await this.props.getListSkills();
        await this.props.getListJobService();
        await this.props.getListLanguages();
        await this.props.getListNoti(pageIndex, pageSize);
        await this.setState({ loading: false });
    }

    static getDerivedStateFromProps(nextProps?: IAdminProps, prevState?: IAdminState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            let list_breakcumb = nextProps.location.pathname.split("/");
            let dataBreakcumb = [];
            list_breakcumb.forEach(item => item !== "" && dataBreakcumb.push(item));
            window.scrollTo(0, 0);
            nextProps.handleLoading(false);

            return {
                pathname: nextProps.location.pathname,
                dataBreakcumb,
            }
        }
        return null
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => { });
    }

    handleLoading = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }

    render() {
        let { dataBreakcumb, loading, pageSize, pageIndex, resInfoEvent } = this.state;
        let { path } = this.props.match;
        let { listNoti, history } = this.props;
        let isNotRead = 0;
        listNoti.forEach((item: INoti) => {
            item.seen ? isNotRead += 0 : isNotRead += 1;
        });

        return (
            <Layout>
                <MenuNavigation
                    onCallLoading={() => this.handleLoading()}
                    history={history}
                />
                <Layout>
                    <Header style={{ padding: 0, zIndex: 900 }}>
                        <div className="avatar-header" >
                            <Tooltip title={"Cập nhật phiên bản"}>
                                <ClearCache>
                                    {({ isLatestVersion, emptyCacheStorage }) =>
                                        <div>
                                            {!isLatestVersion && (
                                                <Icon type={'sync'}
                                                    style={{
                                                        fontSize: 20,
                                                        color: "whitesmoke",
                                                        float: "right",
                                                        margin: 15
                                                    }}

                                                    onClick={
                                                        () => {
                                                            this.setState({ loading: true });
                                                            emptyCacheStorage();
                                                        }
                                                    }
                                                    spin={loading}
                                                />
                                            )}
                                        </div>
                                    }
                                </ClearCache>
                            </Tooltip>
                            <Tooltip title={"Tham gia sự kiện trường"}>
                                <div
                                    className="noti-icon"
                                    style={{ padding: 18 }}
                                    onClick={
                                        () => {
                                            Swal.queue([{
                                                title: 'Tham gia sự kiện trường',
                                                text: "Mã tham gia",
                                                input: 'text',
                                                inputPlaceholder: 'Nhập mã tham gia',
                                                inputAttributes: {
                                                    autocapitalize: 'off'
                                                },
                                                showCancelButton: true,
                                                cancelButtonText: "Bỏ qua",
                                                confirmButtonText: 'Xác nhận',
                                                showLoaderOnConfirm: true,
                                                allowOutsideClick: () => !Swal.isLoading(),
                                                preConfirm: (code) => {
                                                    return _requestToServer(
                                                        GET,
                                                        `/api/schools/events/simple?inviteCode=${code}&activeCheck=false`,
                                                        null,
                                                        undefined,
                                                        {},
                                                        PUBLIC_HOST,
                                                        false,
                                                        false,
                                                        true
                                                    ).then((res: any) => {
                                                        console.log(res)
                                                        this.setState({ resInfoEvent: res })
                                                        if (res.code === 200) {
                                                            Swal.insertQueueStep({
                                                                title: 'Xác nhận tham gia',
                                                                icon: null,
                                                                html:
                                                                    `
                                                                    <img src="${res.data.bannerUrl}" width="100%">
                                                                    <div style="font-weight: bold; font-size: 1.2em; margin: 10px 0">${res.data.name}</div>
                                                                    <div style="display: flex;">
                                                                        <img src="${res.data.schoolLogoUrl}" width="50px" height="50px" style="border-radius: 50%; border: solid 1px #8c8c8c;margin: 10px 10px 0; object-fit: cover;">
                                                                        <div style="margin-top: 10px">
                                                                            <div style="font-weight: bold; font-size: 1.1em;">${res.data.schoolName}</div>
                                                                            <div style="text-align: left; font-size: 0.9em;">${timeConverter(res.data.createdDate, 1000) + " - " + timeConverter(res.data.finishedDate, 1000)}</div>
                                                                        </div>
                                                                    </div>
                                                                    `,
                                                                showCancelButton: true,
                                                                cancelButtonText: "Bỏ qua",
                                                                confirmButtonText: 'Xác nhận',
                                                                showLoaderOnConfirm: true,
                                                                allowOutsideClick: () => !Swal.isLoading(),
                                                                preConfirm: () => {
                                                                    return _requestToServer(
                                                                        POST,
                                                                        `/api/employers/schools/events/join?inviteCode=${code}&activeCheck=false`,
                                                                        null,
                                                                        undefined,
                                                                        undefined,
                                                                        EMPLOYER_HOST,
                                                                        false,
                                                                        false,
                                                                        true
                                                                    ).then((res2: any) => {
                                                                        // console.log(res)
                                                                        if (res2.code === 200) {
                                                                            this.setState({ joinSucess: true })
                                                                            Swal.insertQueueStep({
                                                                                title: 'Thành công',
                                                                                icon: 'success',
                                                                                html:
                                                                                    `<div>Bạn đã tham gia thành công vào sự kiện</div>
                                                                                    <div><b>${this.state.resInfoEvent.data.name}</b></div>
                                                                                    <div>và kết nối với trường <b>${this.state.resInfoEvent.data.schoolName}</b></div>
                                                                                    `,
                                                                                confirmButtonText: 'Đồng ý',
                                                                                showLoaderOnConfirm: true,
                                                                                allowOutsideClick: () => !Swal.isLoading(),
                                                                            })
                                                                        } else {
                                                                            Swal.insertQueueStep({
                                                                                title: 'Lỗi',
                                                                                icon: 'error',
                                                                                text: res2.msg,
                                                                                confirmButtonText: 'Đồng ý',
                                                                            })
                                                                        }
                                                                    }).catch((err) => {
                                                                        let msg;
                                                                        if (err.response) {
                                                                            let data = err.response.data;
                                                                            if (data) {
                                                                                msg = data.msg;
                                                                            }
                                                                        } else {
                                                                            msg = err.message;
                                                                        }
                                                                        Swal.insertQueueStep({
                                                                            title: 'Lỗi',
                                                                            icon: 'error',
                                                                            text: msg,
                                                                            confirmButtonText: 'Đồng ý',
                                                                        })
                                                                    });
                                                                },
                                                            })
                                                        }
                                                    }).catch((err) => {
                                                        let msg;
                                                        if (err.response) {
                                                            let data = err.response.data;
                                                            if (data) {
                                                                msg = data.msg;
                                                            }
                                                        } else {
                                                            msg = err.message;
                                                        }
                                                        Swal.insertQueueStep({
                                                            title: 'Lỗi',
                                                            icon: 'error',
                                                            text: msg,
                                                            confirmButtonText: 'Đồng ý',
                                                        })
                                                    });
                                                },
                                            }]).then((value) => {
                                                // console.log(value.value)
                                                if (value.value && value.value.length >= 3 && value.value[2] && this.state.joinSucess) {
                                                    // console.log("vao day");
                                                    this.setState({ joinSucess: false })
                                                    window.location.assign("/v1/admin/connect-schools/event/list")
                                                }
                                            })
                                        }
                                    }
                                >
                                    <Icon
                                        type="qrcode"
                                        style={{
                                            position: "absolute",
                                            color: "white",
                                            fontSize: 18,
                                            left: 10,
                                            top: 10
                                        }}
                                    />
                                </div>
                            </Tooltip>

                            <Tooltip title={"Đăng bài"}>
                                <div
                                    className="noti-icon"
                                    style={{ padding: 18 }}
                                    onClick={
                                        () => {
                                            this.props.history.push(routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE);
                                            this.handleLoading()
                                        }
                                    }
                                >
                                    <Icon
                                        type="plus"
                                        style={{
                                            position: "absolute",
                                            color: "white",
                                            fontSize: 18,
                                            left: 10,
                                            top: 10
                                        }}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title={"Tìm ứng viên"}>
                                <div
                                    className="noti-icon"
                                    style={{ padding: 18 }}
                                    onClick={
                                        () => {
                                            this.props.history.push(routeLink.FIND_CANDIDATES + routePath.LIST);
                                            this.handleLoading()
                                        }
                                    }
                                >
                                    <Icon
                                        type="search"
                                        style={{
                                            position: "absolute",
                                            color: "white",
                                            fontSize: 18,
                                            left: 10,
                                            top: 10
                                        }}
                                    />
                                </div>
                            </Tooltip>
                            <Popover
                                content={
                                    < >
                                        <div className='list-noti'>
                                            {
                                                listNoti && listNoti.length > 0 ?
                                                    listNoti.map(
                                                        (item: INoti) =>
                                                            <NotiItem
                                                                key={item.id}
                                                                item={item}
                                                                getListNoti={
                                                                    () => undefined
                                                                }
                                                                setSeen={() => this.props.getListNoti(pageIndex, pageSize)}
                                                            />) : <NotUpdate msg="Không có thông báo" />
                                            }
                                        </div>
                                        <div
                                            className="a_c link-to"
                                            style={{ padding: 10 }}
                                            onClick={() => {
                                                this.handleLoading();
                                                this.props.history.push(routeLink.NOTI + routePath.LIST)
                                            }}
                                        >
                                            <Icon type={"search"} />
                                            <span>Xem thêm</span>
                                        </div>
                                    </>
                                }
                                placement="bottomRight"
                                title={<p>Thông báo</p>}
                                trigger="click"
                                style={{
                                    padding: 0,
                                }}
                                onVisibleChange={(visible?: boolean) => { if (visible) { this.props.getListNoti() } }}
                            >
                                <div className="noti-icon">
                                    <Badge
                                        count={isNotRead > 0 ? isNotRead : 0}
                                        style={{
                                            fontSize: 6,
                                            right: 12,
                                            top: 8,
                                            borderRadius: 15,
                                        }}
                                        dot
                                    >
                                        <Icon
                                            type="bell"
                                            style={{
                                                fontSize: 16,
                                                color: "whitesmoke",
                                                float: "right",
                                                margin: "8px 10px",
                                                cursor: "pointer"
                                            }}
                                            theme={"filled"}
                                        />
                                    </Badge>
                                </div>
                            </Popover>
                            <DropdownConfig
                                param={
                                    <Avatar
                                        icon="user"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            border: "solid #fff 2px",
                                            margin: "0px 12px 0px 4px",
                                            position: "absolute",
                                            top: 10
                                        }}
                                        src={localStorage.getItem('logoUrl')}
                                    />
                                }
                            >
                                <Link to={routeLink.ADMIN_ACCOUNTS}>
                                    <OptionConfig icon="user" key="2" value="" label="Tài khoản" />
                                </Link>
                                <Link to={routeLink.ADMIN_ACCOUNTS + '?cpw=true'}>
                                    <OptionConfig icon="key" key="2" value="" label="Đổi mật khẩu" />
                                </Link>
                                <OptionConfig icon="logout" key="1" value="" label="Đăng xuất" onClick={() => clearStorage()} />
                            </DropdownConfig>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                        }}
                    >
                        {/* <Breadcrumb >
                            <Breadcrumb.Item >
                                <a href='/v1/admin' >
                                    <Icon type="home" />
                                </a>
                            </Breadcrumb.Item>
                            {dataBreakcumb.map((item: any) => {
                                let newBreakCump = null;
                                breakCumb.forEach((item_brk: any, index: number) => {
                                    if (item_brk.label === item) {
                                        newBreakCump = (
                                            <Breadcrumb.Item key={index}>
                                                {!item_brk.disable ? <a href={item_brk.url} >{item_brk.name}</a> : <label>{item_brk.name}</label>}
                                            </Breadcrumb.Item>
                                        )
                                    }
                                })

                                return newBreakCump
                            })}
                        </Breadcrumb> */}
                        {!loading ?
                            <Row>
                                {/* <Col sm={1} md={1} lg={2}></Col> */}
                                <Col sm={24} md={24} lg={24}>
                                    <Switch>
                                        <ErrorBoundaryRoute path={path + routePath.JOBS} component={Jobs} />
                                        <ErrorBoundaryRoute path={path + routePath.CONNECT_SCHOOLS} component={ConnectEvent} />
                                        <ErrorBoundaryRoute path={path + routePath.CONVERNIENT} component={ConvernientService} />
                                        <ErrorBoundaryRoute path={path + routePath.MORE_INFO} component={MoreInfo} />
                                        <ErrorBoundaryRoute path={path + routePath.PROFILE} component={Profile} />
                                        <ErrorBoundaryRoute path={path + routePath.NOTI} component={Notitication} />
                                        <ErrorBoundaryRoute exact path={`/`} component={NotFoundAdmin} />
                                        <ErrorBoundaryRoute path={path + routePath.DASHBOARD} component={Dashboard} />
                                    </Switch>
                                </Col>
                                {/* <Col sm={1} md={1} lg={2}></Col> */}
                            </Row>
                            : <Loading />}
                    </Content>
                </Layout>
                {/* <>
                    <BackTop />
                </> */}
            </Layout >
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListRegions: () => dispatch({ type: REDUX_SAGA.REGIONS.GET_REGIONS }),
    getListJobNames: () => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES }),
    getListSkills: () => dispatch({ type: REDUX_SAGA.SKILLS.GET_SKILLS }),
    getListLanguages: () => dispatch({ type: REDUX_SAGA.LANGUAGES.GET_LANGUAGES }),
    getListJobService: () => dispatch({ type: REDUX_SAGA.JOB_SERVICE.GET_JOB_SERVICE }),
    getListNoti: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.NOTI.GET_NOTI, pageIndex, pageSize }),
    getAdminProfile: () => dispatch({ type: REDUX_SAGA.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT }),
    handleLoading: (loading?: boolean) => dispatch({ type: TYPE.HANDLE, loading })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    loading: state.MutilBox.loading,
    listNoti: state.Notis.items,
    totalNoti: state.Notis.totalItems
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Admin)