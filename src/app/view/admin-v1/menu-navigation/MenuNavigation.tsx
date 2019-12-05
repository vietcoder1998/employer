import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import './MenuNavigation.scss';
// @ts-ignore
// import logo from '../../../../logo-01.png'
// @ts-ignore
import logo from '../../../../assets/image/logo-white.png'
// @ts-ignore
import logoIcon from '../../../../assets/image/logo-icon-white.png'
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface IMenuNavigationProps {
    show_menu: boolean;
    onCallLoading?: Function
}

export default function MenuNavigation(props: IMenuNavigationProps) {
    let { show_menu } = props;
    let state_bar = '1';
    if (localStorage.getItem("state_bar")) {
        state_bar = localStorage.getItem("state_bar")
    }
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={show_menu}
            theme="light"
        >
            <div className="logo" >
                <img
                    src={!show_menu ? logo : logoIcon}
                    style={{ height: "30px", marginLeft: 12, marginTop: 10 }}
                    alt="worksvnlogo"
                />
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={[state_bar]}
                style={{
                    borderRight: "none",
                    width: "100%",
                    padding: "50px 0px"
                }}
                onClick={(event: any) => {
                    localStorage.setItem("state_bar", event.key);
                    props.onCallLoading()
                }}
            >
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
                        <Link to={'/v1/admin/jobs/job-announcements/list'}>
                            <Icon type="carry-out" />
                            <span>Quản lí bài đăng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/v1/admin/jobs/em-branches/list'}>
                            <Icon type="environment" />
                            <span>Quản lí chi nhánh</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={'/v1/admin/jobs/find-candidates/list'}>
                            <Icon type="user-add" />
                            <span>Tìm kiếm ứng viên</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={'/v1/admin/jobs/saved-candidate/list'}>
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
                        <Link to={'/v1/admin/connect-schools/list'}>
                            <Icon type="search" />
                            <span>Tìm kiếm </span>
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
                    disabled={true}
                >
                    <Menu.Item key="7">
                        <Link to={'/v1/admin/connect-schools/list'}>
                            <Icon type="shopping" />
                            <span>Mua gói</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={'/v1/admin/data/majors/list'}>
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
                    <Menu.Item key="pendings-jobs">
                        <Link to={'/v1/admin/jobs/announcements/list'}>
                            <Icon type="loading-3-quarters" />
                            <span>Bài viết</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to={'/v1/admin/data/languages/list'}>
                            <Icon type="team" />
                            <span>Cộng đồng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to={'/v1/admin/data/majors/list'}>
                            <Icon type="read" />
                            <span>Hướng dẫn</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider >
    )
}