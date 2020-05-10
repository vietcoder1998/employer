import React from 'react'
import { Row, Table } from 'antd';
//@ts-ignore
import { routeLink, routePath } from '../../../../const/break-cumb';

interface IProps {
    match: Readonly<any>;
    getTypeManagement: Function;
    history?: any
}

// const fillterOption = [
//     { id: 1, name: "Trang chủ", value: "hone" },
//     { id: 2, name: "Tuyển dụng", value: "hone" },
//     { id: 3, name: "Trường học", value: "hone" },
//     { id: 4, name: "Tiện ích dịch vụ", value: "hone" },
//     { id: 5, name: "Thông báo", value: "hone" },
//     { id: 6, name: "Hồ sơ ntd", value: "hone" },
//     { id: 7, name: "Thông tin khác", value: "hone" },
// ]

const dataTable = [
    {
        into: routePath.DASHBOARD,
        index: 1,
        key: 1,
        menu: "Trang chủ",
        name: "Thông tin mới",
        description: "Thông tin trang chủ, cập nhật ứng dụng, sự kiện mới ....",
        api: routeLink.NEW_INFO
    },
    {
        into: routePath.DASHBOARD,
        index: 2,
        key: 2,
        menu: "",
        name: "Chức năng",
        description: "Mô tả chi tiết các tính năng và link dẫn cố định",
        api: routeLink.API
    },
    {
        into: routePath.JOBS,
        index: 3,
        key: 3,
        menu: "Tuyển dụng",
        name: "Đăng bài",
        description: "Đăng bài trên app và web candidate",
        api: routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE
    },
    {
        into: routePath.JOBS,
        index: 4,
        key: 4,
        menu: "",
        name: "Quản lí bài đăng",
        description: "Quản lý bài đã được xét duyệt trên app nhà tuyển dụng",
        api: routeLink.JOB_ANNOUNCEMENTS + routePath.LIST
    },
    {
        into: routePath.JOBS,
        index: 5,
        key: 5,
        menu: "",
        name: "Quản lí chi nhánh",
        description: "Quản lí chi nhánh, thông tinh của các chi nhánh",
        api: routeLink.EM_BRANCHES + routePath.LIST
    },
    {
        into: routePath.JOBS,
        index: 6,
        key: 6,
        menu: "",
        name: "Tìm kiếm ứng viên",
        description: "Tìm kiến ứng viên, sinh viên phù hợp với bạn",
        api: routeLink.FIND_CANDIDATES + routePath.LIST
    },
    {
        into: routePath.JOBS,
        index: 7,
        key: 7,
        menu: "",
        name: "Hồ sơ đã lưu",
        description: "Thông tin sinh viên, ứng viên đã lưu",
        api: routeLink.SAVE_CANDIDATE + routePath.LIST
    },
    {
        into: routePath.SCHOOLS,
        index: 8,
        key: 8,
        menu: "Trường học",
        name: "Sự kiện",
        description: "Theo dõi sự kiện mà bạn đã tham gia",
        api: routeLink.EVENT + routePath.LIST
    },
    {
        into: routePath.SCHOOLS,
        index: 9,
        key: 9,
        menu: "",
        name: "Kết nối nhà trường",
        description: "Theo dõi thong tin nhà trường,yêu cầu hoặc từ chối với nhà trường",
        api: routeLink.CONNECT_SCHOOLS + routePath.LIST
    },
    {
        into: routePath.JOB_SERVICE,
        index: 10,
        key: 10,
        menu: "Tiện ích dịch vụ",
        name: "Chi tiết gói",
        description: "Thông tin số lượng gói còn lại:'Gói đặc biệt, gói tuyển gấp, gói mở khóa, ...'",
        api: routeLink.JOB_SERVICE
    },
    {
        into: routePath.JOB_SERVICE,
        index: 11,
        key: 11,
        menu: "",
        name: "Khuyến mãi",
        description: "Thông tin các khuyến mãi của Works.vn",
        api: routeLink.PROMOTION
    },
    {
        into: routePath.JOB_SERVICE,
        index: 12,
        key: 12,
        menu: "",
        name: "Trong sự kiện",
        description: "Thông tin các gói ưu đãi trong sự kiện",
        api: routeLink.IN_EVENT
    },
    {
        into: routePath.NOTI,
        index: 13,
        key: 13,
        menu: "Thông báo",
        name: "Danh sách",
        description: "Danh sách toàn bộ thông báo",
        api: routeLink.NOTI + routePath.LIST
    },
    {
        into: routePath.ADMIN_ACCOUNT,
        index: 14,
        key: 14,
        menu: "Hồ sơ NTD",
        name: "Thông báo",
        description: "Thông tin cá nhân của nhà tuyển dụng",
        api: routeLink.ADMIN_ACCOUNTS
    },
    {
        into: routePath.MORE_INFO,
        index: 15,
        key: 15,
        menu: "Thông tin khác",
        name: "App mobile",
        description: "Xem đường link , giơi thiệu ứng dụng của works.vn",
        api: routeLink.COMMUNITY
    },
    {
        into: routePath.MORE_INFO,
        index: 16,
        key: 16,
        menu: "",
        name: "Hướng dẫn sử dụng",
        description: "Hướng dẫn sử dụng các chức năng cơ bản của works.vn",
        api: routeLink.GUIDE
    },
    {
        into: routePath.MORE_INFO,
        index: 17,
        key: 17,
        menu: "",
        name: "Điều khoản sử dụng",
        description: "Điều khoản sử dụng của works.vn",
        api: routeLink.PRIVACY
    },
    {
        into: routePath.MORE_INFO,
        index: 18,
        key: 18,
        menu: "",
        name: "Phản hồi",
        description: "Tạo phản hồi về works.vn",
        api: routeLink.FEED_BACK
    },
]

export default function Api(props?: IProps) {
    const columns = [
        {
            title: '#',
            width: 20,
            dataIndex: 'index',
            key: 'index',
            className: 'action',
        },
        {
            title: 'Chỉ mục',
            width: 80,
            dataIndex: 'menu',
            key: 'menu',
            className: 'action',
        },
        {
            title: 'Tên gọi',
            dataIndex: 'name',
            key: 'name',
            className: "action",
            width: 100,
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'Api',
            dataIndex: 'api',
            className: 'action',
            key: 'api',
            render: (data) => <div
                className="link-to"
                onClick={() => props.history.push(data)}
                style={{color: "blue"}}
            >
                {data}
            </div>,
            width: 100,
        },
    ];

    return (
        <Row>
            <div className="table-operations">
                <h5>Chức năng</h5>
                {/* <Row >
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                        <IptLetterP value={"Thư mục"} />
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: "100%" }}
                        >
                            <Option value={null}>Tất cả</Option>
                            <Option value={routePath.DASHBOARD}>Trang chủ</Option>
                            <Option value={routePath.JOBS}>Tuyển dụng</Option>
                            <Option value={routePath.SCHOOLS}>Nhà trường</Option>
                            <Option value={routePath.CONVERNIENT}>Tiện ích dịch vụ</Option>
                            <Option value={routePath.ADMIN_ACCOUNT}>Hồ sơ nhà tuyển dụng</Option>
                            <Option value={routePath.NOTI}>Thông báo</Option>
                            <Option value={routePath.MORE_INFO}>Thông tin khác</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                        <IptLetterP value={"Tỉnh thành"} />
                        <Select
                            showSearch
                            defaultValue="Tất cả"
                            style={{ width: "100%" }}
                        >

                        </Select>
                    </Col>
                </Row> */}
                <Table
                    // @ts-ignore
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: 550 }}
                    bordered
                    pagination={false}

                />
            </div>
        </Row>
    )
};