import React, { PureComponent } from 'react'
import { Layout, Icon, Avatar, Breadcrumb, BackTop, Row, Col, Badge, Popover, Tooltip } from 'antd';
import MenuNavigation from './menu-navigation/MenuNavigation';
import './Admin.scss';
import { connect } from 'react-redux';
import clearStorage from '../../../services/clearStorage';
import { breakCumb, routeLink, routePath } from '../../../const/break-cumb';

import Jobs from './jobs/Jobs';
import ConnectSchools from './connect-schools/ConnectSchools';
import ConvernientService from './convernient-service/ConvernientService';
import NotFoundAdmin from './not-found-admin/NotFoundAdmin';
import Profile from './profile/Profile';
import MoreInfo from './more-info/MoreInfo ';

import Loading from '../layout/loading/Loading';
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
import NotiItem from '../layout/notification-item/NotiItem';

import { IAppState } from '../../../redux/store/reducer';
import { REDUX_SAGA } from '../../../const/actions';
import { DropdownConfig, OptionConfig } from '../layout/config/DropdownConfig';
import { TYPE } from '../../../const/type';
import { Link } from 'react-router-dom';
import { INoti } from '../../../redux/models/notis';
import { NotUpdate } from '../layout/common/Common';
import Notitication from './notification/Notification';
import ClearCache from 'react-clear-cache';

const Switch = require("react-router-dom").Switch;
const { Content, Header } = Layout;

interface IAdminState {
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>,
    loading?: boolean,
    pathname?: string,
    list_noti?: Array<INoti>,
    pageSize?: number,
    pageIndex?: number,
    loading_noti?: boolean;
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
}

class Admin extends PureComponent<IAdminProps, IAdminState> {
    constructor(props) {
        super(props);
        this.state = {
            to_logout: false,
            location: "/",
            data_breakcumb: [],
            loading: true,
            pageSize: 10,
            pageIndex: 0,
            loading_noti: false,
        };
    };

    async componentDidMount() {
        let { pageSize, pageIndex } = this.state;
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
            let data_breakcumb = [];
            list_breakcumb.forEach(item => item !== "" && data_breakcumb.push(item));
            window.scrollTo(0, 0);
            nextProps.handleLoading(false);

            return {
                pathname: nextProps.location.pathname,
                data_breakcumb,
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
        }, 400);
    }

    render() {
        let { data_breakcumb, loading, pageSize, pageIndex } = this.state;
        let { path } = this.props.match;
        let { totalNoti, list_noti } = this.props;

        return (
            <Layout>
                <MenuNavigation
                    onCallLoading={() => this.handleLoading()}
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
                            <Popover
                                content={
                                    < >
                                        <div className='list-noti'>
                                            {
                                                list_noti && list_noti.length > 0 ?
                                                    list_noti.map(
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
                                title={"Thông báo"}
                                trigger="click"
                                style={{
                                    padding: 0,
                                }}
                            >
                                <Badge
                                    count={totalNoti && totalNoti > 0 ? totalNoti : 0}
                                    style={{ fontSize: 10, right: 12, top: 12 }} dot
                                >
                                    <Icon
                                        type="notification"
                                        style={{
                                            fontSize: 20,
                                            color: "whitesmoke",
                                            float: "right",
                                            margin: 15
                                        }}
                                    />
                                </Badge>
                            </Popover>
                            <DropdownConfig
                                param={
                                    <Avatar
                                        icon="user"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            border: "solid #fff 2px",
                                            margin: "0px 5px 0px 25px"
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
                        <Breadcrumb >
                            <Breadcrumb.Item >
                                <a href='/v1/admin' >
                                    <Icon type="home" />
                                </a>
                            </Breadcrumb.Item>
                            {data_breakcumb.map((item: any) => {
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
                        </Breadcrumb>
                        {!loading ?
                            <Row>
                                <Col sm={1} md={1} lg={2}></Col>
                                <Col sm={22} md={22} lg={20}>
                                    <Switch>
                                        <ErrorBoundaryRoute path={`${path}/jobs`} component={Jobs} />
                                        <ErrorBoundaryRoute path={`${path}/connect-schools`} component={ConnectSchools} />
                                        <ErrorBoundaryRoute path={`${path}/convernient`} component={ConvernientService} />
                                        <ErrorBoundaryRoute path={`${path}/more-info`} component={MoreInfo} />
                                        <ErrorBoundaryRoute path={`${path}/profile`} component={Profile} />
                                        <ErrorBoundaryRoute path={`${path}/noti`} component={Notitication} />
                                        <ErrorBoundaryRoute exact path={`/`} component={NotFoundAdmin} />
                                    </Switch>
                                </Col>
                                <Col sm={1} md={1} lg={2}></Col>
                            </Row>
                            : <Loading />}
                    </Content>
                </Layout>
                <>
                    <BackTop />
                </>
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
    handleLoading: (loading?: boolean) => dispatch({ type: TYPE.HANDLE, loading })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    loading: state.MutilBox.loading,
    list_noti: state.Notis.items,
    totalNoti: state.Notis.totalItems
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Admin)