import React from 'react'
import { Icon, Avatar, Row, Col, Progress, Tag, Rate } from 'antd';
import './AdminProfile.scss';
// @ts-ignore
import backGround from '../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { TYPE } from '../../../../common/const/type';
import { TimeLineConfig, TimeLineConfigItem } from '../config/TimeLineConfig';
import { timeConverter } from '../../../../common/utils/convertTime';
import { NotUpdate } from '../common/Common';
import { IAdminAccount } from '../../../../redux/models/admin-account';

interface IAdminProfileState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>
};

interface IAdminProfileProps {
    data?: IAdminAccount
};

function AdminProfile(props: IAdminProfileProps) {
    let { data } = props;
    let [avatarUrl, setAvatarUrl] = React.useState(avatar);
    let [coverUrl, setcoverUrl] = React.useState(backGround);

    let [onErrAvatar, setErrAvatar] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    if (data && data.logoUrl !== avatarUrl) {
        setAvatarUrl(data.logoUrl);
    }

    if (data && data.coverUrl !== coverUrl) {
        setcoverUrl(data.coverUrl);
    }

    return (
        <div className="account-profile test">
            <div className="account-profile-header">
                <img
                    className="cover-image-profile"
                    src={!onErrCover && coverUrl ? coverUrl : backGround}
                    alt={"rodan"}
                    onError={() => setErrCover(true)}
                />
                <Row>
                    <Col sm={1} md={1} lg={2}></Col>
                    <Col sm={22} md={22} lg={20}>
                        <div
                            className="header-content"
                        >
                            <div className="block-image">
                                <Avatar
                                    // @ts-ignore
                                    src={!onErrAvatar && avatarUrl ? avatarUrl : avatar}
                                    style={{
                                        height: 140,
                                        width: 140,
                                        border: "solid white 2px",
                                        fontSize: 60
                                    }}
                                    // @ts-ignore
                                    onError={() => setErrAvatar(true)}
                                />
                                <h4>
                                    {data ? data.employerName : ""}
                                </h4>
                            </div>
                            <div className="description">
                                <div className="profile-description">
                                    <h6>
                                        Thông tin liên hệ
                                     </h6>
                                    <li>
                                        <label className="block-span">Số điện thoại</label>
                                        <label>
                                            <strong>
                                                {data && data.phone ? data.phone : <NotUpdate />
                                                }
                                            </strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-span">Thư điện tử</label>
                                        <label>
                                            <strong>
                                                {data && data.email ?
                                                    data.email : <span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span>}
                                            </strong>
                                        </label>
                                    </li>

                                </div>
                                <div className="hr-center" />
                                <div className="info">
                                    <ul>
                                        <li>
                                            <label className="block-span">Địa chỉ</label>
                                            <label>{data && data.address && data.address !== "" ? data.address : <NotUpdate />}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1} md={1} lg={2}></Col>
                </Row>
            </div>
            <div className="account-profile-body">
            </div>
        </div>
    )
}

export default AdminProfile