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
import { routeLink, routePath } from '../../../../const/break-cumb';
import { LinkTo } from '../../layout/common/Common';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface IMenuNavigationProps {
    onCallLoading?: Function
}

export default function MenuNavigation(props: IMenuNavigationProps) {
    let [showMenu, setShowMenu] = React.useState(false);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={showMenu}
            theme="light"
        >
            <div className="logo" >
                <LinkTo
                    href={'https://works.vn'}
                    target='_blank'
                >
                    <img
                        src={!showMenu ? logo : logoIcon}
                        style={{
                            height: "30px",
                            marginLeft: 12,
                            marginTop: 8,

                        }}
                        alt="worksvnlogo"
                    />
                </LinkTo>
            </div>
            <Icon
                className="trigger"
                type={showMenu ? 'menu-unfold' : 'menu-fold'}
                style={{
                    color: "white",
                    fontSize: 20,
                    position: "absolute",
                    right: -45,
                    top: 15,
                    zIndex: 999
                }}
                onClick={() => setShowMenu(!showMenu)}
            />
            <Menu
                mode="inline"
                style={{
                    borderRight: "none",
                    width: "100%",
                    margin: "50px 0px",
                    paddingBottom: 100,
                    height: "100vh",
                    overflowY: "auto",
                    color: "#000000"
                }}
                onClick={(event: any) => {
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
                    <Menu.Item key="0">
                        <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE}>
                            <Icon type="file-add" />
                            <span>Đăng bài</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.LIST}>
                            <Icon type="carry-out" />
                            <span>Quản lý bài đăng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={routeLink.EM_BRANCHES + routePath.LIST}>
                            <Icon type="environment" />
                            <span>Quản lý chi nhánh</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={routeLink.FIND_CANDIDATES + routePath.LIST}>
                            <Icon type="user-add" />
                            <span>Tìm kiếm ứng viên</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={routeLink.SAVE_CANDIDATE + routePath.LIST}>
                            <Icon type="idcard" />
                            <span>Hồ sơ đã lưu</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Link to={routeLink.PENDING_JOBS + routePath.LIST}>
                            <Icon type="highlight" />
                            <span>Bài đăng đang chờ</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="share-alt" />
                            <span>Trường học</span>
                        </span>
                    }
                >
                    <Menu.Item key="event">
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.EVENT + routePath.SCHOOLS + routePath.LIST}>
                            <Icon type="alert" />
                            <span>Sự kiện </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="connected">
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.CONNECTED + routePath.LIST}>
                            <Icon type="api" />
                            <span>Kết nối</span>
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
                        <Link to={routeLink.JOB_SERVICE}>
                            <Icon type="shopping" />
                            <span>Chi tiết gói</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={routeLink.PROMOTION}>
                            <Icon type="percentage" />
                            <span>Khuyến mãi</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    title={
                        <span>
                            <Icon type="notification" />
                            <span>Thông báo</span>
                        </span>
                    }
                >
                    <Menu.Item key="13">
                        <Link to={routeLink.NOTI + routePath.LIST}>
                            <Icon type="file-search" />
                            <span>Danh sách</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub6"
                    title={
                        <span>
                            <Icon type="profile" />
                            <span>Hồ sơ NTD</span>
                        </span>
                    }
                >
                    <Menu.Item key="14">
                        <Link to={routeLink.ADMIN_ACCOUNTS}>
                            <Icon type="user" />
                            <span>Thông tin</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <Icon type="more" />
                            <span>Thông tin khác</span>
                        </span>
                    }
                >
                    {/* <Menu.Item key="pendings-jobs">
                        <Link to={routeLink.ANNOU_DEFAULT} >
                            <Icon type="coffee" />
                            <span>Bài viết</span>
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="9">
                        <Link to={routeLink.COMMUNITY}>
                            <Icon type="mobile" />
                            <span>App Mobile</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to={routeLink.GUIDE}>
                            <Icon type="read" />
                            <span>Hướng dẫn sử dụng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="25">
                        <Link to={routeLink.PRIVACY}>
                            <Icon type="book" />
                            <span>Điều khoản sử dụng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="26">
                        <Link to={routeLink.FEED_BACK}>
                            <Icon type="mail" />
                            <span>Phản hồi</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider >
    )
}