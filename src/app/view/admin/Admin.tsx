import React, { PureComponent } from 'react'
import { Layout, Icon, Avatar, Dropdown, Menu, Breadcrumb } from 'antd';
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

const Switch = require("react-router-dom").Switch;
const { Content, Header } = Layout;

interface AdminState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>
}

interface AdminProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getListRegions: Function;
    getListJobNames: Function;
}


class Admin extends PureComponent<AdminProps, AdminState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: false,
            to_logout: false,
            location: "/",
            data_breakcumb: []
        }
    }

    async componentDidMount() {
        this.props.getListRegions();
        this.props.getListJobNames();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            localStorage.setItem("last_url", nextProps.location.pathname);
            let list_breakcumb = nextProps.location.pathname.split("/");
            let data_breakcumb = [];
            list_breakcumb.forEach(item => item !== "" && data_breakcumb.push(item));

            return {
                pathname: nextProps.location.pathname,
                data_breakcumb
            }
        }

        return null;
    }

    menu = (
        <Menu>
            <Menu.Item onClick={() => clearStorage()}>
                <span>
                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    );

    render() {
        let { show_menu, to_logout, data_breakcumb } = this.state;
        let { match } = this.props;

        return (
            <Layout>
                <MenuNavigation show_menu={show_menu} />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={show_menu ? 'menu-unfold' : 'menu-fold'}
                            style={{
                                marginTop: "20px"
                            }}
                            onClick={() => this.setState({ show_menu: !show_menu })}
                        />
                        <div className="avatar-header" >
                            <Avatar
                                icon="user"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                }}
                            />
                            <Dropdown
                                overlay={this.menu}
                                placement="topRight"
                            >
                                <Icon
                                    type={"down"}
                                    style={{
                                        padding: "20px 10px"
                                    }}
                                    onClick={() => this.setState({ to_logout: !to_logout })}
                                />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            border: "solid #80808036 1px"
                        }}
                    >
                        <Breadcrumb >
                            <Breadcrumb.Item >
                                <a href='/admin' >
                                    <Icon type="home" />
                                </a>
                            </Breadcrumb.Item>
                            {data_breakcumb.map(item => {
                                let newBreakCump = null;
                                breakCumb.forEach((item_brk, index) => {
                                    if (item_brk.label === item) {
                                        newBreakCump = (
                                            <Breadcrumb.Item key={index}>
                                                <a href={item_brk.url} >{item_brk.name}</a>
                                            </Breadcrumb.Item>
                                        )
                                    }
                                })

                                return newBreakCump
                            })}
                        </Breadcrumb>
                        <Switch>
                            <ErrorBoundaryRoute path={`${match.url}/jobs`} component={Jobs} />
                            <ErrorBoundaryRoute path={`${match.url}/connect-schools`} component={ConnectSchools} />
                            <ErrorBoundaryRoute path={`${match.url}/convenient-service`} component={ConvernientService} />
                            <ErrorBoundaryRoute path={`${match.url}/more-info`} component={MoreInfo} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout >
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListRegions: () => dispatch({type: REDUX_SAGA.REGIONS.GET_REGIONS}),
    getListJobNames: () => dispatch({type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES})
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Admin)