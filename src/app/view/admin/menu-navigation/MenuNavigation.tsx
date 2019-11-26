import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd';
import './MenuNavigation.scss';
// @ts-ignore
import logo from '../../../../logo-01.png'
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface MenuNavigationState {
}

interface MenuNavigationProps {
    show_menu: boolean,
}

export default class MenuNavigation extends PureComponent<MenuNavigationProps, MenuNavigationState> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { show_menu } = this.props;
        let state_bar = '1';
        if (localStorage.getItem("state_bar")) {
            state_bar = localStorage.getItem("state_bar")
        }
        return (
            <Sider trigger={null} collapsible collapsed={show_menu}>
                <div className="logo" style={{ padding: show_menu ? "20px 0px" : "0px 0px" }} >
                    <img src={logo} style={{ height: "40px", display: !show_menu ? "block" : "none" }} alt="worksvnlogo" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[state_bar]} onClick={event => localStorage.setItem("state_bar", event.key)}>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="form" />
                                <span>Tuyển dụng</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to={'/admin/jobs/job-announcements/list'}>
                                <Icon type="carry-out" />
                                <span>Quản lí bài đăng</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/admin/jobs/employer-branches/list'}>
                                <Icon type="environment" />
                                <span>Quản lí chi nhánh</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="pendings-jobs">
                            <Link to={'/admin/jobs/annoucements/list'}>
                                <Icon type="loading-3-quarters"  />
                                <span>Bài viết</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/admin/jobs/find-candidates/list'}>
                                <Icon type="user-add" />
                                <span>Tìm kiếm ứng viên</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={'/admin/jobs/saved-candidate-profiles/list'}>
                                <Icon type="idcard" />
                                <span>Hồ sơ đã lưu</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="share-alt" />
                                <span>Kết nối trường học</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to={'/admin/data/languages/list'}>
                                <Icon type="search" />
                                <span>Tìm kiếm </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={'/admin/data/majors/list'}>
                                <Icon type="contacts" />
                                <span>Danh sách sự kiện</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="star" />
                                <span>Tiện ích dịch vụ</span>
                            </span>
                        }
                    >
                        <Menu.Item key="7">
                            <Link to={'/admin/data/languages/list'}>
                                <Icon type="shopping" />
                                <span>Mua gói</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to={'/admin/data/majors/list'}>
                                <Icon type="percentage" />
                                <span>Khuyến mãi</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="ellipsis" />
                                <span>Thông tin khác</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">
                            <Link to={'/admin/data/languages/list'}>
                                <Icon type="team" />
                                <span>Cộng đồng</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to={'/admin/data/majors/list'}>
                                <Icon type="read" />
                                <span>Hướng dẫn</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider >
        )
    }
}

