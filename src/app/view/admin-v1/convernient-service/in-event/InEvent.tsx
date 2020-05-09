import React from 'react'
import './InEvent.scss';
import { Table, Divider } from 'antd';

function cutLink(props: any) {
    let { link } = props;
    let newLink = "";

    if (link && link.length > 0) {
        for (let i = 0; i < 8; i++) {
            newLink += link[i]
        }
        return newLink + "..."

    }

    else return "";
}

function InEvent() {
    const columns = [
        {
            title: 'Quyền lợi ',
            width: 200,
            dataIndex: 'interest',
            className: 'action',
            key: 'interest',
        },
        {
            title: 'Doanh nghiệp vàng',
            dataIndex: 'goldBusiness',
            className: 'action golden',
            key: 'goldBusiness',
            width: 150,
        },
        {
            title: 'Doanh nghiệp tiên phong',
            dataIndex: 'beforeBusiness',
            className: 'action',
            key: 'beforeBusiness',
            width: 150,
        },
        {
            title: 'Doanh nghiệp tạo ảnh hưởng',
            dataIndex: 'effectBusiness',
            className: 'action',
            key: 'effectBusiness',
            width: 150,
        },
        {
            title: 'Doanh nghiệp đồng hành',
            dataIndex: 'supportBusiness',
            className: 'action',
            key: 'supportBusiness',
            width: 150,
        },
        {
            title: 'Doanh nghiệp khởi tạo',
            dataIndex: 'startBusiness',
            className: 'action',
            key: 'startBusiness',
            width: 150,
        },
        
        {
            title: 'Link ảnh hiển thị web',
            dataIndex: 'webView',
            className: 'action',
            key: 'web-view',
            width: 150,
            render: (link) => <a href={link} className="link-to" target="_blank" children={cutLink({ link: link })}  rel="noopener noreferrer" />
        },
        {
            title: 'Link ảnh hiển thị mobile',
            dataIndex: 'mobileView',
            className: 'action',
            key: 'mobile-view',
            width: 150,
            render: (link) => <a href={link} className="link-to" target="_blank" children={cutLink({ link: link })} rel="noopener noreferrer" />
        },
    ];


    const columns01 = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            className: 'action',
            key: 'name',
            width: 150,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            className: 'action',
            key: 'description',
            width: 550,
        },
    ]

    const dataTable = [
        {
            interest: "Đăng tin tuyển dụng trong sự kiện",
            goldBusiness: "30 tin",
            beforeBusiness: "20 tin",
            effectBusiness: "10 tin",
            supportBusiness: "10 tin",
            startBusiness: "10 tin",
        },
        {
            interest: "Banner hiển thị trên trang web/app tìm việc của sự kiện",
            goldBusiness: "01 banner",
            beforeBusiness: "",
            effectBusiness: "",
            supportBusiness: "",
            webView: "https://drive.google.com/file/d/1YuBgbt-v0jkz2uJ-mLmJBkIl8n-2IiIm/view",
            mobileView: "https://drive.google.com/file/d/1Ppt80u7fHpcPIMmr4q6IZGHrQjo45zve/view"
        },
        {
            interest: "Tặng vé tham gia Zoom của HR/CEO",
            goldBusiness: "03 vé",
            beforeBusiness: "02 vé",
            effectBusiness: "01 vé",
            supportBusiness: "01 vé",
        },
        {
            interest: "Setup phỏng vấn tuyển dụng",
            goldBusiness: "01 buổi",
            beforeBusiness: "01 buổi",
            effectBusiness: "01 buổi",
            supportBusiness: "",
        },
        {
            interest: "Tin đăng nằm vị trí Việc làm nổi bật ngày hội",
            goldBusiness: "03 tin",
            beforeBusiness: "02 tin",
            effectBusiness: "02 tin",
            supportBusiness: "",
            webView: "https://drive.google.com/file/d/1pOC2dvXZacSva9k7_Hx7DkOR0G_VSohj/view",
            mobileView: "https://drive.google.com/file/d/1VsZ-AbKMA_dKdfjEmq0XFNuvDUF50eYb/view"
        },
        {
            interest: "Bôi đậm đỏ tiêu đề tin đăng tuyển dụng ",
            goldBusiness: "03 tin",
            beforeBusiness: "02 tin",
            effectBusiness: "05 tin",
            supportBusiness: "05 tin",
            webView: "https://drive.google.com/file/d/12lmUeiK8Is7MerJYAp1hLviVnfWGkVEP/view",
            mobileView: "https://drive.google.com/file/d/1XZU2AbbvdoARUz_kkADbdt00yIZj-tiZ/view"
        },
        {
            interest: "Mở khóa hồ sơ ứng viên",
            goldBusiness: "150 hồ sơ",
            beforeBusiness: "120 hồ sơ",
            effectBusiness: "100 hồ sơ",
            supportBusiness: "",
        },

        {
            interest: "Hiển thị Logo ở vị trí Doanh nghiệp nổi bật",
            goldBusiness: "01 Logo",
            beforeBusiness: "01 Logo",
            effectBusiness: "01 Logo",
            supportBusiness: "",
            webView: "https://drive.google.com/file/d/137snQz2AMJYlcPfjSWqikHzsYdy_mvlN/view",
        },
        {
            interest: "Voucher khóa đào tạo (Nghề nhân sự chuyên nghiệp, Pháp luật lao động)",
            goldBusiness: "Giảm 20%",
            beforeBusiness: "Giảm 20%",
            effectBusiness: "Giảm 15%",
            supportBusiness: "Giảm 15%",
        },
        {
            interest: "GIÁ (Chưa gồm VAT)",
            goldBusiness: "15.000.000 VND",
            beforeBusiness: "9.000.000 VND",
            effectBusiness: "5.000.000 VND",
            supportBusiness: "2.000.000 VND",
            startBusiness: "Miễn phí",
        },
    ];

    const dataTable01 = [
        {
            name: "Việc làm nổi bật trong sự kiện",
            description: "Việc làm được hiển thị tại Box Việc làm nổi bật trên trang website https://works.vn và ứng dụng tìm việc làm Works.vn - Tìm việc",
        },
        {
            name: "Bôi đậm đỏ tiêu đề việc làm",
            description: "Việc làm được bôi đậm đỏ tiêu đề tuyển dụng, hiển trị trong danh sách việc làm trên trang website https://works.vn và ứng dụng tìm việc làm Works.vn - Tìm việc",
        },
        {
            name: "Việc làm nổi bật trong sự kiện",
            description: "Banner nổi bật được hiển thị đầu tiên tại trang chủ website https://works.vn và trang chủ ứng dụng tìm việc làm Works.vn - Tìm việc",
        },
        {
            name: "Logo nổi bật",
            description: "Logo của Doanh nghiệp hiển thị tại Box Doanh nghiệp nổi bật trên trang website https://works.vn",
        },
    ]

    return (
        < >
            <h5>Thông tin gói dịch vụ trong sự kiện</h5>
            <Divider orientation={"left"} children={"GÓI DỊCH VỤ"} />
            <div className='in-event'>
                <Table
                    // @ts-ignore
                    columns={columns}
                    dataSource={dataTable}
                    scroll={{ x: 800 }}
                    bordered
                    pagination={false}
                />
            </div>
            <Divider orientation={"left"} children={"MÔ TẢ"} />
            <div className='in-event'>
                <Table
                    // @ts-ignore
                    columns={columns01}
                    dataSource={dataTable01}
                    scroll={{ x: 850 }}
                    indentSize={600}
                    bordered
                    pagination={false}
                />
            </div>
        </>
    )
}



export default InEvent;


