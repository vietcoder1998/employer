import React, { useEffect } from 'react'
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
    history?: any;
}

export default function MenuNavigation(props: IMenuNavigationProps) {
    let [showMenu, setShowMenu] = React.useState(false);
    let [key, setKey] = React.useState('event');
    let [openKey, setOpenKey] = React.useState(["sub1", "sub0"]);

    useEffect(() => {
        console.log('change')
        if(window.location.pathname === "/v1/admin/jobs/job-announcements/create") {
            // console.log(window.location.pathname)
            setKey("0")
            setOpenKey([ "sub2","sub1"])
        } else if( window.location.pathname === '/v1/admin/noti/list') {
            setKey("13")
            setOpenKey(["sub5","sub3"])
        } else if(window.location.pathname  === "/v1/admin/profile/admin-account") {
            setKey("14")
            setOpenKey(["sub6","sub5"])
        } else if(window.location.pathname  === "/v1/admin/jobs/pending-jobs/list") {
            setKey("12")
            setOpenKey([ "sub0"])            
        } else if(window.location.pathname  === "/v1/admin/connect-schools/event/jobs/list") {
            let url_string = window.location.href;
            let url = new URL(url_string);
            let expiredJob = url.searchParams.get("expiredJob");
            if(expiredJob === 'true') {
                setKey("jobExpired")
            } else {
                setKey("event")
            }
            setOpenKey([ "sub0"])            
        } else if(window.location.pathname === "/v1/admin/connect-schools/event/list") {
            setKey("pageSchool")
            setOpenKey(["sub1","sub0"])  
        } else if(window.location.pathname === "/v1/admin/connect-schools/list" || window.location.pathname.includes("/v1/admin/connect-schools/school/")) {
            setKey("connected")
            setOpenKey(["sub1","sub0"])  
        } else if(window.location.pathname === "/v1/admin/convernient/job-service"){
            setKey("7")
            setOpenKey(["sub3","sub2"])
        } else if(window.location.pathname === "/v1/admin/convernient/promotion"){
            setKey("percentage")
            setOpenKey(["sub3","sub2"])
        } else if (window.location.pathname === "/v1/admin/convernient/in-event"){
            setKey("in-event")
            setOpenKey(["sub3","sub2"])
        } else if (window.location.pathname === "/v1/admin/jobs/em-branches/list"){
            setKey("2")
            setOpenKey(["sub2","sub1"])
        } else if (window.location.pathname === "/v1/admin/jobs/saved-candidate/list"){
            setKey("4")
            setOpenKey(["sub2","sub1"])
        } else if (window.location.pathname === "/v1/admin/dashboard/api"){
            setKey("api")
            setOpenKey(["sub4","sub6"])
        } else if (window.location.pathname === "/v1/admin/more-info/community"){
            setKey("9")
            setOpenKey(["sub4","sub6"])
        } else if (window.location.pathname === "/v1/admin/more-info/guide"){
            setKey("10")
            setOpenKey(["sub4","sub6"])
        } else if (window.location.pathname === "/v1/admin/more-info/privacy"){
            setKey("25")
            setOpenKey(["sub4","sub6"])
        } else if (window.location.pathname === "/v1/admin/more-info/feed-back"){
            setKey("26")
            setOpenKey(["sub4","sub6"])
        }
        
    }, [window.location.href])
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
                    // console.log(event);
                    setKey(event.key)
                }}
                onOpenChange={(openKeys) => {
                    setOpenKey(openKeys);
                }}
                openKeys={openKey}
                // defaultSelectedKeys={[key]}
                selectedKeys={[key]}
            >
                <SubMenu
                    key="sub0"
                    title={
                        <span>
                            {/* <Icon type="home" /> */}
                            <Icon type="file-text" />
                            <span className="title-bold">Việc làm</span>
                        </span>
                    }
                >
                    <Menu.Item key="event" style={{ color: "#000000" }}>
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.EVENT + '/jobs/list?expiredJob=false'}>
                            <Icon type="alert" />
                            <span>Việc làm hoạt động </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="jobExpired" style={{ color: "#000000" }}>
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.EVENT + '/jobs/list?expiredJob=true'}>
                            {/* <Icon type="alert" /> */}
                            <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                            <span>Việc làm hết hạn </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Link to={routeLink.PENDING_JOBS + routePath.LIST}>
                            {/* <Icon type="highlight" /> */}
                            <Icon type="clock-circle" />
                            <span>Việc làm chờ duyệt</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="bank" />
                            <span className="title-bold">Nhà trường</span>
                        </span>
                    }
                >
                    <Menu.Item key="pageSchool">
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.EVENT + routePath.LIST}>
                            <Icon type="read" />
                            <span>Trang nhà trường</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="connected">
                        <Link to={routeLink.CONNECT_SCHOOLS + routePath.LIST}>
                            <Icon type="apartment" />
                            <span>Kết nối nhà trường</span>
                        </Link>
                    </Menu.Item>

                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>Quản lý</span>
                        </span>
                    }
                >
                    <Menu.Item key="0">
                        <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE}>
                            <Icon type="file-add" />
                            <span>Đăng bài</span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Link to={routeLink.JOB_ANNOUNCEMENTS + routePath.LIST}>
                            <Icon type="carry-out" />
                            <span>Quản lý bài đăng</span>
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="2">
                        <Link to={routeLink.EM_BRANCHES + routePath.LIST}>
                            <Icon type="environment" />
                            <span>Quản lý chi nhánh</span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="3">
                        <Link to={routeLink.FIND_CANDIDATES + routePath.LIST}>
                            <Icon type="user-add" />
                            <span>Tìm kiếm ứng viên</span>
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="4">
                        <Link to={routeLink.SAVE_CANDIDATE + routePath.LIST}>
                            <Icon type="idcard" />
                            <span>Hồ sơ đã lưu</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <Icon type="star" />
                            <span className="title-bold">Tiện ích dịch vụ</span>
                        </span>
                    }
                >
                    <Menu.Item key="7">
                        <Link to={routeLink.JOB_SERVICE}>
                            <Icon type="shopping" />
                            <span>Chi tiết gói</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="percentage">
                        <Link to={routeLink.PROMOTION}>
                            <Icon type="percentage" />
                            <span>Khuyến mãi</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="in-event">
                        <Link to={routeLink.IN_EVENT}>
                            <Icon type="rocket" />
                            <span>Trong sự kiện</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    title={
                        <span>
                            <Icon type="bell" />
                            <span className="title-bold">Thông báo</span>
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
                            <span className="title-bold">Hồ sơ NTD</span>
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
                            <Icon type="unordered-list" />
                            <span className="title-bold">Thông tin khác</span>
                        </span>
                    }
                >
                    {/* <Menu.Item key="pendings-jobs">
                        <Link to={routeLink.ANNOU_DEFAULT} >
                            <Icon type="coffee" />
                            <span>Bài viết</span>
                        </Link>
                    </Menu.Item> */}
                    {/* <Menu.Item key="new-info">
                        <Link to={routeLink.NEW_INFO}>
                            <Icon type="notification" />
                            <span>Thông tin mới</span>
                        </Link> */}
                    {/* </Menu.Item> */}
                    <Menu.Item key="api">
                        <Link to={routeLink.API}>
                            <Icon type="api" />
                            <span>Chức năng</span>
                        </Link>
                    </Menu.Item>
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