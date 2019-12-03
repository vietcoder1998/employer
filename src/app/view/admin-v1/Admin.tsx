import React, { PureComponent } from 'react'
import { Layout, Icon, Avatar, Breadcrumb, BackTop, Row, Col } from 'antd';
import MenuNavigation from './menu-navigation/MenuNavigation';
import './Admin.scss';
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import clearStorage from '../../../services/clearStorage';
import { breakCumb } from '../../../common/const/break-cumb';
import Jobs from './jobs/Jobs';
import ConnectSchools from './connect-schools/ConnectSchools';
import ConvernientService from './convernient-service/ConvernientService';
import MoreInfo from './more-info/MoreInfo';
import { IAppState } from '../../../redux/store/reducer';
import { REDUX_SAGA } from '../../../common/const/actions';
import { DropdownConfig, OptionConfig } from '../layout/config/DropdownConfig';
import Loading from '../layout/loading/Loading';
import { TYPE } from '../../../common/const/type';
import NotFoundAdmin from './not-found-admin/NotFoundAdmin';

const Switch = require("react-router-dom").Switch;
const { Content, Header } = Layout;

interface IAdminState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>,
    loading?: boolean,
    pathname?: string,
}

interface IAdminProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    location: any;
    handleLoading: Function;
    getListRegions: Function;
    getListJobNames: Function;
    getListSkills: Function;
    getListJobService: Function;
    getListLanguages: Function;
}


class Admin extends PureComponent<IAdminProps, IAdminState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: false,
            to_logout: false,
            location: "/",
            data_breakcumb: [],
            loading: true,
        }
    }

    async componentDidMount() {
        this.props.getListRegions();
        this.props.getListJobNames();
        this.props.getListSkills();
        this.props.getListJobService();
        this.props.getListLanguages();
    }

    static getDerivedStateFromProps(nextProps: IAdminProps, prevState: IAdminState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            let list_breakcumb = nextProps.location.pathname.split("/");
            let data_breakcumb = [];
            list_breakcumb.forEach(item => item !== "" && data_breakcumb.push(item));
            window.scrollTo(0, 0);
            setTimeout(() => {
                nextProps.handleLoading(false);
            }, 250);

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

    render() {
        let { show_menu, data_breakcumb } = this.state;
        let { path } = this.props.match;
        let { loading } = this.props;

        return (
            <Layout>
                <MenuNavigation
                    show_menu={show_menu}
                    onCallLoading={() => this.props.handleLoading(true)}
                />
                <Layout>
                    <Header style={{ padding: 0, zIndex: 900 }}>
                        <Icon
                            className="trigger"
                            type={show_menu ? 'menu-unfold' : 'menu-fold'}
                            style={{
                                marginTop: "20px",
                                color: "white"
                            }}
                            onClick={() => this.setState({ show_menu: !show_menu })}
                        />
                        <div className="avatar-header" >
                            <DropdownConfig
                                param={
                                    <Avatar
                                        icon="user"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            border: "solid #fff 2px",
                                            margin: "0px 5px"
                                        }}
                                    />
                                }
                            >
                                <OptionConfig icon="user" key="2" value="" label="Tài khoản" onClick={() => { }} />
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
                                        <ErrorBoundaryRoute path={`${path}/convenient-service`} component={ConvernientService} />
                                        <ErrorBoundaryRoute path={`${path}/more-info`} component={MoreInfo} />
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
    handleLoading: (loading: boolean) => dispatch({ type: TYPE.HANDLE, loading })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    loading: state.MutilBox.loading
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Admin)