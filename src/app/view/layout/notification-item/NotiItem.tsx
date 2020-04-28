import React from 'react';
import { IptLetter, Timer, CBtn } from '../common/Common';
import { Icon, Avatar, Tooltip } from 'antd';
import { INoti } from '../../../../models/notis';
import './NotiItem.scss';
import { TYPE } from '../../../../const/type';
import { routeLink, routePath } from '../../../../const/break-cumb';
import { Link } from 'react-router-dom';
import { _requestToServer } from '../../../../services/exec';
import { PUT } from '../../../../const/method';
import { NOTI } from '../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../environment/dev';
//@ts-ignore
import SystemAvatar from '../../../../assets/image/icon-app-uv.png';

interface INotiItemProps {
    item?: INoti,
    getListNoti?: () => any;
    setSeen?: (id?: string) => any;
}

export default function NotiItem(props: INotiItemProps) {
    let { item } = props;
    let avatar = SystemAvatar;
    let type_icon = "user";
    let link_to = null;
    let avatar_to = null;
    let icon_state = "exclamation-circle";
    let color_icon_state = "#168ECD";
    let state = item.data.state;

    let [seen, setSeenHere] = React.useState(props && props.item && props.item.seen );
  

    switch (item.data.state) {
        case TYPE.PENDING:
            icon_state = "clock-circle";
            color_icon_state = "red";
            break;
        case TYPE.REJECTED:
            icon_state = "stop";
            color_icon_state = "red";
            break;
        case TYPE.ACCEPTED:
            icon_state = "check-circle";
            color_icon_state = "greenyellow";
            break;
        default:
            break;
    }

    switch (item.type) {
        case TYPE.NOTI.REPLY_JOB_APPLY_REQUEST:
            avatar = item && item.data.avatarUrl;
            type_icon = "user";
            link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${item.data.jobID}`;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`;
            break;

        case TYPE.NOTI.REPLY_JOB_OFFER_REQUEST:
            avatar = item && item.data.avatarUrl
            type_icon = "user";
            link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${item && item.data && item.data.jobID}`;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item && item.data && item.data.userID}`;
            break;

        case TYPE.NOTI.REPLY_CONNECT_REQUEST:
            avatar = item && item.data && item.data.logoUrl;
            type_icon = "schedule";
            link_to = routeLink.CONNECT_SCHOOLS + routePath.LIST + `?id=${item.data.schoolID}`;
            avatar_to = routeLink.CONNECT_SCHOOLS + `/school/${item.data.schoolID}`;
            break;

        case TYPE.NOTI.REPLY_PENDING_JOB:
            avatar = SystemAvatar;
            type_icon = "shop";
            link_to = state === TYPE.ACCEPTED ?
                routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${item.data.jobID}` :
                routeLink.PENDING_JOBS + routePath.LIST + `?id=${item.data.pendingJobID}`;
            break;

        case TYPE.NOTI.RATED:
            avatar = item && item.data.avatarUrl;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`;
            link_to = routeLink.ADMIN_ACCOUNTS + `?viewrate=true`;
            type_icon = "star";
            break;

        case TYPE.NOTI.JOB_APPLY_REQUEST:
            avatar = item && item.data.avatarUrl;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`;
            link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${item.data.jobID}`;
            type_icon = "star";
            break;

        case TYPE.NOTI.UPDATE_SYSTEM_ANNOUNCEMENT:
            avatar = SystemAvatar;
            type_icon = "user";
            break;

        default:
            break;
    }

    async function createRequest() {
        await _requestToServer(
            PUT,
            NOTI + `/${item.id}/seen/${!item.seen}`,
            undefined,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            true
        ).then(
            (res: any) => {
                setSeenHere(!seen);
            }
        )
    }

    return (
        <div className='noti-info test'>
            <div key={item.id}
                className='li-info '
                style={{ backgroundColor: seen ? 'white' : 'aliceblue' }}>
                {
                    avatar_to ? <Link to={avatar_to} target="_blank">
                        <div className='img-logo-noti'>
                            <Avatar src={avatar} alt='type noti' style={{ width: "50px", height: "50px" }} icon={type_icon} />
                        </div>
                    </Link> :
                        <div className='img-logo-noti'>
                            <Avatar src={avatar} alt='type noti' style={{ width: "50px", height: "50px" }} icon={type_icon} />
                        </div>
                }

                <div className='data-noti'>
                    <div><IptLetter value={item.title} style={{ padding: 0 }} /></div>
                    {link_to ?
                        <Link to={link_to} target="_blank">
                            <div className="content_li-info link_to">
                                {item.body}
                            </div>
                        </Link> :
                        <div className="content_li-info">
                            {item.body}
                        </div>
                    }

                    <Icon type={icon_state} theme="filled" style={{ color: color_icon_state }} />
                    <Timer style={{ margin: 0, padding: 0 }} value={item.createdDate} />
                </div>
                <Tooltip
                    title={
                        !seen ? 'Đánh dấu là đã đọc' : 'Đánh dấu là chưa đọc'
                    }
                >
                    <CBtn type={!seen ? 'eye' : 'eye-invisible'} onClick={() => createRequest()}/>
                </Tooltip>
            </div>
        </div>
    )
}